"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import useAuthStore from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { ThemeToggle } from "@/components/ThemeToggle"; 
import SearchBar from "@/components/search/SearchBar";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const offset = direction === "left" ? -150 : 150; 
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Thực đơn", href: "/restaurants" },
    { name: "Đặt nhóm", href: "/group-order" },
    { name: "Lịch sử", href: "/dashboard" },
    { name: "Thành viên", href: "/about" },
    { name: "Liên hệ", href: "/contact" }, 
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
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-100 dark:border-slate-800 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">

        {/* --- 1. LOGO --- */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-orange-200 dark:shadow-orange-900/20 group-hover:bg-slate-900 dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-all duration-500">
            F.
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic hidden lg:block">
            Foodie.
          </span>
        </Link>

        {/* --- 2. NAVIGATION (Menu giữa) --- */}
        <div className="flex-1 flex items-center justify-center min-w-0">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
            <button onClick={() => scroll("left")} className="p-1 text-slate-400 hover:text-orange-500 transition-colors">
              <ChevronLeft size={16} />
            </button>
            
            <div className="max-w-37.5 md:max-w-75 overflow-hidden"> 
              <nav 
                ref={scrollRef} 
                className="flex items-center gap-6 overflow-x-auto scrollbar-hide scroll-smooth whitespace-nowrap px-2"
              >
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={`shrink-0 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                      pathname === link.href ? "text-orange-500" : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <button onClick={() => scroll("right")} className="p-1 text-slate-400 hover:text-orange-500 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* --- 3. ACTIONS (Cụm bên phải) --- */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          
          {/* TÌM KIẾM */}
          <div className="mr-1">
            <SearchBar />
          </div>

          {/* GIỎ HÀNG */}
          <Link 
            href="/group-order" 
            className={`relative p-2.5 transition-all duration-300 rounded-2xl ${
                pathname === '/group-order' 
                ? "text-orange-500 bg-orange-50 dark:bg-orange-500/10" 
                : "text-slate-400 hover:text-orange-500 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <ShoppingCart size={22} />
            {items?.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm">
                {items.length}
              </span>
            )}
          </Link>

          {/* DARK MODE */}
          <ThemeToggle />

          {/* USER / LOGOUT */}
          <div className="flex items-center gap-2 border-l pl-3 border-slate-100 dark:border-slate-800 ml-1">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden xl:block">
                  <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase leading-none mb-1 tracking-tighter">Leader</p>
                  <p className="text-xs font-black text-slate-900 dark:text-white leading-none">{user.name}</p>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="p-2 text-slate-400 hover:text-red-500 transition-all hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="bg-slate-900 dark:bg-orange-500 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 dark:hover:bg-orange-400 transition-all active:scale-95"
              >
                Login
              </Link>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}