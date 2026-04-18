"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import { 
  Trash2, Users, Receipt, Wallet, 
  ArrowRight, ShoppingBag, UserPlus, 
  Lock, LogIn, AlertCircle 
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GroupOrderPage() {
  const { items, removeItem, clearCart, getTotalPrice } = useCartStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Đảm bảo dữ liệu Zustand đã được load xong trên Client
  useEffect(() => {
  const timer = setTimeout(() => {
    setMounted(true);
  }, 0);  

  return () => clearTimeout(timer);
}, []);

if (!mounted) return null;

  if (!mounted) return null;

  // --- LOGIC ĐIỀU HƯỚNG KHI CHỐT ĐƠN ---
  const handleCheckout = () => {
    toast.success("Hệ thống đang xử lý đơn hàng nhóm...");
    
    // Giả lập thời gian xử lý trước khi sang trang thành công
    setTimeout(() => {
      router.push("/order-success");
    }, 1500);
  };

  // --- CASE 1: CHƯA ĐĂNG NHẬP (Màn hình khóa bảo mật) ---
  if (!user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-6 bg-slate-50/30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[3.5rem] p-12 text-center shadow-2xl shadow-slate-200/50 border border-white space-y-8"
        >
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto relative">
            <Lock size={40} className="text-orange-500" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full border-4 border-white"
            />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
              Dừng Khoảng <span className="text-orange-500">2s!</span>
            </h2>
            <p className="text-slate-400 font-medium text-sm leading-relaxed px-4">
              Tính năng Đặt Nhóm & Chia Bill chỉ dành riêng cho thành viên Foodie. Đăng nhập ngay nhé bạn!
            </p>
          </div>

          <div className="pt-4 space-y-6">
            <Link 
              href="/auth/login" 
              className="w-full h-18 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-500 transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              ĐĂNG NHẬP NGAY <LogIn size={20} />
            </Link>
            <Link href="/products" className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors">
              Tiếp tục xem Menu
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- CASE 2: GIỎ HÀNG RỖNG ---
  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="min-h-[80vh] flex flex-col items-center justify-center space-y-6 px-6"
      >
        <div className="w-40 h-40 bg-orange-50 rounded-full flex items-center justify-center relative">
          <ShoppingBag size={80} className="text-orange-200" />
          <AlertCircle className="absolute top-8 right-8 text-orange-500 animate-pulse" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter text-center">
            Giỏ hàng đang trống <br/> <span className="text-orange-500">bạn ơi!</span>
        </h2>
        <Link href="/products" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-xl active:scale-95">
          QUAY LẠI ĐẶT MÓN
        </Link>
      </motion.div>
    );
  }

  // --- CASE 3: GIAO DIỆN CHÍNH (Đã đăng nhập & Có món) ---
  const mockMembers = [
    { id: "m1", name: "Thảo Nguyên", avatar: "https://i.pravatar.cc/150?u=thao" },
    { id: "m2", name: "Anh Tuấn", avatar: "https://i.pravatar.cc/150?u=tuan" },
    { id: "m3", name: "Bảo Ngọc", avatar: "https://i.pravatar.cc/150?u=ngoc" },
    { id: "m4", name: "Hoàng Huy", avatar: "https://i.pravatar.cc/150?u=huy" },
    { id: "m5", name: "Minh Thư", avatar: "https://i.pravatar.cc/150?u=thu" },
    { id: "m6", name: "Quốc Nam", avatar: "https://i.pravatar.cc/150?u=nam" },
    { id: "m7", name: "Thanh Trúc", avatar: "https://i.pravatar.cc/150?u=truc" },
    { id: "m8", name: "Văn Hùng", avatar: "https://i.pravatar.cc/150?u=hung" },
  ];

  const totalPeople = mockMembers.length + 1;
  const subtotal = getTotalPrice();
  const shippingFee = 15000;
  const discount = 25000;
  const finalTotal = subtotal + shippingFee - discount;
  const splitAmount = finalTotal / totalPeople;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans">
      {/* --- HEADER --- */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
            <h1 className="text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
            Order <span className="text-orange-500">Group</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] pt-2">
                Chào mừng trở lại, {user.name}! 👋
            </p>
        </div>
        <div className="flex -space-x-3">
            {mockMembers.slice(0, 4).map((m) => (
                <img key={m.id} src={m.avatar} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" alt="" />
            ))}
            <div className="w-10 h-10 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
                +{mockMembers.length - 4}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* --- CỘT TRÁI: DANH SÁCH MÓN & THÀNH VIÊN --- */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Bill Chi Tiết */}
          <div className="bg-white rounded-[3.5rem] p-10 border border-slate-50 shadow-2xl shadow-slate-100/50">
            <h3 className="text-xl font-black text-slate-900 uppercase italic mb-10 flex items-center gap-3 border-b border-slate-50 pb-6">
              <Receipt className="text-orange-500" /> Bill Chi Tiết
            </h3>
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div 
                    layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    key={item.id} className="flex items-center gap-8 group"
                  >
                    <img src={item.image} className="w-24 h-24 rounded-3xl object-cover shadow-lg" alt={item.name} />
                    <div className="flex-1">
                      <h4 className="font-black text-slate-900 text-xl tracking-tight uppercase leading-none">{item.name}</h4>
                      <p className="text-orange-500 font-black italic text-lg mt-1">
                        {item.price.toLocaleString()}đ <span className="text-slate-300 text-sm not-italic ml-2 tracking-widest uppercase">x {item.quantity}</span>
                      </p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="w-12 h-12 flex items-center justify-center text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                      <Trash2 size={22} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Thành viên Nhóm */}
          <div className="bg-white rounded-[3.5rem] p-10 border border-slate-50 shadow-2xl shadow-slate-100/50">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-slate-900 uppercase italic flex items-center gap-3">
                <Users className="text-orange-500" /> Đội hình đặt cơm ({totalPeople})
              </h3>
              <button className="text-[10px] font-black text-orange-500 bg-orange-50 px-5 py-2.5 rounded-full uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-sm">
                + Mời Team
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-9 gap-6">
              {/* Leader/User */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <img src="https://i.pravatar.cc/150?u=manh" className="w-14 h-14 rounded-full border-2 border-orange-500 p-1 shadow-lg shadow-orange-100" />
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-orange-500 text-[6px] text-white px-2 py-0.5 rounded-full font-black uppercase">Host</div>
                </div>
                <p className="text-[8px] font-black text-slate-900 uppercase truncate w-14 text-center">{user.name}</p>
              </div>
              {/* Members */}
              {mockMembers.map((m) => (
                <div key={m.id} className="flex flex-col items-center gap-3 group">
                  <img src={m.avatar} className="w-14 h-14 rounded-full border border-slate-100 grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300" />
                  <p className="text-[8px] font-bold text-slate-400 uppercase truncate w-14 text-center group-hover:text-slate-900">{m.name}</p>
                </div>
              ))}
              <button className="flex flex-col items-center gap-3 group">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-100 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-50 transition-all">
                    <UserPlus size={18} className="text-slate-200 group-hover:text-orange-500" />
                </div>
                <p className="text-[8px] font-black text-slate-200 uppercase group-hover:text-orange-500 text-center">Mời</p>
              </button>
            </div>
          </div>
        </div>

        {/* --- CỘT PHẢI: THANH TOÁN & CHIA BILL --- */}
        <div className="relative">
          <div className="bg-slate-900 text-white rounded-[4rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] sticky top-28 overflow-hidden border border-white/5">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
            
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-10 text-orange-500">Checkout</h3>
            
            <div className="space-y-6 border-b border-white/5 pb-8 mb-8">
              <div className="flex justify-between text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                <span>Tạm tính</span>
                <span className="text-white">{subtotal.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                <span>Giao hàng (Nhóm)</span>
                <span className="text-white">+{shippingFee.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-green-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                <span>Voucher Team</span>
                <span>-{discount.toLocaleString()}đ</span>
              </div>
            </div>

            <div className="mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Tổng cộng đơn</span>
              <div className="text-6xl font-black italic text-white mt-2 leading-none tracking-tighter">
                {finalTotal.toLocaleString()}<span className="text-xl text-orange-500 ml-1">đ</span>
              </div>
            </div>

            {/* Box Chia tiền */}
            <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 mb-10 border border-white/10 group hover:bg-white/10 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="text-orange-500" size={20} />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-500">Auto Split ({totalPeople} người)</span>
              </div>
              <p className="text-3xl font-black italic text-white group-hover:scale-105 transition-transform origin-left">
                {splitAmount.toLocaleString()}đ
              </p>
              <p className="text-[8px] font-medium text-slate-500 mt-4 leading-relaxed italic opacity-70">
                *Hệ thống đã tự động chia đều hóa đơn dựa trên số lượng thành viên thực tế.
              </p>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full h-20 bg-orange-500 hover:bg-white hover:text-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-orange-500/40 active:scale-95 group"
            >
              CHỐT ĐƠN NGAY <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}