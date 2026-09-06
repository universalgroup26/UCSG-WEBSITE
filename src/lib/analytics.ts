/**
 * UCSG Analytics — Canonical dataLayer + direct platform events
 *
 * Pushes to window.dataLayer for GTM → GA4/Clarity.
 * ALSO fires Meta Pixel fbq() directly (bypass GTM) for reliable Lead events
 * with proper currency. Server-side CAPI handles deduplication.
 *
 * Usage:
 *   import { track } from '@/lib/analytics';
 *   track.ctaClick({ cta_type: 'whatsapp', cta_source: 'hero' });
 */

// ─── Global declarations ─────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    goTrackLead?: (data: Record<string, string>) => void;
    _ucsgq?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown[];
  }
}

// ─── Currency & Value Constants ──────────────────────────────────────

/** ISO 4217 3-letter currency code — MUST match Meta's supported currencies */
const CURRENCY = 'USD';

/** Default lead value in USD. Meta uses this for ROAS calculation.
 *  Set higher if you know your average customer lifetime value. */
const DEFAULT_LEAD_VALUE = 50;

// ─── Helpers ─────────────────────────────────────────────────────────

/** Generate a unique event_id for deduplication (no PII) */
function generateEventId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/** Get current timestamp in ISO 8601 */
function getTimestamp(): string {
  return new Date().toISOString();
}

/** Safely push to dataLayer */
function push(event: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: event.event,
    event_id: event.event_id || generateEventId(),
    event_timestamp: event.event_timestamp || getTimestamp(),
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    page_title: typeof document !== 'undefined' ? document.title : '',
    ...event,
  });
}

/** Fire a Meta Pixel event directly (bypass GTM for reliability) */
function metaPixelTrack(eventName: string, params?: Record<string, unknown>, eventId?: string) {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq === 'function') {
    try {
      if (params && eventId) {
        // Pass event_id as 4th arg for deduplication with server-side CAPI
        window.fbq('track', eventName, params, { event_id: eventId });
      } else if (params) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('track', eventName);
      }
    } catch {
      // Meta Pixel not available
    }
  }
}

// ─── Event type definitions (lowercase snake_case) ───────────────────

interface PageViewEvent {
  event: 'page_view';
  page_type?: string;
  content_group?: string;
}

interface CtaClickEvent {
  event: 'cta_click';
  cta_type: string;
  cta_source: string;
  cta_text?: string;
  cta_url?: string;
}

interface NavClickEvent {
  event: 'nav_click';
  nav_type: string;
  nav_target: string;
  nav_text?: string;
}

interface FormEvent {
  event: 'form_start' | 'form_submit' | 'form_error';
  form_id: string;
  form_name?: string;
  error_message?: string;
}

interface PopupEvent {
  event: 'popup_open' | 'popup_close' | 'popup_dismiss';
  popup_trigger: string;
}

interface MobileMenuEvent {
  event: 'mobile_menu';
  menu_action: 'open' | 'close';
}

interface SectionViewEvent {
  event: 'section_view';
  section_name: string;
}

interface UniversityViewEvent {
  event: 'view_university';
  university_name: string;
  page_type?: string;
}

interface ResourceViewEvent {
  event: 'view_resource';
  resource_name: string;
  page_type?: string;
}

interface SocialClickEvent {
  event: 'social_click';
  social_platform: string;
  social_name: string;
  social_url?: string;
}

interface LeadConversionEvent {
  event: 'generate_lead';
  form_id: string;
  form_name?: string;
  lead_type?: string;
  service?: string;
  value?: number;
  currency?: string;
}

interface ExternalLinkEvent {
  event: 'external_link';
  link_url: string;
  link_text?: string;
}

type AnalyticsEvent =
  | PageViewEvent
  | CtaClickEvent
  | NavClickEvent
  | FormEvent
  | PopupEvent
  | MobileMenuEvent
  | SectionViewEvent
  | UniversityViewEvent
  | ResourceViewEvent
  | SocialClickEvent
  | LeadConversionEvent
  | ExternalLinkEvent;

// ─── GHL goTrackLead queue ──────────────────────────────────────────

const ghlLeadQueue: Array<Record<string, string>> = [];
let ghlFlushInterval: ReturnType<typeof setInterval> | null = null;

function startGHLQueueFlusher() {
  if (ghlFlushInterval) return;
  ghlFlushInterval = setInterval(() => {
    if (typeof window.goTrackLead === 'function' && ghlLeadQueue.length > 0) {
      const pending = ghlLeadQueue.splice(0);
      for (const data of pending) {
        try { window.goTrackLead!(data); } catch { /* skip */ }
      }
      console.log('[GHL] Flushed', pending.length, 'queued lead(s) to goTrackLead');
      clearInterval(ghlFlushInterval!);
      ghlFlushInterval = null;
    }
  }, 1000);

  setTimeout(() => {
    if (ghlFlushInterval) {
      clearInterval(ghlFlushInterval);
      ghlFlushInterval = null;
      if (ghlLeadQueue.length > 0) {
        console.warn('[GHL]', ghlLeadQueue.length, 'queued lead(s) never delivered');
      }
    }
  }, 30000);
}

