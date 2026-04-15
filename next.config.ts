import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // BẮT BUỘC: Để nộp bài trang tĩnh và fix lỗi đường dẫn ảnh
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