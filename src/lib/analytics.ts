/**
 * UCSG Analytics — Type-safe dataLayer + GA4 event system
 * Dual-pushes to window.dataLayer (for GTM) AND gtag() (for GA4).
 *
 * Usage:
 *   import { track } from '@/lib/analytics';
 *   track.ctaClick({ type: 'whatsapp', source: 'hero' });
 */

// ─── Declare global dataLayer ───────────────────────────────────────────

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
    clarity: (...args: unknown[]) => void;
    goTrackLead?: (data: Record<string, string>) => void;
    _ucsgq?: Record<string, unknown>[];
  }
}

const GA_ID = 'G-MHC25XBP3P';

/** Push to dataLayer AND fire gtag event for GA4 */
function push(event: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  // 1. Push to dataLayer (consumed by GTM)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: event.event,
    ...event,
  });

  // 2. Fire gtag event for GA4 (if gtag is loaded)
  if (typeof window.gtag === 'function') {
    // Map our custom event names to GA4 event names
    const gaEventMap: Record<string, string> = {
      page_view: 'page_view',
      cta_click: 'generate_lead',
      nav_click: 'navigation_click',
      form_start: 'form_start',
      form_submit: 'generate_lead',
      form_error: 'exception',
      popup_open: 'popup_open',
      popup_close: 'popup_close',
      popup_dismiss: 'popup_dismiss',
      mobile_menu: 'menu_interaction',
      section_view: 'scroll',
      university_view: 'page_view',
      resource_view: 'page_view',
      social_click: 'share',
      external_link: 'outbound_click',
      lead_conversion: 'generate_lead',
    };

    const gaEventName = gaEventMap[event.event] || event.event;

    // Build GA4 event params
    const gaParams: Record<string, string | number | boolean> = {};
    if (event.event === 'cta_click') {
      gaParams.cta_type = event.cta_type as string;
      gaParams.cta_source = event.cta_source as string;
      gaParams.cta_text = (event.cta_text as string) || '';
    } else if (event.event === 'nav_click') {
      gaParams.nav_type = event.nav_type as string;
      gaParams.nav_target = event.nav_target as string;
      gaParams.nav_text = (event.nav_text as string) || '';
    } else if (event.event === 'form_submit') {
      gaParams.form_id = event.form_id as string;
      gaParams.form_name = (event.form_name as string) || '';
    } else if (event.event === 'form_error') {
      gaParams.form_id = event.form_id as string;
      gaParams.error_message = (event.error_message as string) || '';
      gaParams.fatal = false;
    } else if (event.event === 'popup_open' || event.event === 'popup_close' || event.event === 'popup_dismiss') {
      gaParams.popup_trigger = event.popup_trigger as string;
    } else if (event.event === 'section_view') {
      gaParams.section_name = event.section_name as string;
    } else if (event.event === 'university_view') {
      gaParams.page_title = `${event.university_name} | UCSG`;
      gaParams.university_id = event.university_id as string;
    } else if (event.event === 'resource_view') {
      gaParams.page_title = `${event.resource_name} | UCSG`;
      gaParams.resource_id = event.resource_id as string;
    } else if (event.event === 'social_click') {
      gaParams.method = event.social_platform as string;
      gaParams.content_type = 'social_link';
      gaParams.item_id = event.social_name as string;
    } else if (event.event === 'external_link') {
      gaParams.link_url = event.link_url as string;
      gaParams.link_text = event.link_text as string;
      gaParams.outbound = true;
    }

    window.gtag('event', gaEventName, gaParams);
  }

  // 3. Fire Meta Pixel event (if fbq is loaded)
  if (typeof window.fbq === 'function') {
    const metaEventMap: Record<string, string | null> = {
      page_view: 'PageView',
      cta_click: 'Lead',
      form_submit: 'Lead',
      form_start: 'Contact',
      section_view: null, // no direct Meta equivalent — skip
      university_view: 'ViewContent',
      resource_view: 'ViewContent',
      nav_click: null,
      popup_open: null,
      popup_close: null,
      popup_dismiss: null,
      mobile_menu: null,
      social_click: null,
      external_link: null,
      form_error: null,
      lead_conversion: 'Lead',
    };

    const metaEventName = metaEventMap[event.event];
    if (metaEventName) {
      const metaParams: Record<string, string> = {};
      if (event.event === 'cta_click') {
        metaParams.content_name = `${event.cta_type} — ${event.cta_source}`;
      } else if (event.event === 'form_submit') {
        metaParams.content_name = event.form_id as string;
      } else if (event.event === 'university_view') {
        metaParams.content_name = event.university_name as string;
        metaParams.content_category = 'University';
      } else if (event.event === 'resource_view') {
        metaParams.content_name = event.resource_name as string;
        metaParams.content_category = 'Resource';
      }
      window.fbq('track', metaEventName, metaParams);
    }
  }
}

// ─── Event type definitions ─────────────────────────────────────────────

interface PageViewEvent {
  event: 'page_view';
  page_title: string;
  page_location: string;
  page_referrer: string;
}

