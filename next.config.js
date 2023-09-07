/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  typescript: {
    tsconfigPath: 'tsconfig.build.json',
  },
}

module.exports = nextConfig
