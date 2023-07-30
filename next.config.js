/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // ignoreBuildErrors: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
