/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        pathname: '**',
        protocol: 'http',
        port: '3000',
      },
      {
        hostname: 'carsale-production.up.railway.app',
        pathname: '**',
        protocol: 'https',
      },
      {
        hostname: 's3.ap-northeast-1.amazonaws.com',
        pathname: '**',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
