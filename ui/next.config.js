/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n: {
    locales: ['en-US', 'es'],
    defaultLocale: 'en-US'
  },
  images: {
    domains: ['peticure-images.s3.amazonaws.com'],
  }
}

module.exports = nextConfig
