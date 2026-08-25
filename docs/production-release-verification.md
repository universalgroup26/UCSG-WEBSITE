# UCSG Production Release Verification

> Last updated: $(date -u +%Y-%m-%d)

## Pre-Release Checklist

### Code Quality
- [ ] `bun run lint` — zero errors
- [ ] No TypeScript errors in critical paths
- [ ] No `console.log` with PII in production code
- [ ] No hardcoded secrets (all via process.env)
- [ ] `.env.example` matches all env vars used in source

### Analytics
- [ ] GTM is the SOLE tag manager (no direct gtag.js, fbq, Clarity)
- [ ] Consent Mode v2 defaults set BEFORE GTM loads
- [ ] Consent banner appears for new visitors
- [ ] "Accept all" grants analytics + advertising
- [ ] "Reject non-essential" denies both
- [ ] "Manage preferences" opens granular controls
- [ ] "Privacy & Cookie Settings" link in footer re-opens banner
- [ ] Consent persists across page reloads (localStorage)
- [ ] GTM tags fire only when consent granted
- [ ] GA4 page_view fires exactly once per page load
- [ ] GA4 page_view fires once per SPA navigation
- [ ] generate_lead fires only after confirmed server success
- [ ] No PII in dataLayer events
- [ ] event_id present on generate_lead for dedup

### Forms
- [ ] Contact form submits successfully
- [ ] Turnstile verification works (when configured)
- [ ] Duplicate submission returns `{ success: true, id: 'duplicate' }`
- [ ] GHL contact created/updated (when configured)
- [ ] Email notification sent (when SMTP configured)
- [ ] Lead saved to local database
- [ ] UTM parameters captured from URL
- [ ] gclid/fbclid preserved in GHL contact

### Navigation
- [ ] All header links work (desktop + mobile)
- [ ] Mega menus open/close correctly
- [ ] All CTAs open contact form popup
- [ ] University cards navigate to detail view
- [ ] Resource cards navigate to detail view
- [ ] Logo navigates to home
- [ ] Footer links work
- [ ] Section navigation floats correctly
- [ ] Back buttons work from detail views

### Responsive
- [ ] Mobile header hamburger menu works
- [ ] Hero slideshow swipe works on touch
- [ ] Contact popup fits on mobile
- [ ] Consent banner fits on mobile
- [ ] Footer stacks correctly on mobile

### Performance
- [ ] Hero image < 250KB
- [ ] No layout shift on page load
- [ ] Fonts loaded efficiently (next/font)
- [ ] Images use Next.js Image optimization

## Post-Deployment Verification

### Infrastructure
- [ ] Production URL returns 200
- [ ] HTTPS working (no mixed content)
- [ ] www and non-www resolve correctly
- [ ] No console errors in browser
- [ ] No CSP violations

### Analytics Verification
- [ ] GTM container loads (check GTM Preview mode)
- [ ] GA4 Realtime shows active user
- [ ] Consent state respected in GTM
- [ ] page_view fires once
- [ ] Form submission triggers generate_lead in dataLayer
- [ ] Meta Test Events shows browser event
- [ ] Event Match Quality populated in Meta

### GHL CRM Verification
- [ ] Test lead creates exactly one contact
- [ ] No duplicate opportunities
- [ ] UTM parameters recorded on contact
- [ ] Pipeline/stage assignment correct
- [ ] Email notification received

## External Services — Access Required

The following require authenticated access that is NOT available in this environment:

| Service | Access Needed | Status |
|---------|--------------|--------|
| Vercel | CLI or dashboard | NOT AVAILABLE (no vercel CLI) |
| Cloudflare | Dashboard + API | NOT AVAILABLE (no API token) |
| GTM Container | Preview mode | NOT AVAILABLE (no browser access) |
| GA4 | DebugView + Realtime | NOT AVAILABLE (no browser access) |
| Meta Events Manager | Test Events | NOT AVAILABLE |
| GoHighLevel | Dashboard + API | NOT AVAILABLE |
| Google Ads | Conversion setup | NOT AVAILABLE |
| GitHub Actions | CI/CD | NOT AVAILABLE (no gh CLI) |

## Deployment Architecture

```
GitHub (universalgroup26/UCSG-WEBSITE)
  └── main branch
        └── Vercel auto-deploy (assumed)
              └── Cloudflare DNS (www → Vercel)
                    └── Production: https://www.universalconsultingservices.com/
```

## Git Information

- **Branch**: main
- **Latest commit**: (see `git log --oneline -1`)
- **Remote**: github.com/universalgroup26/UCSG-WEBSITE.git
- **CI/CD**: None (no .github/workflows/)
- **Branch protection**: Unknown (no gh CLI)

## Known Limitations

1. No server-side Meta CAPI — relies on GTM for browser-side Pixel only
2. GHL_LOCATION_ID, GHL_PIPELINE_ID, GHL_STAGE_ID not configured
3. SMTP_PASS not configured (email notifications won't send)
4. No Google Ads conversion linker configured
5. No A/B testing framework
6. reactStrictMode is disabled
7. TypeScript build errors are suppressed (ignoreBuildErrors: true)
