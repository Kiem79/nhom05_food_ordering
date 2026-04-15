"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, LogOut } from "lucide-react";
import useAuthStore from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

// IMPORT SEARCHBAR CỦA NHI
import SearchBar from "@/components/search/SearchBar";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Tránh lỗi Hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Thực đơn", href: "/restaurants" },
    { name: "Đặt nhóm", href: "/group-order" },
    { name: "Lịch sử", href: "/dashboard" },
    { name: "Thành viên", href: "/about" },
    { name: "Liên hệ", href: "/contact" }, // Đã thêm Liên hệ
  ];

  const handleLogout = () => {
    if (confirm("Bạn muốn đăng xuất thật à?")) {
      logout();
      clearCart?.();
      router.push("/");
    }
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">

        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-orange-200 group-hover:bg-slate-900 transition-all duration-500">
            F.
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic hidden sm:block">
            Foodie.
          </span>
        </Link>

        {/* --- SMART SEARCH (NHI) --- */}
        <div className="flex-1 flex justify-center max-w-lg">
          <SearchBar />
        </div>

        {/* --- NAVIGATION & ACTIONS --- */}
        <div className="flex items-center gap-8">
          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={`${link.href}-${index}`}
                href={link.href}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                  pathname === link.href ? "text-orange-500" : "text-slate-400 hover:text-slate-900"
                }`}
              >
                {link.name}
                {/* Thanh gạch chân hiệu ứng khi Active */}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 border-l pl-6 border-slate-100">
            {/* CART ICON */}
            <Link 
              href="/group-order" 
              className={`relative p-2.5 transition-all duration-300 rounded-2xl ${
                  pathname === '/group-order' ? "text-orange-500 bg-orange-50" : "text-slate-400 hover:text-orange-500 hover:bg-slate-50"
              }`}
            >
              <ShoppingCart size={22} />
              {items?.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {items.length}
                </span>
              )}
            </Link>

            {/* USER SECTION */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1 tracking-tighter">Leader</p>
                  <p className="text-xs font-black text-slate-900 leading-none">{user.name}</p>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="p-2.5 text-slate-400 hover:text-red-500 transition-all active:scale-90 hover:bg-red-50 rounded-xl"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-xl shadow-slate-200 active:scale-95"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}