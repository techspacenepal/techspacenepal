// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   images: {
//     // domains: ['localhost', 'example.com', 'placehold.co'],
//     domains: ["cloudinary.hbs.edu", "placehold.co"],
//   },
  
  
// };


// export default nextConfig;


// next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cloudinary.hbs.edu',
      'placehold.co',
      'example.com', // 👈 यो तपाईंको thumbnail URL को host हो भने
    ],
  },
};

export default nextConfig;
