import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
