import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost', 'c8.alamy.com', 'media.istockphoto.com', 't4.ftcdn.net', 'hoschtonanimalhospital.com'],
  },
  // Add rewrites configuration
  async rewrites() {
    return [
      // Handle the root path first
      {
        source: '/dashboard',
        destination: '/dashboard/offers',
      },
      // Handle all other dashboard routes
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'referer',
          },
        ],
        destination: '/dashboard/:path*',
      },
    ];
  },
};

export default nextConfig;
