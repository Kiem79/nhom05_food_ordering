"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  ShoppingBag, 
  Clock, 
  ChevronRight, 
  Package, 
  MapPin,
  Trash2,
  Store,
  Calendar,
  Sparkles,
  Zap,
  CreditCard,
  AlertTriangle,
  X,
  Plus
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useAuthStore from "@/store/authStore"; 

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
  restaurantName?: string;
  items: OrderItem[];
  total: number;
  status: string;
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { user } = useAuthStore(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
      const savedOrders = localStorage.getItem("foodie_orders");
      if (savedOrders) {
        try {
          const parsedOrders: Order[] = JSON.parse(savedOrders);
          const uniqueOrders = Array.from(
            new Map(parsedOrders.map((order) => [order.id, order])).values()
          );
          setOrders(uniqueOrders.reverse()); 
        } catch (e) {
          console.error("Lỗi dữ liệu đơn hàng");
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const totalSpending = useMemo(() => {
    return orders.reduce((acc, order) => acc + order.total, 0);
  }, [orders]);

  const handleClearHistory = () => {
    localStorage.removeItem("foodie_orders");
    setOrders([]);
    setShowConfirmDelete(false);
  };

  if (!isClient) return <div className="min-h-screen bg-slate-50/30" />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans bg-slate-50/30 min-h-screen relative">
      
      {/* CUSTOM DELETE MODAL */}
      <AnimatePresence>
        {showConfirmDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmDelete(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20, rotate: 1 }}
              className="relative w-full max-w-md bg-white rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-100 p-10 text-center"
            >
              <div className="w-24 h-24 bg-red-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-red-500">
                <AlertTriangle size={48} strokeWidth={2.5} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-4 leading-none">
                Xóa sạch <span className="text-red-500">nhật ký?</span>
              </h3>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wide leading-relaxed px-4">
                Mọi kỷ niệm ăn uống của bạn sẽ biến mất vĩnh viễn khỏi trình duyệt này.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-10">
                <button 
                  onClick={() => setShowConfirmDelete(false)}
                  className="py-5 bg-slate-100 text-slate-500 rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
                >
                  Giữ lại
                </button>
                <button 
                  onClick={handleClearHistory}
                  className="py-5 bg-red-500 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-red-600 shadow-xl shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Xác nhận xóa <Trash2 size={14} />
                </button>
              </div>
              <button 
                onClick={() => setShowConfirmDelete(false)}
                className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HEADER SECTION */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter"
          >
            My <span className="text-orange-500">History.</span>
          </motion.h1>
          <div className="flex items-center gap-3">
            <span className="h-1 w-12 bg-orange-500 rounded-full" />
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
               {orders.length} ĐIỂM ĐẾN ẨM THỰC CỦA {user?.name || "BẠN"}
            </p>
          </div>
        </div>

        {orders.length > 0 && (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowConfirmDelete(true)}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-red-500 transition-all bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100"
          >
            Làm sạch nhật ký <Trash2 size={16} className="group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: USER PROFILE */}
        <div className="lg:col-span-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-28 bg-slate-900 rounded-[3.5rem] p-1 shadow-2xl overflow-hidden"
          >
            <div className="bg-white rounded-[3.3rem] p-10 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
              <div className="relative text-center">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-32 h-32 bg-slate-900 rounded-[2.8rem] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl relative"
                >
                   <User size={56} strokeWidth={1.5} />
                   <div className="absolute -inset-2 border-2 border-dashed border-orange-500/30 rounded-[3rem] animate-[spin_10s_linear_infinite]" />
                </motion.div>
                <h2 className="text-4xl font-black uppercase italic text-slate-900 leading-none tracking-tighter">
                    {user?.name || "Khách Hàng"}
                </h2>
                <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-1.5 rounded-full mt-4 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-200">
                  <Sparkles size={12} fill="currentColor" />
                  {orders.length > 10 ? "Premium Member" : "Foodie Member"}
                </div>
                <div className="grid grid-cols-1 gap-3 mt-10">
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 transition-colors hover:bg-orange-50 flex items-center justify-between px-8">
                    <div className="text-left">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Số đơn hàng</p>
                        <p className="text-3xl font-black text-slate-900 italic">{orders.length}</p>
                    </div>
                    <ShoppingBag size={24} className="text-slate-300" />
                  </div>
                  <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 transition-all hover:bg-orange-500 group flex items-center justify-between px-8">
                    <div className="text-left">
                        <p className="text-[9px] font-black text-slate-400 group-hover:text-orange-100 uppercase tracking-widest mb-1">Tổng chi tiêu</p>
                        <p className="text-2xl font-black text-white italic tracking-tight">
                            {totalSpending.toLocaleString()}đ
                        </p>
                    </div>
                    <CreditCard size={24} className="text-slate-500 group-hover:text-white" />
                  </div>
                </div>
                <div className="h-px bg-slate-100 my-8" />
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">Khu vực</p>
                      <p className="text-xs font-bold text-slate-700">TP. Hồ Chí Minh</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                      <Zap size={18} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">Trạng thái</p>
                      <p className="text-xs font-bold text-slate-700">Đang hoạt động</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: ORDERS LIST */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-black uppercase italic flex items-center gap-3 text-slate-900 tracking-tighter">
              <Clock className="text-orange-500" /> Đơn hàng gần đây
            </h3>
          </div>

          <AnimatePresence mode="popLayout">
            {orders.length > 0 ? (
              orders.map((order, idx) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/40 hover:shadow-orange-200/40 transition-all duration-500 group mb-10"
                >
                  {/* ORDER HEADER */}
                  <div className="bg-slate-50/80 px-8 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 group-hover:bg-orange-50/30 transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="bg-slate-900 text-white px-5 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase italic shadow-lg shadow-slate-200">
                        #{order.id}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{order.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* ORDER BODY */}
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-10 bg-orange-500 text-white w-fit px-6 py-2.5 rounded-[1.2rem] shadow-lg shadow-orange-100 transform -rotate-1 group-hover:rotate-0 transition-transform">
                      <Store size={18} />
                      <span className="text-sm font-black uppercase tracking-tight italic">
                        {order.restaurantName || order.items[0]?.restaurantName || "Foodie Partner"}
                      </span>
                    </div>

                    <div className="space-y-8">
                      {order.items.map((item, itemIdx) => (
                        <div key={`${order.id}-${item.id}-${itemIdx}`} className="flex items-center justify-between group/item p-2 rounded-3xl hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-6">
                            {/* Tối ưu phần hiển thị Số lượng (Quantity Badge) */}
                            <div className="relative shrink-0">
                              <div className="relative w-20 h-20 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white group-hover/item:scale-105 transition-transform duration-500">
                                <Image 
                                  src={item.displayImage || "/placeholder-food.png"} 
                                  alt={item.name}
                                  fill
                                  sizes="80px"
                                  className="object-cover"
                                />
                              </div>
                              {/* New Quantity Badge: Nổi bật hơn, nằm đè lên ảnh */}
                              <div className="absolute -bottom-1 -right-1 bg-slate-900 text-white flex items-center justify-center px-3 py-1 rounded-xl shadow-lg border-2 border-white z-10 transform group-hover/item:scale-110 transition-all">
                                <span className="text-[8px] font-black uppercase mr-1 opacity-60">x</span>
                                <span className="text-xs font-black italic">{item.quantity}</span>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-lg font-black text-slate-900 uppercase tracking-tight group-hover/item:text-orange-500 transition-colors leading-tight italic">{item.name}</p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                  {item.price.toLocaleString()}đ
                                </p>
                                {item.quantity > 1 && (
                                  <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                )}
                                {item.quantity > 1 && (
                                  <p className="text-[10px] text-orange-400 font-black italic uppercase">
                                    Combo x{item.quantity}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                             <span className="text-xl font-black text-slate-900 tabular-nums italic tracking-tighter">
                               {(item.price * item.quantity).toLocaleString()}đ
                             </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 pt-10 border-t-2 border-dashed border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-8">
                      <div className="text-center sm:text-left">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-2">Thanh toán cuối cùng</p>
                        <p className="text-5xl font-black text-slate-900 tracking-tighter italic leading-none">
                          {order.total.toLocaleString()}<span className="text-orange-500 not-italic text-2xl ml-1">đ</span>
                        </p>
                      </div>
                      
                      <div className="flex gap-4 w-full sm:w-auto">
                        <Link 
                            href="/restaurants" 
                            className="flex-1 sm:flex-none px-10 py-5 bg-slate-900 text-white rounded-[1.8rem] text-[11px] font-black uppercase tracking-widest hover:bg-orange-500 hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95 group/btn"
                        >
                            Mua lại <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-slate-100 shadow-inner"
              >
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                  <Package size={48} />
                </div>
                <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Bạn chưa có đơn hàng nào</h4>
                <p className="text-slate-400 font-medium mt-2 max-w-xs mx-auto text-sm">Hãy khám phá menu hấp dẫn và lấp đầy lịch sử của bạn nhé!</p>
                <Link 
                  href="/restaurants" 
                  className="inline-block mt-8 bg-orange-500 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl shadow-orange-100"
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