import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "sonner"; // Thêm import

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
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
      <body className={`${inter.className} antialiased text-secondary`}>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors /> {/* Thêm dòng này */}
      </body>
    </html>
  );
}