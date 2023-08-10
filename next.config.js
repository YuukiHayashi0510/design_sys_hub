/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
