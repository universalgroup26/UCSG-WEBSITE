/**
 * UCSG Analytics — Canonical dataLayer event system
 *
 * GTM is the SOLE tag manager for GA4, Meta Pixel, and Clarity.
 * This module pushes ONLY to window.dataLayer.
 * Never include PII (email, phone, name, passport, SEVIS) in events.
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
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────

/** Generate a unique event_id for deduplication (no PII) */
function generateEventId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
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
  // NO PII — name/email/phone must NOT appear here
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

// ─── Public tracking API ────────────────────────────────────────────────

/** Initialize dataLayer */
function init() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
}

/** Track page view */
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
  push({
    event: 'view_university',
    university_name: name,
    page_type: 'university',
  });
}

/** Track resource page view */
function resourceView(_id: string, name: string) {
  push({
    event: 'view_resource',
    resource_name: name,
    page_type: 'resource',
  });
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
 * NO PII in dataLayer — name/email/phone must never appear.
 * GTM handles forwarding to GA4/Meta/Clarity server-side.
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
}) {
  if (typeof window === 'undefined') return;

  const eventId = generateEventId();

  // Push NON-PII event to dataLayer (consumed by GTM → GA4/Meta/Clarity)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'generate_lead',
    event_id: eventId,
    event_timestamp: getTimestamp(),
    form_id: params.formId,
    form_name: params.formName || '',
    lead_type: 'contact_form',
    service: params.service || '',
    value: params.value || 0,
    currency: params.currency || 'USD',
    page_location: window.location.href,
    page_title: document.title,
  });

  // GHL External Tracking (if available) — PII is OK here as it's their own CRM
  if (typeof window.goTrackLead === 'function') {
    try {
      window.goTrackLead({
        name: params.name || '',
        email: params.email || '',
        phone: params.phone || '',
        service: params.service || '',
        source: params.formId,
      });
    } catch {
      // GHL tracking not available
    }
  }

  // UCSG tracking queue
  if (Array.isArray(window._ucsgq)) {
    window._ucsgq.push({
      event: 'lead',
      data: {
        name: params.name || '',
        email: params.email || '',
        phone: params.phone || '',
        service: params.service || '',
      },
    });
  }
}

/** Track a custom event */
function customEvent(eventName: string, params?: Record<string, unknown>) {
  push({ event: eventName, ...params });
}

/**
 * Update Google Consent Mode — call when user makes a consent choice.
 * This updates GTM's consent state so tags fire or suppress accordingly.
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
};
