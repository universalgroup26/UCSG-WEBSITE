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
function metaPixelTrack(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq === 'function') {
    try {
      if (params) {
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

/** Initialize dataLayer */
function init() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
}

/** Track page view (dataLayer only — Meta PageView fires from base code) */
function pageView(title: string, location?: string) {
  push({
    event: 'page_view',
    page_title: title,
    page_location: location || (typeof window !== 'undefined' ? window.location.href : ''),
    page_type: 'website',
  });
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
  service?: string;
  value?: number;
  currency?: string;
  /** Pass a pre-generated event_id to share with server-side CAPI for deduplication */
  eventId?: string;
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

  // 2. Fire Meta Pixel Lead event DIRECTLY with value + currency
  // This guarantees Meta receives the currency even if GTM tag is misconfigured
  metaPixelTrack('Lead', {
    value: leadValue,
    currency: leadCurrency,
    content_name: params.formName || 'Contact Form',
    content_category: 'lead_generation',
  });

  // 3. GHL External Tracking
  const leadData = {
    name: params.name || '',
    email: params.email || '',
    phone: params.phone || '',
    service: params.service || '',
    source: params.formId,
  };

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

  // Re-consent Meta Pixel when advertising is granted
  if (granted.advertising && typeof window.fbq === 'function') {
    try {
      window.fbq('consent', 'grant');
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
};