// ─── Public tracking API ────────────────────────────────────────────────

/** Initialize dataLayer + capture first/last-touch attribution */
function init() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  // Capture UTMs/gclid/fbclid on first mount (persists to localStorage/sessionStorage)
  captureAttribution();
}

/** Track page view (dataLayer + GA4 direct page_view for SPA view changes) */
function pageView(title: string, location?: string) {
  const loc = location || (typeof window !== 'undefined' ? window.location.href : '');
  push({
    event: 'page_view',
    page_title: title,
    page_location: loc,
    page_type: 'website',
  });
  // Fire GA4 page_view directly — GTM History Change trigger may not fire on SPA nav.
  ga4PageView(title, typeof window !== 'undefined' ? window.location.pathname : undefined);
}

/** Track CTA button clicks */
function ctaClick(params: Omit<CtaClickEvent, 'event'>) {
  push({ event: 'cta_click', ...params });
}

/** Track navigation clicks */
function navClick(params: Omit<NavClickEvent, 'event'>) {
  push({ event: 'nav_click', ...params });
}

/** Track form interactions */
function formEvent(params: FormEvent) {
  push({
    event: params.event,
    form_id: params.form_id,
    form_name: params.form_name,
    error_message: params.error_message,
  });
}

/** Track popup events */
function popupEvent(params: PopupEvent) {
  push({ event: params.event, popup_trigger: params.popup_trigger });
}

/** Track mobile menu */
function mobileMenu(action: 'open' | 'close') {
  push({ event: 'mobile_menu', menu_action: action });
}

/** Track section scroll-into-view */
function sectionView(sectionName: string) {
  push({ event: 'section_view', section_name: sectionName });
}

/** Track university page view */
function universityView(_id: string, name: string) {
  push({ event: 'view_university', university_name: name, page_type: 'university' });
}

/** Track resource page view */
function resourceView(_id: string, name: string) {
  push({ event: 'view_resource', resource_name: name, page_type: 'resource' });
}

/** Track social link clicks */
function socialClick(platform: string, name: string, url: string) {
  push({ event: 'social_click', social_platform: platform, social_name: name, social_url: url });
}

/** Track external link clicks */
function externalLink(url: string, text: string) {
  push({ event: 'external_link', link_url: url, link_text: text });
}

/**
 * Track a successful lead conversion.
 *
 * Fires to 3 destinations:
 *   1. dataLayer → GTM → GA4 / Clarity
 *   2. Meta Pixel DIRECTLY: fbq('track','Lead',{value,currency:'USD'})
 *   3. GHL goTrackLead (queued if not loaded yet)
 *
 * Server-side CAPI fires from /api/contact → /api/meta-conversions
 * for deduplication with the same event_id.
 */
function leadConversion(params: {
  formId: string;
  formName?: string;
  name?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  service?: string;
  value?: number;
  currency?: string;
  /** Pass a pre-generated event_id to share with server-side CAPI for deduplication */
  eventId?: string;
  /** External ID for cross-device matching (e.g., user UUID, CRM ID) */
  externalId?: string;
  /** Extra fields to pass to GHL goTrackLead (assessment data, etc.) */
  ghlFields?: Record<string, string>;
}) {
  if (typeof window === 'undefined') return;

  const eventId = params.eventId || generateEventId();
  const leadValue = params.value ?? DEFAULT_LEAD_VALUE;
  const leadCurrency = params.currency || CURRENCY;

  // 1. Push NON-PII event to dataLayer (consumed by GTM → GA4/Clarity)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'generate_lead',
    event_id: eventId,
    event_timestamp: getTimestamp(),
    form_id: params.formId,
    form_name: params.formName || '',
    lead_type: 'contact_form',
    service: params.service || '',
    value: leadValue,
    currency: leadCurrency,
    page_location: window.location.href,
    page_title: document.title,
  });

  // 2. Fire Meta Pixel Lead event DIRECTLY with Advanced Matching
  // Advanced Matching: pass PII directly to fbq for improved event attribution.
  // Meta hashes this data client-side — no raw PII leaves the browser.
  // external_id provides deterministic cross-device matching (per SDK v18.1.3+).
  const userData: Record<string, unknown> = {};
  if (params.email) userData.em = params.email;
  if (params.phone) userData.ph = params.phone;
  if (params.firstName) userData.fn = params.firstName;
  if (params.lastName) userData.ln = params.lastName;
  if (params.externalId) userData.external_id = params.externalId;

  metaPixelTrack('Lead', {
    value: leadValue,
    currency: leadCurrency,
    content_name: params.formName || 'Contact Form',
    content_category: 'lead_generation',
    ...userData,
  }, eventId);

  // 3. GHL External Tracking
  const leadData: Record<string, string> = {
    name: params.name || '',
    email: params.email || '',
    phone: params.phone || '',
    service: params.service || '',
    source: params.formId,
  };

  // Include extra GHL fields if provided (assessment data, etc.)
  if (params.ghlFields) {
    Object.assign(leadData, params.ghlFields);
  }

  if (typeof window.goTrackLead === 'function') {
    try {
      window.goTrackLead(leadData);
      console.log('[GHL] Lead sent via goTrackLead');
    } catch {
      ghlLeadQueue.push(leadData);
      startGHLQueueFlusher();
    }
  } else {
    ghlLeadQueue.push(leadData);
    startGHLQueueFlusher();
    console.log('[GHL] goTrackLead not ready — lead queued');
  }
}

