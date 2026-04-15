"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bike, MapPin, ChefHat, CheckCircle2, Wallet, Navigation, Clock } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
// --- MOCK GPS MAP COMPONENT ---
const FakeGPSMap = () => (
    <div className="relative w-full h-[400px] bg-slate-100 dark:bg-slate-900 rounded-[3rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-inner transition-colors duration-500">
      {/* Grid Dots */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-10" 
        style={{ 
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} 
      />
      
      <svg className="absolute inset-0 w-full h-full">
        {/* Đường đi mờ (Background Path) */}
        <motion.path
          d="M 50 350 Q 150 300 200 200 T 350 50"
          fill="none"
          stroke="currentColor"
          className="text-slate-200 dark:text-slate-800"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Đường đi chính (Active Path) */}
        <motion.path
          d="M 50 350 Q 150 300 200 200 T 350 50"
          fill="none"
          stroke="#f97316"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 0.6 }} 
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Cửa hàng */}
      <div className="absolute left-[40px] bottom-[40px] text-center">
        <div className="w-8 h-8 bg-slate-900 dark:bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <ChefHat size={14} className="text-white" />
        </div>
        <p className="text-[8px] font-black uppercase mt-1 dark:text-slate-400">Shop</p>
      </div>

      {/* Điểm đến */}
      <div className="absolute right-[40px] top-[40px] text-center">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <MapPin size={14} className="text-white" />
        </div>
        <p className="text-[8px] font-black uppercase mt-1 dark:text-slate-400">Office</p>
      </div>

      {/* Shipper Icon */}
      <motion.div 
        animate={{ 
          x: [50, 150, 210], 
          y: [330, 280, 180] 
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute z-20"
      >
        <div className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-2xl border border-orange-100 dark:border-orange-500/20 transition-colors">
          <Bike className="text-orange-500" size={20} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 animate-ping" />
        </div>
      </motion.div>
      
      {/* Info Tag */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-transparent dark:border-white/10 transition-all">
        <Navigation size={16} className="text-orange-500 animate-bounce" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Shipper đang cách bạn 1.2km</span>
      </div>
    </div>
);
export default function OrderTrackingPage() {
  const [step, setStep] = useState(2); 

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans bg-transparent dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      <div className="mb-8">
        <Breadcrumbs />
      </div>
      <div className="mb-12">
        <h1 className="text-6xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
          Tracking <span className="text-orange-500">Order</span>
        </h1>
        <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] pt-4 italic">
          Đơn hàng đang trên đường tới văn phòng của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <FakeGPSMap />

        <div className="space-y-8">
          {/* TIẾN ĐỘ ĐƠN HÀNG */}
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-50 dark:border-slate-800 shadow-2xl shadow-slate-100/50 dark:shadow-none transition-colors">
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic mb-8 flex items-center gap-3">
               <Clock className="text-orange-500" /> Tiến độ đơn hàng
            </h3>
            
            <div className="space-y-10 relative">
                <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800" />
                {[
                    { label: "Đã nhận đơn", icon: <CheckCircle2 size={18}/>, done: true },
                    { label: "Đang chuẩn bị món", icon: <ChefHat size={18}/>, done: true },
                    { label: "Đang giao hàng", icon: <Bike size={18}/>, done: true },
                    { label: "Đã đến nơi", icon: <MapPin size={18}/>, done: false },
                ].map((s, i) => (
                    <div key={i} className={`flex items-center gap-6 relative z-10 transition-all duration-500 ${s.done ? "opacity-100" : "opacity-30 dark:opacity-20"}`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform ${s.done ? "bg-orange-500 text-white scale-110" : "bg-white dark:bg-slate-800 text-slate-300 dark:text-slate-600"}`}>
                            {s.icon}
                        </div>
                        <span className="font-black uppercase italic text-sm tracking-tight text-slate-900 dark:text-white">
                          {s.label}
                        </span>
                    </div>
                ))}
            </div>
          </div>

          {/* SPLIT BILL REMINDER */}
          <div className="bg-slate-900 dark:bg-slate-900/50 border border-transparent dark:border-slate-800 text-white rounded-[4rem] p-10 shadow-2xl relative overflow-hidden transition-all">
             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
             <div className="flex items-center gap-3 mb-6 text-orange-500">
                <Wallet size={24} />
                <h3 className="text-xl font-black uppercase italic tracking-tighter">Split Bill Reminder</h3>
             </div>
             <p className="text-slate-400 dark:text-slate-500 text-sm font-medium leading-relaxed mb-6">Mỗi thành viên trong nhóm cần chuyển khoản cho bạn:</p>
             <div className="text-5xl font-black italic mb-8 dark:text-white">
                55,000<span className="text-xl text-orange-500 ml-1">đ</span>
             </div>
             <button className="w-full h-16 bg-white dark:bg-orange-500 text-slate-900 dark:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-500 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all active:scale-95 shadow-lg">
                GỬI THÔNG BÁO NHẮC TIỀN CHO TEAM 💬
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}