import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bắt buộc để xuất file tĩnh nộp bài
  output: 'export', 
  // Thay 'nhom05_food_ordering' bằng đúng tên repo của bạn
  basePath: '/nhom05_food_ordering', 
  images: {
    unoptimized: true, // Bắt buộc cho GitHub Pages
  },
};

export default nextConfig;