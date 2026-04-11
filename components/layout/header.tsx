"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/cartStore";

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const cart = useCartStore((state: any) => state.cart) || [];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  const timer = setTimeout(() => {
    setMounted(true);
  }, 0);

  return () => clearTimeout(timer);
}, []);

  if (!mounted) return <header className="h-16 bg-white border-b border-slate-100" />;

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        
        {/* LOGO CŨ TRÊN NỀN HIỆN ĐẠI */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="bg-orange-500 text-white p-1.5 rounded-xl text-xl shadow-sm group-hover:scale-110 transition-transform">
            🍴
          </span>
          <span className="text-2xl font-black italic tracking-tighter text-orange-500">
            Foodie.
          </span>
        </Link>

        <nav className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          <Link href="/" className="hover:text-orange-500 transition-colors">Trang chủ</Link>
          <Link href="/products" className="hover:text-orange-500 transition-colors">Thực đơn</Link>
          <Link href="/group-order" className="text-orange-500 border-b-2 border-orange-500 pb-1">Đặt nhóm</Link>
          <Link href="/about" className="hover:text-orange-500 transition-colors">Thành viên</Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative p-2 text-slate-600 hover:bg-orange-50 rounded-full transition-colors cursor-pointer group">
            <span className="text-xl group-hover:rotate-12 transition-transform inline-block">🛒</span>
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 bg-orange-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {cart.length}
              </span>
            )}
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-3 pl-3 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-slate-300 uppercase leading-none mb-1">Thành viên</p>
                <p className="text-sm font-black text-slate-800 tracking-tight">{user?.name}</p>
              </div>
              <div className="w-9 h-9 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center font-black text-sm border border-orange-100 shadow-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button onClick={logout} className="p-2 text-slate-300 hover:text-red-500 transition-colors text-lg">
                 🚪
              </button>
            </div>
          ) : (
            <Link href="/auth" className="bg-orange-500 text-white px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-100">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;