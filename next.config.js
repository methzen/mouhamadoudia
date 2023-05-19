/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false,
    trailingSlash: true,
    env: {
      // HOST
      HOST_API_KEY: 'https://api-dev-minimal-v4.vercel.app',
    },
}

module.exports = nextConfig
