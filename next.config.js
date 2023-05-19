/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false,
    trailingSlash: true,
    env: {
      // HOST
      HOST_API_KEY: 'https://api-dev-minimal-v4.vercel.app',
      "DEV_API_URL" : "http://localhost:9000",
      "PRODUCTION_API_URL": "https://www.api.mouhamadoudia.me",
      "GOOGLE_VERIFICATION_ID": "-i0ge6GT1_bmt498IqJC9wkY89wKXcyRbykxPVwnCP8",
      "BING_VERIFICATION_ID": "320EE17964C6F08B23981F78063CB919",
      "GOOGLE_ANALYTICS_ID" : "G-7VL7TDTGT5"
    },
}

module.exports = nextConfig
