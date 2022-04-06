/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // trailingSlash: true,
  images: {
    domains: [
      'fakestoreapi.com',
      'naszsklep-api.vercel.app',
      'media.graphassets.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      {
        source: '/offer',
        destination: '/offer/1',
      },
    ];
  },
};

module.exports = nextConfig;
