"use client";

import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8 text-center">
        
        {/* Nội dung thông báo lỗi */}
        <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
          404 - Page Not Found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-10">
          The page you are looking for does not exist.
        </p>

        {/* Cụm nút điều hướng */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Nút về Trang chủ - Dùng Link của Next.js */}
          <Link href="/">
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all">
              <Home size={18} /> Quay về trang chủ
            </button>
          </Link>
          
        </div>

        {/* Footer định danh nhóm (Tùy chọn) */}
        <p className="mt-12 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Foodie App — Group 05
        </p>
      </div>
    </div>
  );
}