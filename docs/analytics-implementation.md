# UCSG Analytics Implementation

> Last updated: $(date -u +%Y-%m-%d)

## Architecture Overview

```
Browser (Client)
├── ConsentBanner.tsx → Google Consent Mode v2 (default: denied)
├── Analytics.tsx → Loads ONLY:
│   ├── GTM Container (GTM-K65M9LJW) — SOLE tag manager
│   │   ├── GA4 (G-MHC25XBP3P) — configured in GTM
│   │   ├── Meta Pixel (2582317282238910) — configured in GTM
│   │   └── Microsoft Clarity (y7hrmh5gu4) — configured in GTM
│   └── GHL External Tracking (direct load, not in GTM)
├── Cloudflare Web Analytics (direct, not in GTM)
└── analytics.ts → Pushes ONLY to window.dataLayer (no direct gtag/fbq)

Server (API)
├── /api/contact → GHL Direct API + Email + DB + UCSG Tracking
└── /api/turnstile/verify → Cloudflare bot verification
```

## Key Principle: GTM as Single Tag Manager

- **GTM** manages GA4, Meta Pixel, and Clarity tags
- **Direct gtag.js, fbq(), and Clarity scripts are NOT loaded** in Analytics.tsx
- `analytics.ts` pushes events to `window.dataLayer` only
- GTM reads dataLayer and fires the appropriate tags based on consent state
- This prevents double-firing of page_view, Lead, and other events

## Google Consent Mode v2

### Default State (before user choice)

```js
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
```

### Consent Update (after user choice)

Dispatched via dataLayer:
```js
window.dataLayer.push({
  event: 'consent_update',
  consent_analytics_storage: 'granted' | 'denied',
  consent_ad_storage: 'granted' | 'denied',
  consent_ad_user_data: 'granted' | 'denied',
  consent_ad_personalization: 'granted' | 'denied',
});
```

### Categories

| Category | Controls | Consent Key |
|----------|----------|-------------|
| Analytics | GA4, Clarity, Cloudflare Web Analytics | `analytics_storage` |
| Advertising | Meta Pixel, Google Ads | `ad_storage` + `ad_user_data` + `ad_personalization` |
| Essential | GTM itself, Turnstile, GHL External Tracking | Always on (no consent required) |

## dataLayer Event Contract

All events use **lowercase snake_case**. Every event includes:
- `event` — event name
- `event_id` — unique UUID for deduplication
- `event_timestamp` — ISO 8601 timestamp
- `page_location` — current URL
- `page_title` — current page title

### Events

| Event | Trigger | Key Parameters |
|-------|---------|----------------|
| `page_view` | Initial load, SPA navigation | `page_type`, `content_group` |
| `cta_click` | Any CTA button click | `cta_type`, `cta_source`, `cta_text` |
| `nav_click` | Navigation link click | `nav_type`, `nav_target`, `nav_text` |
| `form_start` | First form interaction | `form_id`, `form_name` |
| `form_submit` | Successful form submission | `form_id`, `form_name` |
| `form_error` | Form validation error | `form_id`, `error_message` |
| `popup_open` | Contact popup shown | `popup_trigger` |
| `popup_close` | Popup closed (not dismissed) | `popup_trigger` |
| `popup_dismiss` | Popup permanently dismissed | `popup_trigger` |
| `mobile_menu` | Mobile menu open/close | `menu_action` |
| `section_view` | Section scrolls into view | `section_name` |
| `view_university` | University detail page | `university_name`, `page_type` |
| `view_resource` | Resource detail page | `resource_name`, `page_type` |
| `social_click` | Social link click | `social_platform`, `social_name` |
| `external_link` | External link click | `link_url`, `link_text` |
| `generate_lead` | Confirmed lead conversion | `form_id`, `form_name`, `lead_type`, `service` |
| `consent_update` | User changes consent | `consent_*` keys |

### PII Policy

