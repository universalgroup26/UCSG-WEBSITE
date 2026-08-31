'use client';

import { useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { CalendarDays } from 'lucide-react';
import { track } from '@/lib/analytics';

const GHL_BOOKING_URL =
  'https://lead.universalconsultingservices.com/widget/booking/czfpsgCdiNUEWSQoYIaU';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function BookingCalendar({ open, onClose }: Props) {
  const handleClose = useCallback(() => {
    track.popupEvent({ event: 'popup_close', popup_trigger: 'booking_calendar' });
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      track.popupEvent({ event: 'popup_open', popup_trigger: 'booking_calendar' });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent
        className="sm:max-w-[640px] lg:max-w-[720px] p-0 overflow-hidden rounded-2xl"
        aria-label="Book Appointment"
      >
        {/* Header bar */}
        <div className="flex items-center gap-2.5 bg-[#061846] px-5 py-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D6A84B]/15">
            <CalendarDays className="h-[18px] w-[18px] text-[#D6A84B]" aria-hidden="true" />
          </div>
          <div>
            <DialogTitle className="text-sm font-heading font-semibold text-white">
              Book Your Appointment
            </DialogTitle>
            <p className="text-[11px] text-white/50">
              Select a date and time that works for you
            </p>
          </div>
        </div>

        {/* GHL Booking iframe */}
        <iframe
          src={GHL_BOOKING_URL}
          allow="payment"
          title="GHL Booking Calendar"
          className="h-[560px] w-full border-0"
        />
      </DialogContent>
    </Dialog>
  );
}
