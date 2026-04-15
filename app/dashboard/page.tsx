"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, ShoppingBag, Clock, ChevronRight, Package, MapPin,
  Trash2, Store, Calendar, Sparkles, Zap, CreditCard,
  AlertTriangle, X, LogIn
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useAuthStore from "@/store/authStore"; 
import Breadcrumbs from "@/components/ui/Breadcrumbs";

// --- 1. ĐỊNH NGHĨA INTERFACES (TypeScript) ---
interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  displayImage: string;
  restaurantName?: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { user } = useAuthStore(); 

  // --- 2. LOGIC LẤY DỮ LIỆU (Persistence) ---
  useEffect(() => {
    setIsClient(true);
    const savedOrders = localStorage.getItem("foodie_orders");
    if (savedOrders) {
      try {
        const parsedOrders: Order[] = JSON.parse(savedOrders);
        // Loại bỏ trùng lặp ID và ưu tiên đơn hàng mới nhất lên đầu
        const uniqueOrders = Array.from(
          new Map(parsedOrders.map((order) => [order.id, order])).values()
        );
        setOrders(uniqueOrders.reverse()); 
      } catch (e) {
        console.error("Lỗi khi đọc dữ liệu đơn hàng từ LocalStorage", e);
      }
    }
  }, []);

  // Tính tổng chi tiêu bằng useMemo để tối ưu hiệu năng
  const totalSpending = useMemo(() => {
    return orders.reduce((acc, order) => acc + order.total, 0);
  }, [orders]);

  const handleClearHistory = () => {
    localStorage.removeItem("foodie_orders");
    setOrders([]);
    setShowConfirmDelete(false);
  };

  // Tránh lỗi Hydration Mismatch đặc trưng của Next.js
  if (!isClient) return <div className="min-h-screen bg-slate-50/30" />;

  // --- 3. LỚP BẢO MẬT (Security Filter: Dừng khoảng 2s) ---
  if (!user) {
      return (
        <div className="min-h-[85vh] flex items-center justify-center px-6 bg-slate-50/30 dark:bg-slate-950 transition-colors duration-500">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 text-center shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 space-y-8"
          >
            <div className="w-24 h-24 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center mx-auto relative">
              <User size={40} className="text-orange-500" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full border-4 border-white dark:border-slate-900" />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                Dừng Khoảng <span className="text-orange-500">2s!</span>
              </h2>
              <p className="text-slate-400 dark:text-slate-500 font-medium text-sm leading-relaxed px-4">
                Vui lòng đăng nhập để xem thông tin cá nhân và lịch sử đặt món của bạn nhé!
              </p>
            </div>

            <div className="pt-4 space-y-6">
              <Link 
                href="/auth/login" 
                className="w-full h-18 bg-slate-900 dark:bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-500 dark:hover:bg-white dark:hover:text-slate-900 transition-all shadow-xl shadow-slate-200 dark:shadow-orange-500/20 active:scale-95"
              >
                ĐĂNG NHẬP NGAY <LogIn size={20} />
              </Link>
              <Link href="/products" className="block text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em] hover:text-slate-900 dark:hover:text-slate-400 transition-colors">
                Quay lại thực đơn
              </Link>
            </div>
          </motion.div>
        </div>
      );
    }

  // --- 4. GIAO DIỆN CHÍNH (Dashboard Layout) ---
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans bg-slate-50/30 dark:bg-slate-950 transition-colors duration-500 min-h-screen relative">
      <Breadcrumbs />
      {/* MODAL XÁC NHẬN XÓA (Custom UI của Nhi) */}
      <AnimatePresence>
        {showConfirmDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowConfirmDelete(false)}
              className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-10 text-center"
            >
              <div className="w-24 h-24 bg-red-50 dark:bg-red-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-red-500">
                <AlertTriangle size={48} strokeWidth={2.5} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-4 leading-none">
                Xóa sạch <span className="text-red-500">nhật ký?</span>
              </h3>
              <p className="text-slate-400 dark:text-slate-500 text-sm font-bold uppercase tracking-wide px-4">
                Mọi kỷ niệm ăn uống của bạn sẽ biến mất vĩnh viễn khỏi trình duyệt này.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-10">
                <button 
                  onClick={() => setShowConfirmDelete(false)} 
                  className="py-5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  Giữ lại
                </button>
                <button 
                  onClick={handleClearHistory} 
                  className="py-5 bg-red-500 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-red-600 shadow-xl shadow-red-200 dark:shadow-none transition-all"
                >
                  Xóa sạch
                </button>
              </div>
              <button onClick={() => setShowConfirmDelete(false)} className="absolute top-8 right-8 text-slate-300 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white transition-colors"><X size={24} /></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TIÊU ĐỀ TRANG */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter"
          >
            My <span className="text-orange-500">History.</span>
          </motion.h1>
          <div className="flex items-center gap-3">
            <span className="h-1 w-12 bg-orange-500 rounded-full" />
            <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">
              {orders.length} ĐƠN HÀNG CỦA {user?.name?.toUpperCase()|| "Guest"}
            </p>
          </div>
        </div>

        {orders.length > 0 && (
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowConfirmDelete(true)}
            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-all bg-white dark:bg-slate-900 px-8 py-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
          >
            Làm sạch nhật ký <Trash2 size={16} />
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* CỘT TRÁI: THÔNG TIN USER (STATS) */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-slate-900 dark:bg-slate-800 rounded-[3.5rem] p-1 shadow-2xl">
            <div className="bg-white dark:bg-slate-900 rounded-[3.3rem] p-10 text-center relative overflow-hidden transition-colors">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
              
              <motion.div whileHover={{ rotate: 10 }} className="w-32 h-32 bg-slate-900 dark:bg-slate-950 rounded-[2.8rem] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl relative">
                <User size={56} strokeWidth={1.5} />
              </motion.div>

              <h2 className="text-4xl font-black uppercase italic text-slate-900 dark:text-white leading-none tracking-tighter">
                {user?.name || "Foodie Member"}
              </h2>
              
              <div className="grid grid-cols-1 gap-3 mt-10">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 flex items-center justify-between px-8 transition-colors hover:bg-orange-50 dark:hover:bg-orange-500/10">
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Số đơn hàng</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white italic">{orders.length}</p>
                  </div>
                  <ShoppingBag size={24} className="text-slate-300 dark:text-slate-600" />
                </div>

                <div className="bg-slate-900 dark:bg-orange-500 p-6 rounded-[2rem] flex items-center justify-between px-8 text-white transition-all hover:bg-orange-500 dark:hover:bg-white dark:hover:text-orange-500 group">
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-400 dark:text-slate-200 group-hover:text-orange-100 dark:group-hover:text-orange-500 uppercase tracking-widest mb-1">Tổng chi tiêu</p>
                    <p className="text-2xl font-black italic">{totalSpending.toLocaleString()}đ</p>
                  </div>
                  <CreditCard size={24} className="text-slate-500 dark:text-white/60 group-hover:text-white dark:group-hover:text-orange-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: DANH SÁCH ĐƠN HÀNG */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {orders.length > 0 ? (
              orders.map((order, idx) => (
                <motion.div 
                  key={order.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-none hover:shadow-orange-200/40 dark:hover:border-orange-500/30 transition-all duration-500 group mb-10"
                >
                  {/* ORDER HEADER */}
                  <div className="bg-slate-50/80 dark:bg-slate-800/50 px-8 py-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 group-hover:bg-orange-50/30 dark:group-hover:bg-orange-500/5 transition-colors">
                    <div className="flex items-center gap-6">
                      <span className="bg-slate-900 dark:bg-slate-950 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase italic shadow-lg">
                        #{order.id}
                      </span>
                      <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                        <Calendar size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{order.date}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> {order.status}
                    </span>
                  </div>

                  {/* ORDER CONTENT */}
                  <div className="p-8 md:p-10 space-y-8">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between group/item p-2 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <div className="flex items-center gap-6">
                          <div className="relative w-20 h-20 rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl group-hover/item:scale-105 transition-transform duration-500">
                            <Image 
                              src={item.displayImage || "/images/placeholder-food.png"} 
                              alt={item.name} 
                              fill 
                              className="object-cover" 
                            />
                          </div>
                          <div>
                            <p className="text-lg font-black text-slate-900 dark:text-white uppercase italic leading-tight group-hover/item:text-orange-500 transition-colors tracking-tight">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] mt-1.5">
                              x{item.quantity} • {item.price.toLocaleString()}đ
                            </p>
                          </div>
                        </div>
                        <span className="text-xl font-black text-slate-900 dark:text-white italic tracking-tighter">
                          {(item.price * item.quantity).toLocaleString()}đ
                        </span>
                      </div>
                    ))}

                    {/* TỔNG TIỀN & NÚT MUA LẠI */}
                    <div className="pt-8 border-t-2 border-dashed border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-8">
                      <div className="text-center sm:text-left">
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.3em] mb-2">Thanh toán cuối cùng</p>
                        <p className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">
                          {order.total.toLocaleString()}<span className="text-orange-500 not-italic text-2xl ml-1">đ</span>
                        </p>
                      </div>
                      <Link 
                        href="/products" 
                        className="w-full sm:w-auto px-10 py-5 bg-slate-900 dark:bg-orange-500 text-white rounded-[1.8rem] text-[11px] font-black uppercase tracking-widest hover:bg-orange-500 dark:hover:bg-white dark:hover:text-slate-900 hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95 group/btn"
                      >
                        Mua lại đơn này <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-32 bg-white dark:bg-slate-900 rounded-[4rem] border-2 border-dashed border-slate-100 dark:border-slate-800 shadow-inner"
              >
                <Package size={64} className="mx-auto text-slate-200 dark:text-slate-700 mb-6" />
                <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Bạn chưa có kỷ niệm ăn uống nào</h4>
                <p className="text-slate-400 dark:text-slate-500 font-medium mt-2 max-w-xs mx-auto text-sm">Hãy bắt đầu đặt món và lấp đầy lịch sử của mình nhé!</p>
                <Link 
                  href="/products" 
                  className="inline-block mt-8 bg-orange-500 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-orange-100 dark:shadow-none"
                >
                  Bắt đầu đặt món
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}