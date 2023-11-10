/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: false,
  env: {
    API_BASE_URL: 'http://localhost:5000/',
    BASE_URL: 'http://localhost:3000/'
  },
  eslint: {
    warnings: false
  }
}

module.exports = nextConfig
