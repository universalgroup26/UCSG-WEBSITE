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

// ─── GoHighLevel Direct API Integration ────────────────────────────────

/**
 * Create or update a contact in GoHighLevel via the official API.
 * Requires GHL_API_KEY + GHL_LOCATION_ID.
 * Optionally adds the contact to a pipeline stage.
 */
async function pushToGoHighLevel(data: {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  tags: string[];
  customFields: { id: string; value: string }[];
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
          customFields: data.customFields.filter(f => f.value),
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

/**
 * Push lead data to UCSG external tracking system at
 * lead.universalconsultingservices.com. This is the GoHighLevel-powered
 * lead capture endpoint that feeds directly into the GHL CRM.
 *
 * Uses the UCSG tracking ID (from the external-tracking.js script)
 * and API key for authentication.
 */
async function pushToUCSGTracking(leadData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  source: string;
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

/**
 * Send email notification via Gmail SMTP.
 * Requires SMTP_PASS (Gmail App Password) to be configured in .env
 */
async function sendEmailNotification(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  source: string;
  whatsapp?: string;
  nationality?: string;
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

    const subject = `New Lead from ${data.name} — ${data.service || 'General Inquiry'}`;

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #002868 0%, #001540 100%); padding: 24px 32px;">
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
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${data.email}" style="color: #002868; text-decoration: none; font-weight: 600;">${data.email}</a></td>
            </tr>
            ${data.phone ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;"><a href="tel:${data.phone}" style="color: #002868; text-decoration: none;">${data.phone}</a></td></tr>` : ''}
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

// ─── Main Handler ──────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, service, whatsapp, nationality, englishLevel, source } = body;

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

    // Build tags
    const tags: string[] = ['UCSG Website Lead', 'Contact Form'];
    if (trimmedService) tags.push(trimmedService);
    if (formSource && formSource !== 'UCSG Website') tags.push(`Source: ${formSource}`);
    if (nationality?.trim()) tags.push(`Nationality: ${nationality.trim()}`);

    // Build custom fields for GHL
    const customFields: { id: string; value: string }[] = [
      { id: 'whatsapp_number', value: whatsapp?.trim() || '' },
      { id: 'nationality', value: nationality?.trim() || '' },
      { id: 'english_level', value: englishLevel?.trim() || '' },
      { id: 'service_needed', value: trimmedService },
      { id: 'message', value: trimmedMessage },
      { id: 'last_name', value: lastName },
      { id: 'source', value: formSource },
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
    }).catch(() => {});

    // 2. UCSG External Lead Tracking System
    pushToUCSGTracking({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      service: trimmedService,
      message: trimmedMessage,
      source: formSource,
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
    }).catch(() => {});

    // 4. Store in local database (synchronous — always succeeds independently)
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
