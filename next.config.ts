import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: Do NOT set output: "standalone" — Vercel uses its own build system.
  // standalone is only for Docker / self-hosted deployments.
  reactStrictMode: true,
  // Allow preview panel cross-origin access (dev only, no effect in prod)
  allowedDevOrigins: ["https://space-z.ai"],
  // Skip static generation during dev for faster startup in sandboxed env
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
