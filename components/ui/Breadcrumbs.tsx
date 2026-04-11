"use client";

import React from "react";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export const Breadcrumbs = () => {
  return (
    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
      <Link href="/" className="hover:text-orange-500 transition-colors flex items-center gap-1">
        <Home size={12} /> Trang chủ
      </Link>
      <ChevronRight size={10} />
      <span className="text-slate-900">Thực đơn</span>
    </nav>
  );
};