**NEVER** included in dataLayer events:
- Email, phone, name, message contents
- Passport, SEVIS, immigration details
- Any personally identifiable information

PII is sent ONLY to:
- GHL External Tracking (their own CRM, server-side)
- GHL Direct API (server-side, in /api/contact)

## Conversion Events

### generate_lead (confirmed form submission only)

Fires AFTER:
1. Form passes validation
2. Server returns `{ success: true }`
3. NOT on button click or failed submission

Includes `event_id` for deduplication between browser and server channels.

### GTM Configuration Required

In GTM container, configure these tags:

1. **GA4 Event Tag** — triggered by `generate_lead` dataLayer event
   - Event name: `generate_lead`
   - Event parameters: `form_id`, `form_name`, `service`, `value`, `currency`

2. **Meta Pixel Tag** — triggered by `generate_lead`
   - Use `event_id` from dataLayer for dedup with CAPI
   - Advanced Matching: use server-hashed values (NOT from dataLayer)

3. **Clarity Conversion Tag** — triggered by `generate_lead`

## Public Tracking IDs

| Platform | ID | Location |
|----------|----|----------|
| GTM | GTM-K65M9LJW | Analytics.tsx (env: NEXT_PUBLIC_GTM_ID) |
| GA4 | G-MHC25XBP3P | Configured in GTM (env: NEXT_PUBLIC_GA_ID) |
| Meta Pixel | 2582317282238910 | Configured in GTM (env: NEXT_PUBLIC_META_PIXEL_ID) |
| Clarity | y7hrmh5gu4 | Configured in GTM (env: NEXT_PUBLIC_CLARITY_ID) |
| GHL Tracking | tk_b6bec4688bdc473b85ae341de9f730fc | Analytics.tsx (env: NEXT_PUBLIC_UCSG_TRACKING_ID) |
| CF Analytics | (from env) | layout.tsx (env: NEXT_PUBLIC_CF_ANALYTICS_TOKEN) |

## Server-Side Integrations

### GoHighLevel Direct API
- Endpoint: `services.leadconnectorhq.com/contacts/upsert`
- Auth: Bearer token (server-only env: GHL_API_KEY)
- Pipeline: Optional stage assignment (GHL_PIPELINE_ID, GHL_STAGE_ID)
- UTM passthrough: utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid
- Intent tags: Auto-generated from service field and message body

### Email Notifications
- SMTP via nodemailer (server-only env: SMTP_HOST, SMTP_USER, SMTP_PASS)
- Branded HTML email to EMAIL_TO
- Includes UTM data and lead details

### Form Idempotency
- In-memory rate limiter: one submission per email per 60 seconds
- Returns `{ success: true, id: 'duplicate' }` for repeat submissions

## Environment Variables

See `.env.example` for the complete list.

**Client-side (NEXT_PUBLIC_ prefix):**
- `NEXT_PUBLIC_GTM_ID` — GTM container ID
- `NEXT_PUBLIC_GA_ID` — GA4 measurement ID (fallback in analytics.ts)
- `NEXT_PUBLIC_META_PIXEL_ID` — Meta Pixel ID
- `NEXT_PUBLIC_CLARITY_ID` — Microsoft Clarity project ID
- `NEXT_PUBLIC_UCSG_TRACKING_ID` — GHL external tracking ID
- `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` — Cloudflare Web Analytics token
- `NEXT_PUBLIC_SITE_URL` — Canonical site URL
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — Cloudflare Turnstile site key

**Server-only:**
- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret
- `GHL_API_KEY` — GoHighLevel API key
- `GHL_LOCATION_ID` — GoHighLevel location ID
- `GHL_PIPELINE_ID` — GoHighLevel pipeline ID
- `GHL_STAGE_ID` — GoHighLevel pipeline stage ID
- `UCSG_API_KEY` — UCSG lead tracking API key
- `UCSG_TRACKING_ID` — UCSG lead tracking ID
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_TO`
