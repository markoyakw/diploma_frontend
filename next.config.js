/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: false,
  env: {
    API_BASE_URL: 'https://diploma-backend-m4dnok1d1-mrkykvnks-projects.vercel.app/',
    BASE_URL: 'https://yakovenkodiploma.vercel.app/'
  },
  eslint: {
    warnings: false
  }
}

module.exports = nextConfig
