import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Needed because each language has its own root layout.
    globalNotFound: true,
  },
};

export default nextConfig;
