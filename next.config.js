/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.finishline.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
