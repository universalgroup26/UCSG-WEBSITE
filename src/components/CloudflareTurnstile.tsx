'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Cloudflare Turnstile site key — replace with your actual key from Cloudflare dashboard
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

declare global {
  interface Window {
    turnstile?: {
      render(container: string | HTMLElement, options: Record<string, unknown>): string;
      reset(widgetId: string): void;
      remove(widgetId: string): void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

interface CloudflareTurnstileProps {
  onVerify?: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact' | 'invisible';
  className?: string;
}

export default function CloudflareTurnstile({
  onVerify,
  onError,
  onExpire,
  theme = 'light',
  size = 'normal',
  className = '',
}: CloudflareTurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [loaded, setLoaded] = useState(() => !!window.turnstile);
  const [error, setError] = useState<string | null>(null);
  const isKeyConfigured = !!TURNSTILE_SITE_KEY;

  // Load Turnstile script
  useEffect(() => {
    if (!isKeyConfigured || loaded) return;

    // Define callback for when script loads
    window.onloadTurnstileCallback = () => {
      setLoaded(true);
    };

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback&render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
      }
    };
  }, [isKeyConfigured, loaded]);

  // Render widget when script is loaded
  useEffect(() => {
    if (!loaded || !containerRef.current || !window.turnstile || !isKeyConfigured) return;

    if (widgetIdRef.current) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch {
        // ignore
      }
    }

    containerRef.current.innerHTML = '';

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme,
      size,
      callback: (token: string) => {
        setError(null);
        onVerify?.(token);
      },
      'error-callback': () => {
        setError('Verification failed. Please try again.');
        onError?.();
      },
      'expired-callback': () => {
        setError('Verification expired. Please complete again.');
        onExpire?.();
      },
    });
  }, [loaded, theme, size, onVerify, onError, onExpire, isKeyConfigured]);

  const reset = useCallback(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, []);

  // If no site key configured, show a subtle notice (no state needed)
  if (!isKeyConfigured) {
    return (
      <div className={`flex items-center gap-2 text-xs text-gray-400 ${className}`}>
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span>Bot protection active (Cloudflare)</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <div ref={containerRef} />
      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
