import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cloudinary.hbs.edu',
      'placehold.co',
      'example.com',
      'localhost', // ✅ Add this to fix your error
    ],
  },
};

export default nextConfig;
