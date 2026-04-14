"use client";


import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  Trash2, Users, Receipt, Wallet, 
  ArrowRight, ShoppingBag, UserPlus, 
  Lock, LogIn, AlertCircle, Store 
} from "lucide-react";

// Stores & Config
import { useCartStore } from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

// Cấu hình đường dẫn cho Static Export
const basePath = "/nhom05_food_ordering";

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

  useEffect(() => {
    setMounted(true);
  }, []);

  const mockMembers: GroupMember[] = useMemo(() => [
    { id: "m1", name: "Thảo Nguyên", avatar: "https://i.pravatar.cc/150?u=thao" },
    { id: "m2", name: "Anh Tuấn", avatar: "https://i.pravatar.cc/150?u=tuan" },
    { id: "m3", name: "Bảo Ngọc", avatar: "https://i.pravatar.cc/150?u=ngoc" },
    { id: "m4", name: "Hoàng Huy", avatar: "https://i.pravatar.cc/150?u=huy" },
  ], []);

  const billing = useMemo(() => {
    const subtotal = totalPrice();
    const shippingFee = items.length > 0 ? 15000 : 0;
    const discount = subtotal > 100000 ? 25000 : 0;
    const finalTotal = Math.max(0, subtotal + shippingFee - discount);
    const totalPeople = mockMembers.length + 1; 
    
    return {
      subtotal,
      shippingFee,
      discount,
      finalTotal,
      totalPeople,
      splitAmount: finalTotal / totalPeople
    };
  }, [items, totalPrice, mockMembers]);

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
        // FIX: Đảm bảo ảnh lưu vào History luôn có basePath kể cả khi dùng placeholder
        displayImage: item.images?.[0] 
          ? `${basePath}${item.images[0]}` 
          : `${basePath}/placeholder-food.png` 
      })),
      total: billing.finalTotal,
      status: "Hoàn thành"
    };

    const existingOrders = JSON.parse(localStorage.getItem("foodie_orders") || "[]");
    localStorage.setItem("foodie_orders", JSON.stringify([...existingOrders, newOrder]));

    toast.success("ĐẶT ĐƠN NHÓM THÀNH CÔNG!", {
      description: "Đơn hàng của team đã được lưu vào nhật ký.",
      style: { borderRadius: '20px' }
    });
    
    setTimeout(() => {
      clearCart();
      router.push("/dashboard"); 
    }, 1200);
  };

  if (!mounted) return null;

  if (!user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[3.5rem] p-12 text-center shadow-2xl border border-slate-50 space-y-8"
        >
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto">
            <Lock size={40} className="text-orange-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Dừng khoảng 2s!</h2>
            <p className="text-slate-400 font-medium text-xs">Vui lòng đăng nhập để sử dụng tính năng Đặt Nhóm.</p>
          </div>
          <Link href="/auth/login" className="w-full h-18 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-500 transition-all shadow-xl shadow-slate-200">
            ĐĂNG NHẬP NGAY <LogIn size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8 px-6">
        <div className="w-40 h-40 bg-slate-50 rounded-full flex items-center justify-center relative">
          <ShoppingBag size={64} className="text-slate-200" />
          <AlertCircle className="absolute top-8 right-8 text-orange-500 animate-pulse" />
        </div>
        <div className="text-center space-y-2">
           <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">Giỏ nhóm đang trống!</h2>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Team đang đợi Leader Mạnh chọn món...</p>
        </div>
        <Link href="/restaurants" className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-2xl shadow-slate-200 active:scale-95">
          ĐI CHỌN QUÁN NGAY
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 font-sans bg-slate-50/10 min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
              Order <span className="text-orange-500">Group</span>
            </h1>
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
                  CHÀO MỪNG TRỞ LẠI, {user.name.toUpperCase()}! 👋
               </p>
            </div>
        </div>
        <div className="flex -space-x-3 items-center">
            {mockMembers.map((m) => (
                <div key={m.id} className="relative w-14 h-14 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100 group">
                   <Image src={m.avatar} alt={m.name} fill sizes="56px" className="object-cover" unoptimized />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[8px] text-white font-black uppercase">
                      Online
                   </div>
                </div>
            ))}
            <div className="w-14 h-14 rounded-full bg-slate-900 border-4 border-white flex items-center justify-center text-[10px] font-black text-white shadow-xl relative z-10">
               +1
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white rounded-[4rem] p-10 md:p-14 shadow-2xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl" />
            
            <h3 className="text-2xl font-black text-slate-900 uppercase italic mb-12 flex items-center gap-4 border-b border-slate-50 pb-8">
              <Receipt className="text-orange-500" size={28} /> Bill Chi Tiết Nhóm
            </h3>
            
            <div className="space-y-10">
              <AnimatePresence mode="popLayout">
                {items.map((item) => {
                  // Tối ưu đường dẫn ảnh: Nếu có ảnh thì lấy ảnh, không thì lấy placeholder
                  const itemImg = item.images?.[0] || "/placeholder-food.png";
                  const finalImg = itemImg.startsWith('http') ? itemImg : `${basePath}${itemImg}`;

                  return (
                    <motion.div layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                      key={item.id} className="flex items-center gap-8 group"
                    >
                      <div className="relative w-28 h-28 rounded-[2rem] overflow-hidden shadow-xl group-hover:scale-105 transition-transform shrink-0 border-4 border-slate-50">
                          <Image 
                            src={finalImg} 
                            alt={item.name} 
                            fill 
                            sizes="112px" 
                            className="object-cover" 
                            unoptimized 
                          />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-orange-500 mb-2">
                          <Store size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{item.restaurantName || "Foodie Partner"}</span>
                        </div>
                        <h4 className="font-black text-slate-900 text-2xl tracking-tight uppercase leading-none italic">{item.name}</h4>
                        <p className="text-orange-500 font-black italic text-xl mt-2">
                          {item.price.toLocaleString()}đ <span className="text-slate-300 text-sm not-italic ml-3 tracking-[0.2em]">x{item.quantity}</span>
                        </p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="w-14 h-14 flex items-center justify-center text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                        <Trash2 size={24} />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-slate-900 text-white rounded-[4.5rem] p-12 shadow-2xl sticky top-28 overflow-hidden border-4 border-white/5">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-[80px]" />
            
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-12 text-orange-500">Checkout</h3>
            
            <div className="space-y-6 border-b border-white/10 pb-10 mb-10">
              <div className="flex justify-between text-slate-500 font-black uppercase text-[10px] tracking-widest">
                <span>Tạm tính</span>
                <span className="text-white">{billing.subtotal.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-slate-500 font-black uppercase text-[10px] tracking-widest">
                <span>Ship (Team share)</span>
                <span className="text-white">+{billing.shippingFee.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-green-500 font-black uppercase text-[10px] tracking-widest">
                <span>Voucher Team</span>
                <span>-{billing.discount.toLocaleString()}đ</span>
              </div>
            </div>

            <div className="mb-14 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Tổng đơn nhóm</span>
              <div className="text-6xl font-black italic text-white mt-4 leading-none tracking-tighter">
                {billing.finalTotal.toLocaleString()}<span className="text-xl text-orange-500 ml-2">đ</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-[3rem] p-8 mb-12 border border-white/10 group hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                   <Wallet size={20} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-orange-500">Auto Split ({billing.totalPeople} người)</span>
              </div>
              <p className="text-4xl font-black italic text-white tracking-tight">
                {Math.round(billing.splitAmount).toLocaleString()}đ
              </p>
              <p className="text-[9px] font-medium text-slate-500 mt-5 leading-relaxed italic opacity-70">
                *Hệ thống tự động chia bill dựa trên số lượng thành viên thực tế trong nhóm.
              </p>
            </div>

            <button onClick={handleCheckout}
              className="w-full h-22 bg-orange-500 hover:bg-white hover:text-slate-900 text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-orange-500/20 active:scale-95 group"
            >
              CHỐT ĐƠN NGAY <ArrowRight size={22} className="group-hover:translate-x-3 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}