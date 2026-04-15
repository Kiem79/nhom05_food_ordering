"use client";

import React from "react";
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

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Thực đơn", href: "/restaurants" },
    { name: "Đặt nhóm", href: "/group-order" },
    { name: "Lịch sử", href: "/dashboard" },   
    { name: "Thành viên", href: "/about" },
  ];

  const handleLogout = () => {
    if (confirm("Bạn muốn đăng xuất thật à?")) {
      logout();
      clearCart?.();
      router.push("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

        {/* LOGO - GIỮ STYLE CỦA MẠNH */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-black italic shadow-lg shadow-orange-200 group-hover:bg-slate-900 transition-colors">
            F.
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase italic">
            Foodie.
          </span>
        </Link>

        {/* SMART SEARCH - CHÈN VÀO GIỮA THEO CODE CỦA NHI */}
        <div className="flex-1 flex justify-center max-w-md">
          <SearchBar />
        </div>

        {/* NAVIGATION & ACTIONS */}
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={`${link.href}-${index}`}
                href={link.href}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                  pathname === link.href ? "text-orange-500" : "text-slate-400 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 border-l pl-4 border-slate-100">
            {/* CART ICON - HREF SANG GROUP-ORDER */}
            <Link 
              href="/group-order" 
              className={`relative p-2 transition-all duration-300 rounded-xl ${
                  pathname === '/group-order' ? "text-orange-500 bg-orange-50" : "text-slate-400 hover:text-orange-500 hover:bg-slate-50"
              }`}
            >
              <ShoppingCart size={20} />
              {items?.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-orange-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
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
                  className="p-2 text-slate-400 hover:text-red-500 transition-all active:scale-90"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-lg shadow-slate-200"
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