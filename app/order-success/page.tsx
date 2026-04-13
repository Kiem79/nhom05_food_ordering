"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, PackageCheck, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function OrderSuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart(); // Dọn dẹp giỏ hàng khi đã đặt thành công
  }, [clearCart]);

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
            Mã đơn: <span className="font-bold text-slate-900 underline underline-offset-4">#SOM-2026-999</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-6">
          <Link href="/order-tracking" className="h-18 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-500 transition-all shadow-2xl shadow-slate-200 active:scale-95">
            THEO DÕI SHIPPER <PackageCheck size={20} />
          </Link>
          <Link href="/products" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-orange-500 transition-colors">
            Quay lại thực đơn
          </Link>
        </div>
      </motion.div>
    </div>
  );
}