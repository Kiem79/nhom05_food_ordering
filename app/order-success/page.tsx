"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle, PackageCheck, UserCircle } from "lucide-react";
import Link from "next/link";
import { useCartStore, CartItem } from "@/store/cartStore";

export default function OrderSuccessPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [orderId, setOrderId] = useState<string>("");
  const hasSaved = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasSaved.current) return;

      if (items.length === 0) {
        const savedOrders = JSON.parse(localStorage.getItem("foodie_orders") || "[]");
        if (savedOrders.length > 0) {
          setOrderId(savedOrders[0].id);
        }
        return;
      }

      hasSaved.current = true;

      const generatedId = `SOM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const newOrder = {
        id: generatedId,
        date: new Date().toLocaleString("vi-VN"),
        items: items.map((item: CartItem) => ({
          ...item,
          
          displayImage: item.images && item.images.length > 0 ? item.images[0] : "/placeholder.png"
        })),
        total: totalPrice(),
        status: "Đang xử lý",
      };

      try {
        const existingOrders = JSON.parse(localStorage.getItem("foodie_orders") || "[]");
        localStorage.setItem("foodie_orders", JSON.stringify([newOrder, ...existingOrders]));
        
        setOrderId(generatedId);
        clearCart();
      } catch (error) {
        console.error("Lỗi lưu đơn hàng:", error);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [items, totalPrice, clearCart]);

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-white px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full text-center space-y-8"
      >
        <div className="relative inline-block">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-100"
          >
            <CheckCircle size={64} className="text-white" />
          </motion.div>
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -left-4 -right-4 -bottom-4 border-2 border-dashed border-green-200 rounded-full"
          />
        </div>

        <div className="space-y-4">
         <h1 className="text-5xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-[1.1]">
            <span className="block">Đã nhận đơn</span>
            <span className="block text-green-500">Thành công!</span>
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Món ăn của team bạn đang được chuyển đến nhà bếp. <br />
            Mã đơn: <span className="font-bold text-slate-900 underline underline-offset-4 tracking-wider">
              #{orderId || "XÁC NHẬN..."}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-6">
          <Link href="/order-tracking" className="h-16 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-500 transition-all shadow-2xl shadow-slate-200 active:scale-95">
            THEO DÕI SHIPPER <PackageCheck size={20} />
          </Link>
          
          <Link href="/dashboard" className="h-16 border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-95">
            LỊCH SỬ ĐƠN HÀNG <UserCircle size={20} />
          </Link>

          <Link href="/restaurants" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-orange-500 transition-colors pt-4">
            Quay lại nhà hàng
          </Link>
        </div>
      </motion.div>
    </div>
  );
}