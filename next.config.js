/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    DOMAIN: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000',
  },
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig
