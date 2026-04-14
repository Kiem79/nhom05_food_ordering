"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import { 
  Trash2, Users, Receipt, Wallet, 
  ArrowRight, ShoppingBag, UserPlus, 
  Lock, LogIn, AlertCircle, Store 
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// --- 1. ĐỊNH NGHĨA INTERFACES ---
interface GroupMember {
  id: string;
  name: string;
  avatar: string;
}

export default function GroupOrderPage() {
  const { items, removeItem, clearCart, totalPrice } = useCartStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Tránh lỗi Hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // --- 2. LOGIC TÍNH TOÁN (Tối ưu với useMemo) ---
  const mockMembers: GroupMember[] = useMemo(() => [
    { id: "m1", name: "Thảo Nguyên", avatar: "https://i.pravatar.cc/150?u=thao" },
    { id: "m2", name: "Anh Tuấn", avatar: "https://i.pravatar.cc/150?u=tuan" },
    { id: "m3", name: "Bảo Ngọc", avatar: "https://i.pravatar.cc/150?u=ngoc" },
    { id: "m4", name: "Hoàng Huy", avatar: "https://i.pravatar.cc/150?u=huy" },
    { id: "m5", name: "Minh Thư", avatar: "https://i.pravatar.cc/150?u=thu" },
  ], []);

  const billing = useMemo(() => {
    const subtotal = totalPrice();
    const shippingFee = items.length > 0 ? 15000 : 0;
    const discount = subtotal > 100000 ? 25000 : 0;
    const finalTotal = Math.max(0, subtotal + shippingFee - discount);
    const totalPeople = mockMembers.length + 1; // Team + Current User
    return {
      subtotal,
      shippingFee,
      discount,
      finalTotal,
      totalPeople,
      splitAmount: finalTotal / totalPeople
    };
  }, [items, totalPrice, mockMembers]);

  // --- 3. XỬ LÝ CHỐT ĐƠN (Lưu vào History) ---
  const handleCheckout = () => {
    if (items.length === 0) return;

    const newOrder = {
      id: `SOM-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("vi-VN"),
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        displayImage: item.images?.[0] || "/placeholder-food.png"
      })),
      total: billing.finalTotal,
      status: "Hoàn thành"
    };

    // Lưu vào LocalStorage để Bích Nhi lấy dữ liệu
    const existingOrders = JSON.parse(localStorage.getItem("foodie_orders") || "[]");
    localStorage.setItem("foodie_orders", JSON.stringify([...existingOrders, newOrder]));

    toast.success("Đặt đơn nhóm thành công!");
    
    setTimeout(() => {
      clearCart();
      router.push("/order-success");
    }, 1000);
  };

  if (!mounted) return null;

  // --- CASE 1: BẢO VỆ TRANG (Dừng khoảng 2s) ---
  if (!user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-6 bg-slate-50/30">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[3.5rem] p-12 text-center shadow-2xl border border-slate-100 space-y-8"
        >
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto relative">
            <Lock size={40} className="text-orange-500" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full border-4 border-white" />
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
              Dừng Khoảng <span className="text-orange-500">2s!</span>
            </h2>
            <p className="text-slate-400 font-medium text-sm px-4">Tính năng Đặt Nhóm chỉ dành riêng cho thành viên Foodie.</p>
          </div>
          <Link href="/auth/login" className="w-full h-18 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-500 transition-all shadow-xl">
            ĐĂNG NHẬP NGAY <LogIn size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  // --- CASE 2: GIỎ HÀNG TRỐNG ---
  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6 px-6">
        <div className="w-40 h-40 bg-orange-50 rounded-full flex items-center justify-center relative">
          <ShoppingBag size={80} className="text-orange-200" />
          <AlertCircle className="absolute top-8 right-8 text-orange-500 animate-pulse" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter text-center">
          Giỏ hàng nhóm <br/> <span className="text-orange-500">đang trống!</span>
        </h2>
        <Link href="/products" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-xl">
          QUAY LẠI ĐẶT MÓN
        </Link>
      </div>
    );
  }

  // --- CASE 3: GIAO DIỆN CHÍNH ---
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans bg-slate-50/10 min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
            <h1 className="text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
              Order <span className="text-orange-500">Group</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] pt-2">
               CHÀO MỪNG TRỞ LẠI, {user.name.toUpperCase()}! 👋
            </p>
        </div>
        <div className="flex -space-x-3">
            {mockMembers.slice(0, 4).map((m) => (
                <div key={m.id} className="relative w-12 h-12 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100">
                   <Image src={m.avatar} alt={m.name} fill sizes="48px" className="object-cover" />
                </div>
            ))}
            <div className="w-12 h-12 rounded-full bg-slate-900 border-4 border-white flex items-center justify-center text-[10px] font-black text-white shadow-md relative z-10">
                +{mockMembers.length - 4}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          
          {/* BILL DETAILS */}
          <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-50">
            <h3 className="text-xl font-black text-slate-900 uppercase italic mb-10 flex items-center gap-3 border-b border-slate-50 pb-6">
              <Receipt className="text-orange-500" /> Bill Chi Tiết
            </h3>
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    key={item.id} className="flex items-center gap-8 group"
                  >
                    <div className="relative w-24 h-24 rounded-3xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform shrink-0 border-2 border-slate-50">
                        <Image 
                            src={item.images?.[0] || "/placeholder-food.png"} 
                            alt={item.name} fill sizes="96px" className="object-cover"
                        />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 text-orange-500 mb-1">
                        <Store size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.restaurantName || "Foodie Partner"}</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-xl tracking-tight uppercase leading-none italic">{item.name}</h4>
                      <p className="text-orange-500 font-black italic text-lg mt-1">
                        {item.price.toLocaleString()}đ <span className="text-slate-300 text-sm not-italic ml-2 tracking-widest">x{item.quantity}</span>
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

          {/* TEAM MEMBERS SECTION */}
          <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-50">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-slate-900 uppercase italic flex items-center gap-3">
                <Users className="text-orange-500" /> Đội hình đặt cơm ({billing.totalPeople})
              </h3>
              <button className="text-[10px] font-black text-orange-500 bg-orange-50 px-6 py-3 rounded-full uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all">
                + Mời Team
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6">
              {/* Host Avatar */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative p-1 border-2 border-orange-500 rounded-full">
                  <div className="w-14 h-14 rounded-full relative overflow-hidden shadow-lg">
                    <Image src={user.avatar || "/images/avatar.png"} alt="Host" fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-orange-500 text-[6px] text-white px-2 py-0.5 rounded-full font-black uppercase">Host</div>
                </div>
                <p className="text-[8px] font-black text-slate-900 uppercase truncate w-14 text-center">Me</p>
              </div>
              {/* Member Avatars */}
              {mockMembers.map((m) => (
                <div key={m.id} className="flex flex-col items-center gap-3 group">
                  <div className="w-14 h-14 rounded-full relative overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-slate-100">
                    <Image src={m.avatar} alt={m.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <p className="text-[8px] font-bold text-slate-400 uppercase truncate w-14 text-center">{m.name}</p>
                </div>
              ))}
              <button className="flex flex-col items-center gap-3 group">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-50 transition-all">
                    <UserPlus size={18} className="text-slate-300 group-hover:text-orange-500" />
                </div>
                <p className="text-[8px] font-black text-slate-200 uppercase text-center">Mời</p>
              </button>
            </div>
          </div>
        </div>

        {/* --- CHECKOUT SIDEBAR --- */}
        <div className="relative">
          <div className="bg-slate-900 text-white rounded-[4rem] p-12 shadow-2xl sticky top-28 overflow-hidden border border-white/5">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
            
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-10 text-orange-500">Checkout</h3>
            
            <div className="space-y-5 border-b border-white/10 pb-8 mb-8">
              <div className="flex justify-between text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                <span>Tạm tính</span>
                <span className="text-white">{billing.subtotal.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                <span>Ship (Nhóm)</span>
                <span className="text-white">+{billing.shippingFee.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-green-400 font-bold uppercase text-[10px] tracking-widest">
                <span>Voucher Team</span>
                <span>-{billing.discount.toLocaleString()}đ</span>
              </div>
            </div>

            <div className="mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Tổng đơn nhóm</span>
              <div className="text-6xl font-black italic text-white mt-2 leading-none tracking-tighter">
                {billing.finalTotal.toLocaleString()}<span className="text-xl text-orange-500 ml-1">đ</span>
              </div>
            </div>

            {/* AUTO SPLIT LOGIC */}
            <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 mb-10 border border-white/10 group hover:bg-white/10 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="text-orange-500" size={20} />
                <span className="text-[11px] font-black uppercase tracking-widest text-orange-500">Auto Split ({billing.totalPeople} người)</span>
              </div>
              <p className="text-3xl font-black italic text-white">
                {Math.round(billing.splitAmount).toLocaleString()}đ
              </p>
              <p className="text-[8px] font-medium text-slate-500 mt-4 leading-relaxed italic opacity-60">
                *Hệ thống tự động chia đều dựa trên số lượng thành viên thực tế.
              </p>
            </div>

            <button onClick={handleCheckout}
              className="w-full h-20 bg-orange-500 hover:bg-white hover:text-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95 group"
            >
              CHỐT ĐƠN NGAY <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}