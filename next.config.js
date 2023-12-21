/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: false,
  env: {
    API_BASE_URL: 'https://api-h5ti.onrender.com/',
    BASE_URL: 'https://yakovenkomarko.netlify.app/'
  },
  eslint: {
    warnings: false
  }
}

module.exports = nextConfig
