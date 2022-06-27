/** @type {import('next').NextConfig} */

// const registerUser = require('./scripts/database/register');
// const startup = require('./scripts/database/startup');

// registerUser();
// startup();

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
