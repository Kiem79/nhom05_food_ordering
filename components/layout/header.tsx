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
  const { items, clearCart } = useCartStore(); // Giả sử sếp đã có store này

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Thực đơn", href: "/restaurants" },
    { name: "Đặt nhóm", href: "/group-order" },
    { name: "Lịch sử", href: "/dashboard" },
    { name: "Thành viên", href: "/about" },
  ];

  const handleLogout = () => {
    if(confirm("Bạnmuốn đăng xuất thật à?")) {
      logout();
      if(clearCart) clearCart();
      router.push("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-black italic shadow-lg shadow-orange-200">F.</div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase italic">Foodie.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                pathname === link.href ? "text-orange-500" : "text-slate-400 hover:text-slate-900"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/group-order" className="relative p-2 text-slate-400 hover:text-orange-500 transition-colors">
            <ShoppingCart size={20} />
            {items?.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-orange-600 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-bounce">
                {items.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1 tracking-tighter">Leader</p>
                <p className="text-xs font-black text-slate-900 leading-none">{user.name}</p>
              </div>
              <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-all active:scale-90">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/auth/login" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-lg shadow-slate-200">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}