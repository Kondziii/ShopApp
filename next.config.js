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
  // async redirects() {
  //   return [
  //     {
  //       source: '/pagination2',
  //       destination: '/pagination2/1',
  //       permanent: true,
  //     },
  //     {
  //       source: '/offer',
  //       destination: '/offer/1',
  //       permanent: true,
  //     },
  //   ];
  // },
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
