"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, LogOut, ChevronDown, Menu, X } from "lucide-react"; 
import useAuthStore from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { ThemeToggle } from "@/components/ThemeToggle"; 
import SearchBar from "@/components/search/SearchBar";
import { toast } from "sonner";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(timer);
    };
  }, []);

  // 1. Các link hiển thị trực tiếp
  const visibleLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Quán ăn", href: "/restaurants" },
    { name: "Đặt nhóm", href: "/group-order" },
  ];

  // 2. Các link nằm trong mục "Khác"
  const otherLinks = [
    { name: "Lịch sử", href: "/dashboard" },
    { name: "Liên hệ", href: "/contact" }, 
    { name: "Trung tâm trợ giúp", href: "/help-center" }, 
    { name: "Chính sách bảo mật", href: "/privacy-policy" }, 
    { name: "Điều khoản dịch vụ", href: "/terms-of-service" },
    { name: "Về chúng tôi", href: "/about" }, 
  ];

  const handleLogout = () => {
    toast.error("XÁC NHẬN ĐĂNG XUẤT", {
      description: "Bạn có chắc muốn rời khỏi hội ăn ngon không?",
      duration: 5000,
      style: {
        borderRadius: '24px',
        padding: '20px',
        border: '2px solid #f97316',
        background: 'white',
      },
      className: "dark:bg-slate-900 dark:text-white",
      action: {
        label: "RỜI ĐI",
        onClick: () => {
          logout();
          clearCart?.();
          router.push("/");
          toast.success("Đã đăng xuất thành công");
        },
      },
      cancel: {
        label: "Ở LẠI",
        onClick: () => {},
      },
    });
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-100 dark:border-slate-800 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">

        {/* --- CỤM BÊN TRÁI: HAMBURGER + LOGO + MENU CHÍNH --- */}
        <div className="flex items-center gap-3 lg:gap-8">
          
          {/* NÚT HAMBURGER MOBILE */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg group-hover:bg-slate-900 dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-all duration-500">
              F.
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic hidden lg:block">
              Foodie.
            </span>
          </Link>

          {/* Navigation Links - Chỉ hiện trên desktop */}
          <nav className="hidden md:flex items-center gap-6 border-l border-slate-100 dark:border-slate-800 pl-6">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-black uppercase tracking-[0.12em] transition-all duration-300 ${
                  pathname === link.href ? "text-orange-500" : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dropdown "Khác" */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.12em] transition-all duration-300 outline-none ${
                  isDropdownOpen ? "text-orange-500" : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Khác
                <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-4 w-48 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-xl py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {otherLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      onClick={() => setIsDropdownOpen(false)}
                      className={`block px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${
                        pathname === link.href 
                        ? "text-orange-500 bg-orange-50 dark:bg-orange-500/10" 
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-orange-500"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* --- CỤM BÊN PHẢI: SEARCH + ACTIONS --- */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          
          <div className="hidden md:block">
            <SearchBar />
          </div>

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

          <ThemeToggle />

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

      {/* --- MENU MOBILE OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300 origin-top">
          <div className="px-6 py-8 space-y-6">
            <div className="pb-4 border-b border-slate-50 dark:border-slate-800">
               <SearchBar />
            </div>
            
            <div className="flex flex-col gap-5">
              {[...visibleLinks, ...otherLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[12px] font-black uppercase tracking-[0.2em] transition-all ${
                    pathname === link.href ? "text-orange-500" : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}