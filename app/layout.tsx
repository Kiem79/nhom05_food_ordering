import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Import font từ thư viện của Next.js
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

// Cấu hình font Inter với hỗ trợ tiếng Việt
const inter = Inter({ 
  subsets: ["latin", "vietnamese"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Foodie - Đặt món nhóm thông minh",
  description: "Đồ án thiết kế Web - Nhóm 05 - HCMUTE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      {/* Gán font vào className của body để áp dụng toàn trang */}
      <body className={`${inter.className} antialiased text-secondary`}>
        <Header />
        {/* Main padding-top 16 (64px) để không bị Header đè lên nội dung */}
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}