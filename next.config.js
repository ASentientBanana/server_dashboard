/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    baseDir: __dirname
  },
  env: {
    baseUrl: process.env.BASE_URL
  }
}

module.exports = nextConfig
