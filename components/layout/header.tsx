"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, UtensilsCrossed, Search, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth"; // Đảm bảo đường dẫn này đúng

const NAV_LINKS = [
  { name: "Trang chủ", href: "/" },
  { name: "Thực đơn", href: "/products" },
  { name: "Đặt nhóm", href: "/group-order" },
  { name: "Thành viên", href: "/about" },
] as const;

export default function Header() {
  const pathname = usePathname();
  
  // ✅ PHẢI GỌI HOOK Ở ĐÂY (Bên trong Component)
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full bg-[#F97316] shadow-lg shadow-orange-900/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* LOGO SECTION */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="rounded-xl bg-white p-2 shadow-sm transition-transform group-hover:scale-110">
            <UtensilsCrossed className="h-6 w-6 text-[#F97316]" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            Foodie<span className="text-white/60">.</span>
          </span>
        </Link>

        {/* NAVIGATION MENU */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-bold transition-all duration-300",
                  isActive 
                    ? "text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-white" 
                    : "text-white/80 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* ACTIONS SECTION */}
        <div className="flex items-center gap-3">
          {/* Nút Tìm kiếm */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
            <Search className="h-5 w-5" />
          </Button>

          {/* Giỏ hàng (Có badge số lượng) */}
          <Link href="/cart" className="group relative rounded-full p-2 transition-colors hover:bg-white/10">
            <ShoppingCart className="h-5 w-5 text-white" />
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#F97316] bg-white text-[10px] font-black text-[#F97316]">
              3
            </span>
          </Link>

          {/* LOGIC ĐĂNG NHẬP / THÔNG TIN USER */}
          <div className="ml-2 border-l border-white/20 pl-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-medium text-white/70 uppercase leading-none">Thành viên</span>
                  <span className="text-sm font-black text-white">{user?.name}</span>
                </div>
                <Button 
                  onClick={logout}
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
                  title="Đăng xuất"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button asChild className="rounded-full bg-white px-6 font-black text-[#F97316] hover:bg-orange-50 shadow-md transition-all active:scale-95">
                <Link href="/auth">
                  <User className="mr-2 h-4 w-4" /> Đăng nhập
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="text-white md:hidden ml-2">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}