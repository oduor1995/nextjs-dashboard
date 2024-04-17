/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { tls: false, fs: false };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during production builds
  },
};

module.exports = nextConfig;

