"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Zap, Clock, Heart, MapPin, CheckCircle2, X } from "lucide-react";
import confetti from "canvas-confetti";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hiệu ứng pháo hoa rực rỡ
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f97316", "#fbbf24", "#ffffff"],
    });

    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <Breadcrumbs />
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none"
          >
            Liên hệ <span className="text-orange-500">Foodie</span>
          </motion.h1>
          <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] mt-6">
            Smart Office Meal Support — 24/7
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          
          {/* --- LEFT: CONTACT FORM --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-14 border border-slate-100 dark:border-slate-800 shadow-2xl"
          >
            <div className="mb-10 text-left">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic leading-none">Gửi tin nhắn</h2>
              <p className="text-orange-500 font-black uppercase tracking-widest text-[10px] mt-4 font-sans">Đội ngũ Foodie luôn sẵn sàng lắng nghe bạn</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-4">Họ và tên</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="NGUYỄN VĂN A"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-4">Email liên hệ</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="EXAMPLE@DOMAIN.COM"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-4">Nội dung hỗ trợ</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="HÃY ĐỂ LẠI LỜI NHẮN TẠI ĐÂY..."
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-3xl px-6 py-5 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 transition-all outline-none resize-none"
                />
              </div>

              <button type="submit" className="w-full py-5 bg-orange-500 hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 shadow-xl active:scale-95 group">
                Xác nhận gửi <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* --- RIGHT: INFO & MAP --- */}
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-50 dark:bg-orange-500/5 p-8 rounded-[2.5rem] border border-orange-100 dark:border-orange-500/10 text-left">
                <Zap size={20} className="text-orange-500 mb-4" fill="currentColor" />
                <p className="text-orange-500 font-black uppercase text-[9px] tracking-widest mb-1">Hotline</p>
                <p className="text-slate-900 dark:text-white font-black italic text-2xl tracking-tighter">1900 1234</p>
              </div>

              <div className="bg-slate-900 dark:bg-slate-800 p-8 rounded-[2.5rem] text-left shadow-xl border dark:border-slate-700">
                <Clock size={20} className="text-orange-500 mb-4" />
                <p className="text-slate-400 font-black uppercase text-[9px] tracking-widest mb-1">Open</p>
                <p className="text-white font-black italic text-xl tracking-tighter">08:00 — 22:00</p>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden group"
            >
              <div className="flex items-start gap-4 mb-6 text-left">
                <MapPin size={24} className="text-orange-500 shrink-0" />
                <div>
                  <p className="text-slate-400 dark:text-slate-500 font-black uppercase text-[8px] tracking-widest mb-1">Vị trí của chúng tôi</p>
                  <p className="text-slate-900 dark:text-white font-black italic text-sm leading-tight uppercase tracking-tight">
                    Đại học Công nghệ Kỹ thuật TP.HCM
                  </p>
                  <p className="text-slate-400 dark:text-slate-500 font-medium text-[12px] mt-1">1 Võ Văn Ngân, Linh Chiểu, Thủ Đức</p>
                </div>
              </div>

              {/* BẢN ĐỒ - Grayscale Hover */}
              <div className="relative h-72 w-full rounded-[2.5rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 border border-slate-100 dark:border-slate-800">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.485398611095!2d106.7693381!3d10.8506324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f238711f%3A0xbdca97148a0494c!2zSENNIFVuaXZlcnNpdHkgb2YgVGVjaG5vbG9neSBhbmQgRWR1Y2F0aW9u!5e0!3m2!1sen!2s!4v1713160000000!5m2!1sen!2s"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- POPUP THÀNH CÔNG --- */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSuccess(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white dark:bg-slate-900 rounded-[3rem] p-12 text-center shadow-3xl max-w-sm w-full border border-slate-100 dark:border-slate-800"
            >
              <div className="w-20 h-20 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-orange-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic leading-none mb-4 tracking-tighter">Gửi thành công!</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic text-sm mb-8 leading-relaxed">Đại học Công nghệ Kỹ thuật TP.HCM đã nhận được tin nhắn của bạn.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="w-full py-4 bg-slate-900 dark:bg-orange-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-lg dark:hover:bg-white dark:hover:text-slate-900"
              >
                QUAY LẠI TRANG
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-20 text-center border-t border-slate-50 dark:border-slate-900">
        <div className="inline-flex items-center gap-2.5 bg-slate-900 dark:bg-slate-800 text-white px-7 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl border dark:border-slate-700">
          SUPPORT TEAM <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> NHOM 05
        </div>
      </footer>
    </div>
  );
}