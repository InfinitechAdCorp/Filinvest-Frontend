
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
