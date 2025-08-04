import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      domains: ['drive.google.com'],
      unoptimized: true
  }
};

export default nextConfig;
