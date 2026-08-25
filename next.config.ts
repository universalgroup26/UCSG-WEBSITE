import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  reactStrictMode: true,
  // Allow preview panel cross-origin access
  allowedDevOrigins: ["https://space-z.ai"],
  // Security headers (complement Cloudflare edge security)
  async headers() {
    return [
      {
        source: "/((?!api|_next/static|_next/image|favicon.ico|universities|images|logo.svg|robots.txt).*)",
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
