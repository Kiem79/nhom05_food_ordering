import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foodie - Smart Office Meal",
  description: "Giải pháp đặt cơm nhóm thông minh cho dân văn phòng",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {/* Header hiển thị cố định trên tất cả các trang */}
        <Header />
        
        {/* Phần nội dung chính của các trang. 
          pt-16 (padding-top: 64px) để tránh việc nội dung bị Header (thường cao 64px) che khuất.
        */}
        <main className="pt-16 min-h-screen bg-white">
          {children}
        </main>

        {/* Cấu hình hệ thống thông báo Toaster.
          - position="top-right": Hiển thị ở góc trên bên phải theo yêu cầu.
          - expand={true}: Hiển thị chi tiết các thông báo khi có nhiều thông báo cùng lúc.
          - richColors: Hiển thị màu sắc tương ứng với trạng thái (thành công, lỗi...).
        */}
        <Toaster 
          position="top-right" 
          expand={true} 
          richColors 
          closeButton
          duration={3000}
        />
      </body>
    </html>
  );
}