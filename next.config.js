/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
        protocol: 'https',
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
