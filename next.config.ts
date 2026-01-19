import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Disable Turbopack for production builds (fixes OneDrive sync issues) */
  experimental: {
    turbo: {
      enabled: false
    }
  }
};

export default nextConfig;
