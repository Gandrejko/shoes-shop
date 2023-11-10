/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ['media.finishline.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
