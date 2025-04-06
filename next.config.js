/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
  },
  swcMinify: false,
  experimental: {
    optimizeCss: false
  },
  // Disable telemetry and tracing to avoid file access issues
  telemetry: { 
    disabled: true 
  },
  reactStrictMode: true,
}

module.exports = nextConfig