/** Track a custom event */
function customEvent(eventName: string, params?: Record<string, unknown>) {
  push({ event: eventName, ...params });
}

/**
 * Update Google Consent Mode + reconsent Meta Pixel.
 * Call when user makes a consent choice.
 */
function updateConsent(granted: {
  analytics: boolean;
  advertising: boolean;
}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'consent_update',
    consent_analytics_storage: granted.analytics ? 'granted' : 'denied',
    consent_ad_storage: granted.advertising ? 'granted' : 'denied',
    consent_ad_user_data: granted.advertising ? 'granted' : 'denied',
    consent_ad_personalization: granted.advertising ? 'granted' : 'denied',
  });

  // Re-consent Meta Pixel — grant OR revoke based on advertising consent state.
  // Previously only granted (never revoked), leaving fbq stuck in 'grant' if the
  // user later toggled advertising OFF via "Manage preferences".
  if (typeof window.fbq === 'function') {
    try {
      window.fbq('consent', granted.advertising ? 'grant' : 'revoke');
    } catch { /* noop */ }
  }
}

// ─── First-touch / last-touch attribution helpers ──────────────────
// Persist UTMs across sessions so server-side CAPI + GHL get full attribution.
const FIRST_TOUCH_KEY = 'ucsg_first_touch';
const LAST_TOUCH_KEY = 'ucsg_last_touch';

interface TouchData {
  utm?: Record<string, string>;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landingPage?: string;
  timestamp: number;
}

/** Capture UTMs from the URL on page load — call once on app mount. */
function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  const utm: Record<string, string> = {};
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];
  for (const k of utmKeys) {
    const v = url.searchParams.get(k);
    if (v) utm[k] = v;
  }
  const gclid = url.searchParams.get('gclid');
  const fbclid = url.searchParams.get('fbclid');
  const referrer = document.referrer || undefined;
  const landingPage = window.location.pathname + window.location.search;

  // First-touch: write-once (only if not already set)
  try {
    if (!localStorage.getItem(FIRST_TOUCH_KEY)) {
      const first: TouchData = {
        utm: Object.keys(utm).length ? utm : undefined,
        gclid: gclid || undefined,
        fbclid: fbclid || undefined,
        referrer,
        landingPage,
        timestamp: Date.now(),
      };
      localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(first));
    }
  } catch { /* localStorage may be blocked */ }

  // Last-touch: overwrite every page load
  try {
    const last: TouchData = {
      utm: Object.keys(utm).length ? utm : undefined,
      gclid: gclid || undefined,
      fbclid: fbclid || undefined,
      referrer,
      landingPage,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(LAST_TOUCH_KEY, JSON.stringify(last));
  } catch { /* sessionStorage may be blocked */ }
}

/** Read the persisted attribution data (first + last touch) for server-side calls. */
function getAttribution(): { firstTouch?: TouchData; lastTouch?: TouchData } {
  if (typeof window === 'undefined') return {};
  let firstTouch: TouchData | undefined;
  let lastTouch: TouchData | undefined;
  try { firstTouch = JSON.parse(localStorage.getItem(FIRST_TOUCH_KEY) || 'null') || undefined; } catch { /* */ }
  try { lastTouch = JSON.parse(sessionStorage.getItem(LAST_TOUCH_KEY) || 'null') || undefined; } catch { /* */ }
  return { firstTouch, lastTouch };
}

// ─── External ID for cross-device matching ──────────────────────────
const EXTERNAL_ID_KEY = 'ucsg_external_id';

/** Get or create a stable external_id for the user (Meta identity graph). */
function getOrCreateExternalId(): string {
  if (typeof window === 'undefined') return '';
  try {
    let id = localStorage.getItem(EXTERNAL_ID_KEY);
    if (!id) {
      id = (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`);
      localStorage.setItem(EXTERNAL_ID_KEY, id);
    }
    return id;
  } catch {
    return '';
  }
}

/** Fire a GA4 page_view event on SPA view changes (GTM History trigger may not fire). */
function ga4PageView(title: string, path?: string): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'page_view', {
        page_title: title,
        page_location: window.location.href,
        page_path: path || window.location.pathname,
      });
    } catch { /* noop */ }
  }
}

export const track = {
  init,
  pageView,
  ctaClick,
  navClick,
  formEvent,
  popupEvent,
  mobileMenu,
  sectionView,
  universityView,
  resourceView,
  socialClick,
  externalLink,
  leadConversion,
  customEvent,
  updateConsent,
  /** Generate a unique event_id (expose for CAPI deduplication) */
  generateEventId,
  /** Get or create a stable external_id (Meta cross-device matching) */
  getOrCreateExternalId,
  /** Read persisted first/last-touch attribution data */
  getAttribution,
};