interface CtaClickEvent {
  event: 'cta_click';
  cta_type: 'whatsapp' | 'call' | 'consultation' | 'email' | 'apply' | 'situation_card' | 'program_details_requested' | 'assessment_fab';
  cta_source: string; // where the click happened: hero, footer, popup, mobile_menu, contact_page, university_page, etc.
  cta_text?: string; // button label text
  cta_url?: string; // href destination
}

interface NavClickEvent {
  event: 'nav_click';
  nav_type: 'header' | 'footer' | 'mobile_menu' | 'body';
  nav_target: string; // 'home', 'university:trine', 'resource:day1-cpt', 'contact', 'scholarships'
  nav_text?: string;
}

interface FormEvent {
  event: 'form_start' | 'form_submit' | 'form_error';
  form_id: string; // 'contact_popup' | 'contact_page'
  form_name?: string;
  error_message?: string;
}

interface PopupEvent {
  event: 'popup_open' | 'popup_close' | 'popup_dismiss';
  popup_trigger: 'scroll_50' | 'scroll_90' | 'fab' | 'timeout' | 'scroll_60' | 'exit_intent';
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
  event: 'university_view';
  university_id: string;
  university_name: string;
}

interface ResourceViewEvent {
  event: 'resource_view';
  resource_id: string;
  resource_name: string;
}

interface SocialClickEvent {
  event: 'social_click';
  social_platform: string;
  social_name: string;
  social_url: string;
}

interface LeadConversionEvent {
  event: 'lead_conversion';
  form_id: string;
  form_name?: string;
  lead_name?: string;
  lead_email?: string;
  lead_phone?: string;
  lead_service?: string;
  value?: number;
  currency?: string;
}

interface ExternalLinkEvent {
  event: 'external_link';
  link_url: string;
  link_text: string;
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
  | ExternalLinkEvent
  | LeadConversionEvent;

// ─── Public tracking API ────────────────────────────────────────────────

/** Initialize dataLayer and push first page view */
function init() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
}

/** Track SPA page view */
function pageView(title: string, location?: string) {
 push({
    event: 'page_view',
    page_title: title,
    page_location: location || (typeof window !== 'undefined' ? window.location.href : ''),
    page_referrer: typeof document !== 'undefined' ? document.referrer : '',
  });
  // Also update GA4 page title for SPA navigation
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_ID, {
      page_title: title,
      page_location: location || window.location.href,
    });
  }
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
  push({ event: params.event, form_id: params.form_id, form_name: params.form_name, error_message: params.error_message });
}

/** Track contact popup events */
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
function universityView(id: string, name: string) {
  push({ event: 'university_view', university_id: id, university_name: name });
}

/** Track resource page view */
function resourceView(id: string, name: string) {
  push({ event: 'resource_view', resource_id: id, resource_name: name });
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
 * Track a successful lead conversion — fires to ALL analytics platforms:
 * 1. dataLayer (GTM + UCSG external tracking)
 * 2. GA4 via gtag (generate_lead with value)
 * 3. Meta Pixel (Lead with Advanced Matching)
 * 4. Microsoft Clarity (conversion event)
 * 5. GoHighLevel external tracking (if exposed)
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

  // 1. Push to dataLayer (GTM + UCSG external tracking consume this)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'lead_conversion',
    form_id: params.formId,
    form_name: params.formName || '',
    lead_name: params.name || '',
    lead_email: params.email || '',
    lead_phone: params.phone || '',
    lead_service: params.service || '',
    value: params.value || 0,
    currency: params.currency || 'USD',
  });

  // 2. GA4 — generate_lead with value
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      form_id: params.formId,
      form_name: params.formName || '',
      currency: params.currency || 'USD',
      value: params.value || 0,
    });
  }

  // 3. Meta Pixel — Lead with Advanced Matching (hashed PII)
  if (typeof window.fbq === 'function') {
    const metaParams: Record<string, string> = {
      content_name: params.formId,
      content_category: 'Lead Form',
    };
    if (params.service) metaParams.service = params.service;

    // Advanced Matching — send user data for better attribution
    if (params.email || params.name || params.phone) {
      window.fbq('init', '2582317282238910', {
        em: params.email || undefined,
        fn: params.name?.split(' ')[0] || undefined,
        ln: params.name?.split(' ').slice(1).join(' ') || undefined,
        ph: params.phone || undefined,
      });
    }

    window.fbq('track', 'Lead', metaParams);
  }

  // 4. Microsoft Clarity — custom conversion event
  if (typeof window.clarity === 'function') {
    try {
      (window.clarity as (...args: unknown[]) => void)('event', params.formId);
    } catch {
      // Clarity not loaded yet — ignore
    }
  }

  // 5. GoHighLevel external tracking — try to call exposed lead tracker
  //    The external-tracking.js script may expose goTrackLead or _ucsgq
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
      // GHL tracking function not available
    }
  }

  // Also push to UCSG tracking queue if available
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

/** Track a custom/generic event to dataLayer and GA4 */
function customEvent(eventName: string, params?: Record<string, unknown>) {
  push({ event: eventName, ...params });
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
};
