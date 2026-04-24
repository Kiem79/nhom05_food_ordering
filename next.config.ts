import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/nhom05_food_ordering",
  
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;