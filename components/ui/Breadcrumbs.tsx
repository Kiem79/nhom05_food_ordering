"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const routeLabels: Record<string, string> = {
  "cart": "Giỏ hàng",
  "checkout": "Thanh toán",
  "group-order": "Giỏ hàng nhóm",
  "order-tracking": "Theo dõi đơn hàng",
  "restaurants": "Nhà hàng",
  "dashboard": "Lịch sử",
  "about": "Thành viên",
  "contact": "Liên hệ",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  const pathSegments = pathname.split("/").filter((item) => item !== "");

  return (
    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
      <Link 
        href="/" 
        className="flex items-center gap-1.5 text-slate-400 hover:text-orange-500 transition-colors group"
      >
        <Home size={12} className="group-hover:scale-110 transition-transform" />
        <span>Trang chủ</span>
      </Link>

      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;
        const label = routeLabels[segment] || segment;

        return (
          <div key={href} className="flex items-center gap-2">
            <ChevronRight size={12} className="text-slate-300 dark:text-slate-700" />
            
            {isLast ? (
              <span className="text-orange-500 italic">{label}</span>
            ) : (
              <Link 
                href={href} 
                className="text-slate-400 hover:text-orange-500 transition-colors"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}