/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false,
    trailingSlash: true,
    env: {
      // HOST
      "HOST_API_KEY": "https://www.api.mouhamadoudia.me",
      "DEV_API_URL" : "http://localhost:9000",
      "PRODUCTION_API_URL": "https://www.api.mouhamadoudia.me",
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
