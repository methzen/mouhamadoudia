/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false,
    trailingSlash: true,
    env: {
      // HOST
      "HOST_API_KEY": "http://159.203.125.20:9000",
      "DEV_API_URL" : "http://localhost:9000",
      "PRODUCTION_API_URL": "http://159.203.125.20:9000",
      "GOOGLE_VERIFICATION_ID": "-",
      "BING_VERIFICATION_ID": "",
      "GOOGLE_ANALYTICS_ID" : ""
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
