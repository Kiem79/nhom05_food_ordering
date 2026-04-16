"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";

export default function Cart() {
  const { items, removeItem, getFinalTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Đảm bảo chỉ chạy trên client để tránh lỗi Hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6 transition-colors duration-500 bg-white dark:bg-slate-950">
        <div className="w-32 h-32 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center">
          <ShoppingBag size={48} className="text-slate-200 dark:text-slate-700" />
        </div>
        <h1 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white">Giỏ hàng đang trống</h1>
        <Link href="/restaurants" className="bg-slate-900 dark:bg-orange-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-500 dark:hover:bg-white dark:hover:text-orange-500 transition-all shadow-xl">
          ĐI CHỌN MÓN NGAY
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-6 py-24 font-sans">
        <h1 className="text-5xl font-black mb-12 uppercase italic tracking-tighter text-slate-900 dark:text-white">
          Giỏ <span className="text-orange-500">Hàng</span>
        </h1>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-50 dark:border-slate-800 shadow-2xl space-y-8">
          {items.map((item) => (
            <div key={`${item.id}-${item.owner}`} className="flex justify-between items-center group">
              <div className="space-y-1">
                <h4 className="font-black text-xl text-slate-900 dark:text-white uppercase italic leading-none">{item.name}</h4>
                <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">
                  Số lượng: {item.quantity} — Người đặt: <span className="text-blue-500 dark:text-blue-400">{item.owner === "Host" ? "Bạn" : item.owner}</span>
                </p>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-black text-lg text-orange-500 italic">
                  {(item.price * item.quantity).toLocaleString()}đ
                </span>
                <button 
                  onClick={() => removeItem(item.id, item.owner)}
                  className="p-3 text-slate-200 dark:text-slate-700 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-8 border-t-4 border-slate-50 dark:border-slate-800 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-2">Tổng thanh toán (gồm ship)</p>
              <p className="text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter leading-none">
                {getFinalTotal().toLocaleString()}đ
              </p>
            </div>
            
            <Link href="/checkout" className="bg-slate-900 dark:bg-orange-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 hover:bg-orange-500 dark:hover:bg-white dark:hover:text-orange-500 transition-all shadow-2xl active:scale-95">
              THANH TOÁN <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}