import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/db';

// ─── Configuration ─────────────────────────────────────────────────────

const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID || '';
const GHL_STAGE_ID = process.env.GHL_STAGE_ID || '';
const UCSG_API_KEY = process.env.UCSG_API_KEY || '';
const UCSG_TRACKING_ID = process.env.UCSG_TRACKING_ID || '';
const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const EMAIL_TO = process.env.EMAIL_TO || SMTP_USER;

// ─── UTM Parameter Extraction ────────────────────────────────────────

/** Extract UTM params from request URL and Referer header */
function extractUTM(req: NextRequest): Record<string, string> {
  const utm: Record<string, string> = {};
  const url = new URL(req.url);
  const referer = req.headers.get('referer') || '';

  // From request URL query params
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'gclid', 'fbclid'];
  for (const key of utmKeys) {
    const val = url.searchParams.get(key);
    if (val) utm[key] = val;
  }

  // From referer URL if not already captured
  if (referer && Object.keys(utm).length === 0) {
    try {
      const refUrl = new URL(referer);
      for (const key of utmKeys) {
        const val = refUrl.searchParams.get(key);
        if (val) utm[key] = val;
      }
    } catch {
      // ignore invalid referer
    }
  }

  return utm;
}

// ─── GoHighLevel Direct API Integration ────────────────────────────────

/**
 * Create or update a contact in GoHighLevel via the official API.
 * Includes UTM parameters as custom fields and intent/program tags.
 */
async function pushToGoHighLevel(data: {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  tags: string[];
  customFields: { id: string; value: string }[];
  utm: Record<string, string>;
}) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    console.log('[GHL] Skipping direct API: API key or location ID not configured');
    return null;
  }

  try {
    // 1. Upsert contact
    const contactRes = await fetch(
      `https://services.leadconnectorhq.com/contacts/upsert?locationId=${GHL_LOCATION_ID}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName || '',
          email: data.email,
          phone: data.phone || undefined,
          tags: data.tags,
          customFields: [
            ...data.customFields.filter(f => f.value),
            // Add UTM params as custom fields
            ...(data.utm.utm_source ? [{ id: 'utm_source', value: data.utm.utm_source }] : []),
            ...(data.utm.utm_medium ? [{ id: 'utm_medium', value: data.utm.utm_medium }] : []),
            ...(data.utm.utm_campaign ? [{ id: 'utm_campaign', value: data.utm.utm_campaign }] : []),
            ...(data.utm.utm_term ? [{ id: 'utm_term', value: data.utm.utm_term }] : []),
            ...(data.utm.utm_content ? [{ id: 'utm_content', value: data.utm.utm_content }] : []),
            ...(data.utm.gclid ? [{ id: 'gclid', value: data.utm.gclid }] : []),
            ...(data.utm.fbclid ? [{ id: 'fbclid', value: data.utm.fbclid }] : []),
          ],
        }),
      },
    );

    if (!contactRes.ok) {
      const errText = await contactRes.text();
      console.error(`[GHL] Contact upsert failed (${contactRes.status}):`, errText);
      return null;
    }

    const contactData = await contactRes.json();
    const contactId = contactData.contact?.id;

    // 2. Add to pipeline/stage if configured
    if (contactId && GHL_PIPELINE_ID && GHL_STAGE_ID) {
      try {
        const pipelineRes = await fetch(
          `https://services.leadconnectorhq.com/pipelines/${GHL_PIPELINE_ID}/stages/${GHL_STAGE_ID}/contacts`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${GHL_API_KEY}`,
              'Version': '2021-07-28',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ contact_id: [contactId] }),
          },
        );

        if (!pipelineRes.ok) {
          console.error(`[GHL] Pipeline add failed (${pipelineRes.status}):`, await pipelineRes.text());
        } else {
          console.log(`[GHL] Contact ${contactId} added to pipeline ${GHL_PIPELINE_ID}/${GHL_STAGE_ID}`);
        }
      } catch (pipelineErr) {
        console.error('[GHL] Pipeline error:', pipelineErr);
      }
    }

    console.log(`[GHL] Contact ${contactId} created/updated successfully`);
    return contactId;
  } catch (err) {
    console.error('[GHL] Direct API error:', err);
    return null;
  }
}

// ─── UCSG Lead Tracking System ────────────────────────────────────────

