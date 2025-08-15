const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },

  env: {
    STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
    STRAPI_API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
  }
};
 
module.exports = withNextIntl(nextConfig);
