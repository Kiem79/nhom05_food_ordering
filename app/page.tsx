"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Users, Zap, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden font-sans selection:bg-orange-100">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center px-6 lg:px-24 bg-white py-20 lg:py-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 px-5 py-2.5 rounded-full shadow-sm shadow-orange-100/50">
              <Zap size={14} className="text-orange-500 fill-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Smart Office Meal v1.0</span>
            </div>
            
            <h1 className="text-7xl lg:text-8xl font-black text-slate-900 leading-[0.95] uppercase italic tracking-tighter">
              Ăn Trưa <br /> 
              <span className="text-orange-500">Cùng Team</span>
            </h1>
            
            <p className="text-slate-500 text-xl font-medium max-w-lg leading-relaxed opacity-90">
              Giải pháp đặt cơm nhóm thông minh cho dân văn phòng. Tiết kiệm phí ship, tự động chia bill, ăn ngon mỗi ngày cùng đồng nghiệp.
            </p>

            <div className="flex flex-wrap gap-5 pt-6">
              <Link href="/products" className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-2xl shadow-slate-200 flex items-center gap-3 active:scale-95 text-sm">
                ĐẶT MÓN NGAY <ArrowRight size={18} />
              </Link>
              <Link href="/group-order" className="bg-white text-slate-900 border-2 border-slate-100 px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:border-orange-500 transition-all flex items-center gap-3 active:scale-95 text-sm hover:shadow-lg hover:shadow-slate-100">
                XEM GIỎ NHÓM <Users size={18} />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 w-full aspect-[5/4] rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=1200" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Premium Office Bento Box"
              />
            </div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-40 animate-pulse delay-700"></div>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-32 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<ShoppingBag className="text-orange-500" />}
              title="Menu Đa Dạng"
              desc="Hàng trăm món ăn từ các nhà hàng uy tín, cập nhật thực đơn mỗi ngày."
            />
            <FeatureCard 
              icon={<Users className="text-orange-500" />}
              title="Đặt Hàng Nhóm"
              desc="Mời đồng nghiệp join đơn, không còn nỗi lo phí ship cao ngất ngưởng."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-orange-500" />}
              title="Chia Bill Tự Động"
              desc="Hệ thống tự động chia tiền lẻ đến từng thành viên. Leader cực kỳ thảnh thơi."
            />
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6 bg-white">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-center space-y-12 relative overflow-hidden shadow-2xl shadow-slate-900/10"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
         <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase italic tracking-tighter relative z-10 leading-[1.4] max-w-5xl mx-auto px-4">
            <span className="block whitespace-nowrap">
              Sẵn sàng nạp năng lượng
            </span>
            <span className="block text-orange-500 whitespace-nowrap">
              cùng đồng nghiệp?
            </span>
          </h2>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto relative z-10 leading-relaxed text-sm lg:text-lg opacity-90">
            Tham gia cùng hàng ngàn nhân viên văn phòng đang sử dụng Foodie để có những bữa trưa vui vẻ, tiết kiệm và đầy đủ dinh dưỡng.
          </p>
          
          <div className="relative z-10 pt-6">
            <Link href="/auth/register" className="inline-flex bg-orange-500 text-white px-14 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-orange-500/20 active:scale-95 group">
              BẮT ĐẦU NGAY <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform ml-2" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-12 rounded-[3rem] border border-white hover:border-orange-100 hover:shadow-2xl hover:shadow-orange-100/30 transition-all group cursor-pointer">
      <div className="w-18 h-18 bg-orange-50 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-orange-100 transition-all duration-300">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h3 className="text-2xl font-black text-slate-900 uppercase italic mb-5 tracking-tight group-hover:text-orange-600 transition-colors">{title}</h3>
      <p className="text-slate-500 text-base font-medium leading-relaxed opacity-90">{desc}</p>
    </div>
  );
}