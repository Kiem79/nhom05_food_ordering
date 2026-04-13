import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Foodie - Đặt món nhóm thông minh",
  description: "Đồ án thiết kế Web - Nhóm 05 - HCMUTE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased text-primary bg-white min-h-screen flex flex-col`}
      >
        {/* Header */}
        <Header />

        {/* Main */}
        <main className="flex-1 pt-16">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Toaster */}
        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
          duration={3000}
        />
      </body>
    </html>
  );
}