async function pushToUCSGTracking(leadData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  source: string;
  utm: Record<string, string>;
}) {
  if (!UCSG_API_KEY || !UCSG_TRACKING_ID) {
    console.log('[UCSG-Track] Skipping: API key or tracking ID not configured');
    return null;
  }

  const payload = {
    tracking_id: UCSG_TRACKING_ID,
    event: 'lead_capture',
    lead: {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      service_needed: leadData.service,
      message: leadData.message,
      source: leadData.source,
      submitted_at: new Date().toISOString(),
      utm: leadData.utm,
    },
  };

  // Try the UCSG lead capture endpoint
  try {
    const res = await fetch('https://lead.universalconsultingservices.com/api/lead-capture', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${UCSG_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const result = await res.json().catch(() => null);
      console.log('[UCSG-Track] Lead captured successfully:', result?.id || 'ok');
      return result;
    }
    console.warn(`[UCSG-Track] Lead capture returned ${res.status}:`, await res.text().catch(() => ''));
  } catch (err) {
    console.warn('[UCSG-Track] Lead capture request failed:', err);
  }

  // Fallback: try alternative endpoint pattern
  try {
    const res = await fetch('https://lead.universalconsultingservices.com/api/v1/leads', {
      method: 'POST',
      headers: {
        'x-api-key': UCSG_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        api_key: UCSG_API_KEY,
      }),
    });

    if (res.ok) {
      const result = await res.json().catch(() => null);
      console.log('[UCSG-Track] Lead captured via fallback endpoint:', result?.id || 'ok');
      return result;
    }
    console.warn(`[UCSG-Track] Fallback endpoint returned ${res.status}`);
  } catch (err) {
    console.warn('[UCSG-Track] Fallback endpoint request failed:', err);
  }

  return null;
}

// ─── Email Notification ──────────────────────────────────────────────

