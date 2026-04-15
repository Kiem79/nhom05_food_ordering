"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, LogOut } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

// IMPORT SEARCHBAR VỪA SỬA
import SearchBar from "@/components/search/SearchBar";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { items, clearCart } = useCartStore();

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Thực đơn", href: "/restaurants" }, // Cập nhật href theo code mới của Nhi
    { name: "Đặt nhóm", href: "/group-order" },
    { name: "Lịch sử", href: "/dashboard" },
    { name: "Thành viên", href: "/about" },
  ];

  const handleLogout = () => {
    if(confirm("Bạn muốn đăng xuất thật à?")) {
      logout();
      clearCart?.();
      router.push("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* LOGO [cite: 234] */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center font-bold shadow-lg shadow-orange-200">
            F
          </div>
          <span className="text-lg font-bold text-orange-500 uppercase italic">
            Foodie
          </span>
        </Link>

        {/* SMART SEARCH CHÈN VÀO GIỮA [cite: 155, 156] */}
        <div className="flex-1 flex justify-center max-w-md">
          <SearchBar />
        </div>

        {/* NAV & ACTIONS [cite: 243, 259] */}
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[10px] font-black uppercase tracking-widest transition ${
                  pathname === link.href ? "text-orange-500" : "text-slate-400 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 border-l pl-4 border-slate-100">
            {/* CART [cite: 261] */}
            <Link href="/group-order" className="relative p-2 text-slate-400 hover:text-orange-500 transition-colors">
              <ShoppingCart size={20} />
              {items?.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-orange-600 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-bounce">
                  {items.length}
                </span>
              )}
            </Link>

            {/* USER [cite: 182, 186] */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Leader</p>
                  <p className="text-xs font-black text-slate-900 leading-none">{user.name}</p>
                </div>
                <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-all">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}