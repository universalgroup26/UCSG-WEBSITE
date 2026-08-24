/**
 * UCSG Analytics — Type-safe dataLayer event system
 * Works with Google Tag Manager (GTM), GA4, or any dataLayer consumer.
 *
 * Usage:
 *   import { track } from '@/lib/analytics';
 *   track.ctaClick({ type: 'whatsapp', source: 'hero' });
 */

// ─── Declare global dataLayer ───────────────────────────────────────────

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function push(event: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: event.event,
      ...event,
    });
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
  cta_type: 'whatsapp' | 'call' | 'consultation' | 'email' | 'apply';
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
  popup_trigger: 'scroll_50' | 'scroll_90' | 'fab' | 'timeout';
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

type AnalyticsEvent =
  | PageViewEvent
  | CtaClickEvent
  | NavClickEvent
  | FormEvent
  | PopupEvent
  | MobileMenuEvent
  | SectionViewEvent
  | UniversityViewEvent
  | ResourceViewEvent;

// ─── Public tracking API ────────────────────────────────────────────────

/** Initialize dataLayer and push first page view */
function init() {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
  }
}

/** Track SPA page view */
function pageView(title: string, location?: string) {
  push({
    event: 'page_view',
    page_title: title,
    page_location: location || (typeof window !== 'undefined' ? window.location.href : ''),
    page_referrer: typeof document !== 'undefined' ? document.referrer : '',
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
function formEvent(params: Omit<FormEvent, 'event'>) {
  push({ event: params.event, form_id: params.form_id, form_name: params.form_name, error_message: params.error_message });
}

/** Track contact popup events */
function popupEvent(params: Omit<PopupEvent, 'event'>) {
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
};
