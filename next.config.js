/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ignoreBuildErrors: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  env: {
    DB_USERNAME: 'kalashin'
  }
}

module.exports = nextConfig