async function sendEmailNotification(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  source: string;
  whatsapp?: string;
  nationality?: string;
  utm: Record<string, string>;
}) {
  if (!SMTP_USER || !SMTP_PASS) {
    console.log('[Email] Skipping: SMTP credentials not configured');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

  const utmInfo = Object.keys(data.utm).length > 0
    ? `<p style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">UTM Data</p><p style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; color: #334155;">${Object.entries(data.utm).map(([k, v]) => `${k}: ${v}`).join('<br>')}</p>`
    : '';

    const subject = `New Lead from ${data.name} — ${data.service || 'General Inquiry'}`;

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #061846 0%, #092B68 100%); padding: 24px 32px;">
          <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 700;">New Lead — UCSG Website</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px;">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
        </div>
        <div style="padding: 24px 32px; background: white;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500; width: 120px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${data.email}" style="color: #0874F9; text-decoration: none; font-weight: 600;">${data.email}</a></td>
            </tr>
            ${data.phone ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;"><a href="tel:${data.phone}" style="color: #0874F9; text-decoration: none;">${data.phone}</a></td></tr>` : ''}
            ${data.whatsapp ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">WhatsApp</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;"><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none;">${data.whatsapp}</a></td></tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">Service</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${data.service || 'Not specified'}</td>
            </tr>
            ${data.nationality ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">Nationality</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${data.nationality}</td></tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">Source</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${data.source}</td>
            </tr>
            ${utmInfo}
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 500; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; font-weight: 500; color: #334155; line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
        </div>
        <div style="padding: 16px 32px; background: #f8f9fa; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">UCSG — Universal Consulting Service Group</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"UCSG Website" <${SMTP_USER}>`,
      to: EMAIL_TO,
      replyTo: data.email,
      subject,
      html: htmlBody,
    });

    console.log('[Email] Notification sent successfully to', EMAIL_TO);
  } catch (err) {
    console.error('[Email] Failed to send notification:', err);
  }
}

// ─── Intent-based tag builder ────────────────────────────────────────

/** Build GHL tags based on the lead's intent and program interest */
function buildIntentTags(service: string, message: string): string[] {
  const tags: string[] = [];
  const lowerMsg = message.toLowerCase();
  const lowerService = (service || '').toLowerCase();

  // Intent tags from service field
  if (lowerService.includes('transfer')) tags.push('Intent: University Transfer');
  if (lowerService.includes('cpt')) tags.push('Intent: CPT Information');
  if (lowerService.includes('opt')) tags.push('Intent: OPT/STEM OPT');
  if (lowerService.includes('change of status') || lowerService.includes('cos')) tags.push('Intent: Change of Status');
  if (lowerService.includes('sevis') || lowerService.includes('reinstatement')) tags.push('Intent: SEVIS Reinstatement');
  if (lowerService.includes('assessment')) tags.push('Intent: Free Assessment');
  if (lowerService.includes('master')) tags.push('Program: Masters');
  if (lowerService.includes('phd') || lowerService.includes('doctoral')) tags.push('Program: PhD/Doctoral');
  if (lowerService.includes('dba')) tags.push('Program: DBA');
  if (lowerService.includes('stem')) tags.push('Interest: STEM Programs');
  if (lowerService.includes('hybrid')) tags.push('Interest: Hybrid Format');
  if (lowerService.includes('online')) tags.push('Interest: Online Format');

  // Extract intent from message body (for assessment form submissions)
  if (lowerMsg.includes('situation:')) {
    const situationMatch = lowerMsg.match(/f-1 situation:\s*(.+)/i);
    if (situationMatch) tags.push(`F1: ${situationMatch[1].trim()}`);
  }
  if (lowerMsg.includes('degree level:')) {
    const degreeMatch = lowerMsg.match(/degree level:\s*(.+)/i);
    if (degreeMatch) tags.push(`Degree: ${degreeMatch[1].trim()}`);
  }
  if (lowerMsg.includes('field of study:')) {
    const fieldMatch = lowerMsg.match(/field of study:\s*(.+)/i);
    if (fieldMatch) tags.push(`Field: ${fieldMatch[1].trim()}`);
  }
  if (lowerMsg.includes('budget range:')) {
    const budgetMatch = lowerMsg.match(/budget range:\s*(.+)/i);
    if (budgetMatch) tags.push(`Budget: ${budgetMatch[1].trim()}`);
  }

  return tags;
}

// ─── Main Handler ──────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, email, phone, message, service, whatsapp, nationality,
      englishLevel, source, situation, degreeLevel, fieldOfStudy,
      preferredLocation, preferredFormat, budgetRange, optEndDate,
      targetIntake, currentUniversity,
    } = body;

    // Extract UTM parameters
    const utm = extractUTM(req);

    // Basic validation
    if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone?.trim() || '';
    const trimmedService = service?.trim() || '';
    const trimmedMessage = message.trim();
    const formSource = source?.trim() || 'UCSG Website';

    // Split name into first/last name
    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // Build tags — base + intent + UTM source
    const tags: string[] = ['UCSG Website Lead', 'Contact Form'];
    if (trimmedService) tags.push(trimmedService);
    if (formSource && formSource !== 'UCSG Website') tags.push(`Source: ${formSource}`);
    if (nationality?.trim()) tags.push(`Nationality: ${nationality.trim()}`);
    if (utm.utm_source) tags.push(`UTM: ${utm.utm_source}`);
    if (utm.utm_campaign) tags.push(`Campaign: ${utm.utm_campaign}`);

    // Add intent-based tags
    const intentTags = buildIntentTags(trimmedService, trimmedMessage);
    tags.push(...intentTags);

    // Build custom fields for GHL
    const customFields: { id: string; value: string }[] = [
      { id: 'whatsapp_number', value: whatsapp?.trim() || '' },
      { id: 'nationality', value: nationality?.trim() || '' },
      { id: 'english_level', value: englishLevel?.trim() || '' },
      { id: 'service_needed', value: trimmedService },
      { id: 'message', value: trimmedMessage },
      { id: 'last_name', value: lastName },
      { id: 'source', value: formSource },
      // Assessment-specific fields
      { id: 'f1_situation', value: situation?.trim() || '' },
      { id: 'degree_level', value: degreeLevel?.trim() || '' },
      { id: 'field_of_study', value: fieldOfStudy?.trim() || '' },
      { id: 'preferred_location', value: preferredLocation?.trim() || preferredLocation?.trim() || '' },
      { id: 'preferred_format', value: preferredFormat?.trim() || '' },
      { id: 'budget_range', value: budgetRange?.trim() || '' },
      { id: 'opt_end_date', value: optEndDate?.trim() || '' },
      { id: 'target_intake', value: targetIntake?.trim() || '' },
      { id: 'current_university', value: currentUniversity?.trim() || '' },
    ];

    // ─── Push to all lead destinations (non-blocking, fire-and-forget) ───

    // 1. GoHighLevel Direct API (contact upsert + pipeline)
    pushToGoHighLevel({
      firstName,
      lastName: lastName || undefined,
      email: trimmedEmail,
      phone: trimmedPhone || undefined,
      tags,
      customFields,
      utm,
    }).catch(() => {});

    // 2. UCSG External Lead Tracking System
    pushToUCSGTracking({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      service: trimmedService,
      message: trimmedMessage,
      source: formSource,
      utm,
    }).catch(() => {});

    // 3. Email notification to ucsgassist@gmail.com
    sendEmailNotification({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      service: trimmedService,
      message: trimmedMessage,
      source: formSource,
      whatsapp: whatsapp?.trim() || undefined,
      nationality: nationality?.trim() || undefined,
      utm,
    }).catch(() => {});

    // 4. Store in local database
    const submission = await db.contactSubmission.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone || null,
        whatsapp: whatsapp?.trim() || null,
        nationality: nationality?.trim() || null,
        englishLevel: englishLevel?.trim() || null,
        service: trimmedService || null,
        message: trimmedMessage,
      },
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
