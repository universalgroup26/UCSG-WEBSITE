import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GoHighLevel Configuration (set in .env)
const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID || '';
const GHL_STAGE_ID = process.env.GHL_STAGE_ID || '';

/**
 * Create or update a contact in GoHighLevel and optionally add to pipeline
 */
async function pushToGoHighLevel(data: {
  firstName: string;
  email: string;
  phone?: string;
  tags: string[];
  customFields: { id: string; value: string }[];
}) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    console.log('[GHL] Skipping: API key or location ID not configured');
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
            body: JSON.stringify({
              contact_id: [contactId],
            }),
          },
        );

        if (!pipelineRes.ok) {
          console.error(`[GHL] Pipeline add failed (${pipelineRes.status}):`, await pipelineRes.text());
        }
      } catch (pipelineErr) {
        console.error('[GHL] Pipeline error:', pipelineErr);
      }
    }

    console.log(`[GHL] Contact ${contactId} created/updated successfully`);
    return contactId;
  } catch (err) {
    console.error('[GHL] Error:', err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, service, whatsapp, nationality, englishLevel } = body;

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

    // Split name into first/last name
    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // Build tags
    const tags: string[] = ['UCSG Website Lead', 'Contact Form'];
    if (trimmedService) tags.push(trimmedService);
    if (nationality?.trim()) tags.push(`Nationality: ${nationality.trim()}`);

    // Build custom fields for GHL
    const customFields: { id: string; value: string }[] = [
      { id: 'whatsapp_number', value: whatsapp?.trim() || '' },
      { id: 'nationality', value: nationality?.trim() || '' },
      { id: 'english_level', value: englishLevel?.trim() || '' },
      { id: 'service_needed', value: trimmedService },
      { id: 'message', value: trimmedMessage },
      { id: 'last_name', value: lastName },
      { id: 'source', value: 'UCSG Website' },
    ];

    // Push to GoHighLevel (non-blocking, won't fail the submission)
    pushToGoHighLevel({
      firstName,
      email: trimmedEmail,
      phone: trimmedPhone || undefined,
      tags,
      customFields,
    }).catch(() => {}); // Fire and forget

    // Store in local database (always succeeds independently)
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
