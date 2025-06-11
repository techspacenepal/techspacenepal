import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'example.com', 'placehold.co'],
  },
};

export default nextConfig;
