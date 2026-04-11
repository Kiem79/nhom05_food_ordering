"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, UtensilsCrossed, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Trang chủ", href: "/" },
  { name: "Thực đơn", href: "/products" },
  { name: "Đặt nhóm", href: "/group-order" },
  { name: "Thành viên", href: "/about" },
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full bg-[#F97316] shadow-lg shadow-orange-900/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2" aria-label="Trang chủ">
          <div className="rounded-xl bg-white p-2 shadow-sm transition-transform group-hover:scale-110">
            <UtensilsCrossed className="h-6 w-6 text-[#F97316]" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            Foodie<span className="text-white/60">.</span>
          </span>
        </Link>

        {/* MENU */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.name}
                className={cn(
                  "relative text-sm font-bold px-3 py-2 transition-all duration-300",
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

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          
          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Tìm kiếm"
            className="text-white hover:bg-white/10 rounded-full min-h-\[40px\] {
    min-height: 40px;
} min-h-\[40px\] {
    min-height: 40px;
}"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Giỏ hàng"
            className="group relative rounded-full p-2 min-w-\[40px\] {
    min-width: 40px;
} min-h-\[40px\] {
    min-height: 40px;
} flex items-center justify-center transition-colors hover:bg-white/10"
          >
            <ShoppingCart className="h-5 w-5 text-white" />
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#F97316] bg-white text-[10px] font-black text-[#F97316]">
              3
            </span>
          </Link>

          {/* Login */}
          <Button
            asChild
            className="hidden rounded-full bg-white px-6 font-black text-[#F97316] hover:bg-orange-50 sm:flex shadow-md min-h-\[40px\] {
    min-height: 40px;
}"
          >
            <Link href="/auth" aria-label="Đăng nhập">
              <User className="mr-2 h-4 w-4" /> Đăng nhập
            </Link>
          </Button>

          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Mở menu"
            className="text-white md:hidden min-w-\[40px\] {
    min-width: 40px;
}"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}