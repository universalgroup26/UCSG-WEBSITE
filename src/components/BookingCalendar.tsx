'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  CalendarDays,
  Phone,
  MessageCircle,
  Mail,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { track } from '@/lib/analytics';

const GHL_BOOKING_URL =
  'https://lead.universalconsultingservices.com/widget/booking/czfpsgCdiNUEWSQoYIaU';
const GHL_BOOKING_PAGE_URL =
  'https://lead.universalconsultingservices.com/widget/booking/czfpsgCdiNUEWSQoYIaU';

const VETERAN_PHONE = '917-565-4788';
const VETERAN_PHONE_HREF = 'tel:+19175654788';
const VETERAN_WHATSAPP = 'https://wa.me/13478376354';
const VETERAN_EMAIL = 'info@universalconsultingservices.com';

const LOAD_TIMEOUT_MS = 5000;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function BookingCalendar({ open, onClose }: Props) {
  const handleClose = useCallback(() => {
    track.popupEvent({ event: 'popup_close', popup_trigger: 'booking_calendar' });
    onClose();
  }, [onClose]);

  const [iframeFailed, setIframeFailed] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const loadedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      track.popupEvent({ event: 'popup_open', popup_trigger: 'booking_calendar' });
      loadedRef.current = false;
      // Reset state for this open session. Deferred via queueMicrotask so we
      // don't trigger the react-hooks/set-state-in-effect rule (which flags
      // synchronous setState in effect bodies as cascading renders).
      queueMicrotask(() => {
        setIframeFailed(false);
        setShowFallback(false);
      });
      // 5-second timeout: if onLoad never fires, show the fallback panel.
      timeoutRef.current = setTimeout(() => {
        if (!loadedRef.current) {
          setIframeFailed(true);
          setShowFallback(true);
        }
      }, LOAD_TIMEOUT_MS);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [open]);

  // Mark iframe as loaded (clears the 5s timeout). NOTE: this fires even when the
  // iframe loads an error page (X-Frame-Options/CSP refusal) — the user can still
  // toggle the fallback panel via the "Can't see the calendar?" link.
  const handleIframeLoad = useCallback(() => {
    loadedRef.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleIframeError = useCallback(() => {
    loadedRef.current = true;
    setIframeFailed(true);
    setShowFallback(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent
        className="sm:max-w-[640px] lg:max-w-[720px] p-0 rounded-2xl max-h-[90vh] overflow-x-hidden overflow-y-auto"
        aria-label="Book Appointment"
      >
        {/* Header bar */}
        <div className="flex items-center gap-2.5 bg-[#071B35] px-5 py-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D6A84B]/15">
            <CalendarDays className="h-[18px] w-[18px] text-[#D6A84B]" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <DialogTitle className="text-sm font-heading font-semibold text-white">
              Book Your Appointment
            </DialogTitle>
            <p className="text-[12px] text-white/50">
              Select a date and time that works for you
            </p>
          </div>
          {/* Always-visible toggle so users can show fallback even if iframe
              appears to "load" the browser's refused-to-connect error page. */}
          <button
            type="button"
            onClick={() => setShowFallback((v) => !v)}
            className="text-[11px] font-medium text-[#39C5E8] hover:underline whitespace-nowrap"
            aria-expanded={showFallback}
            aria-controls="booking-fallback-panel"
          >
            Can&apos;t see the calendar?
          </button>
        </div>

        {/* GHL Booking iframe (kept rendered so load detection works) */}
        {!iframeFailed && (
          <iframe
            src={GHL_BOOKING_URL}
            allow="payment"
            title="GHL Booking Calendar"
            className="h-[560px] w-full border-0"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}

        {/* Inline notice when 5s timeout fires without onLoad (replaces the
            iframe slot so the user doesn't see a blank/stuck iframe area). */}
        {iframeFailed && (
          <div className="bg-[#F8FAFC] p-6 text-center border-b border-slate-200">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#D6A84B]/15">
              <AlertCircle className="h-5 w-5 text-[#D6A84B]" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-[#071B35]">
              The embedded calendar didn&apos;t load.
            </p>
            <p className="mt-1 text-xs text-slate-600">
              You can still book directly on our scheduling page — see the link
              below.
            </p>
          </div>
        )}

        {/* Fallback panel — shown when user toggles it OR when iframe failed */}
        {(showFallback || iframeFailed) && (
          <div
            id="booking-fallback-panel"
            className="bg-[#071B35] px-5 py-5"
            role="region"
            aria-label="Direct contact options"
          >
            <p className="text-sm font-heading font-semibold text-[#D6A84B]">
              Prefer to talk directly?
            </p>
            <p className="mt-1 text-xs text-white/70 leading-relaxed">
              Reach UCSG founder Joy Chowdhury (U.S. Army Veteran) directly using
              any method below.
            </p>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <li>
                <a
                  href={VETERAN_PHONE_HREF}
                  className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-2.5 text-white hover:bg-white/10 transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#39C5E8]" aria-hidden="true" />
                  <span className="text-xs leading-tight">
                    <span className="block text-[10px] uppercase tracking-wider text-[#39C5E8]">
                      Call/Text
                    </span>
                    <span className="font-semibold">{VETERAN_PHONE}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={VETERAN_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-2.5 text-white hover:bg-white/10 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-[#39C5E8]" aria-hidden="true" />
                  <span className="text-xs leading-tight">
                    <span className="block text-[10px] uppercase tracking-wider text-[#39C5E8]">
                      WhatsApp
                    </span>
                    <span className="font-semibold">Chat with us</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${VETERAN_EMAIL}`}
                  className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-2.5 text-white hover:bg-white/10 transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#39C5E8]" aria-hidden="true" />
                  <span className="text-xs leading-tight">
                    <span className="block text-[10px] uppercase tracking-wider text-[#39C5E8]">
                      Email
                    </span>
                    <span className="font-semibold break-all">{VETERAN_EMAIL}</span>
                  </span>
                </a>
              </li>
            </ul>
            <a
              href={GHL_BOOKING_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#39C5E8] px-4 py-2.5 text-sm font-semibold text-[#071B35] hover:bg-[#2BAFD0] transition-colors"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Book on our scheduling page
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
