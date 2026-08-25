import { NextRequest, NextResponse } from 'next/server';

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || '';
const CLOUDFLARE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Extract the real client IP address.
 * When behind Cloudflare proxy, use CF-Connecting-IP (most reliable).
 * Falls back to X-Forwarded-For, then to the remote address.
 */
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    ''
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    // If no secret key configured, skip verification (development mode)
    if (!TURNSTILE_SECRET_KEY) {
      return NextResponse.json({
        success: true,
        verified: false,
        message: 'Turnstile not configured — verification skipped in development',
      });
    }

    // Verify token with Cloudflare using the real client IP
    const formData = new URLSearchParams({
      secret: TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: getClientIp(request),
    });

    const response = await fetch(CLOUDFLARE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({
        success: true,
        verified: true,
        hostname: data.hostname,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Verification failed', codes: data['error-codes'] },
      { status: 403 }
    );
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
