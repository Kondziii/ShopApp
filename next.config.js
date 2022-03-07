/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // trailingSlash: true,
  images: {
    domains: ['fakestoreapi.com', 'naszsklep-api.vercel.app'],
  },
  async redirects() {
    return [
      {
        source: '/pagination2',
        destination: '/pagination2/1',
        permanent: true,
      },
      {
        source: '/pagination3',
        destination: '/pagination3/1',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
