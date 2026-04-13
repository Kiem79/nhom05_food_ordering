"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, LogOut } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, logout } = useAuthStore();
  const { items, clearCart } = useCartStore();

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Thực đơn", href: "/products" },
    { name: "Đặt nhóm", href: "/group-order" },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary text-white rounded-foodie flex items-center justify-center font-bold">
            F
          </div>
          <span className="text-lg font-bold text-primary">
            Foodie
          </span>
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition ${
                pathname === link.href
                  ? "text-primary"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">

          {/* CART */}
          <Link href="/cart" className="relative p-2">
            <ShoppingCart className="text-primary" size={20} />
            {items?.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          {/* USER */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-primary font-medium hidden sm:block">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="p-2 text-secondary hover:text-primary"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="bg-primary text-white px-4 py-2 rounded-foodie text-sm font-semibold hover:opacity-90"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}