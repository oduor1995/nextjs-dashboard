/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = { tls: false, fs: false };
    
        return config;
      }, 
};

module.exports = nextConfig;

