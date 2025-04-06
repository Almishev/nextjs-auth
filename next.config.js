/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
  },
  swcMinify: false,
  experimental: {
    instrumentationHook: false,
    optimizeCss: false
  },
  // Disable telemetry and tracing to avoid file access issues
  telemetry: { 
    disabled: true 
  },
  reactStrictMode: true,
}

module.exports = nextConfig
