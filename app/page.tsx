"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, Star, ShieldCheck, Utensils } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-28 md:pb-32 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Nền tảng gom đơn số 1 cho sinh viên
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter">
            Đặt món nhóm <br />
            <span className="text-orange-500 italic">Tiết kiệm & Vui vẻ</span>
          </h1>
          
          <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto md:mx-0 leading-relaxed">
            Nền tảng góp đơn hàng đầu cho sinh viên HCMUTE. Đặt cùng nhau, giao một chỗ, nhận ưu đãi lớn!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <Link href="/products" className="w-full sm:w-auto">
              <Button className="w-full h-16 px-10 text-sm font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-orange-100 hover:scale-105 transition-all">
                KHÁM PHÁ NGAY <ArrowRight size={18} />
              </Button>
            </Link>

            <Link href="/group-order" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="w-full h-16 px-10 text-sm font-black uppercase tracking-widest rounded-2xl border-2 border-slate-100 bg-white text-slate-600 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all shadow-sm"
              >
                MỞ PHÒNG ĐẶT NHÓM
              </Button>
            </Link>
          </div>
        </div>

        {/* IMAGE HERO */}
        <div className="flex-1 relative w-full group">
          <div className="absolute -inset-4 bg-orange-100/40 rounded-[3rem] blur-2xl -z-10 group-hover:bg-orange-200/40 transition-colors"></div>
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000" 
            alt="Foodie Hero" 
            className="rounded-[2.5rem] shadow-2xl border-[12px] border-white object-cover h-[450px] w-full transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="bg-slate-50/50 py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-xs font-black text-orange-500 uppercase tracking-[0.4em]">Đặc quyền của bạn</h2>
            <p className="text-3xl font-black text-slate-900 tracking-tight">Trải nghiệm đặt món thế hệ mới</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Clock size={32} />, 
                title: "Giao hàng nhanh", 
                desc: "Đơn hàng được tối ưu lộ trình, đảm bảo đồ ăn luôn nóng hổi khi tới tay." 
              },
              { 
                icon: <Star size={32} />, 
                title: "Chất lượng 5 sao", 
                desc: "Tuyển chọn các quán ăn sạch sẽ, uy tín nhất trong khu vực làng đại học." 
              },
              { 
                icon: <ShieldCheck size={32} />, 
                title: "Thanh toán an toàn", 
                desc: "Minh bạch trong việc chia tiền nhóm, hỗ trợ nhiều phương thức hiện đại." 
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-white shadow-sm hover:shadow-xl hover:shadow-orange-100/50 transition-all group">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl -mr-40 -mt-40"></div>
          <div className="relative z-10 space-y-8">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto text-orange-500 border border-white/10">
              <Utensils size={36} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic leading-none">
              Sẵn sàng để <br className="md:hidden" /> <span className="text-orange-500 uppercase not-italic">Gom Đơn?</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-md mx-auto text-lg leading-relaxed">
              Hàng trăm món ngon đang chờ bạn và đồng đội.      
              Đặt ngay để nhận ưu đãi nhóm!
            </p>
            <div className="pt-6">
              <Link href="/products">
                <Button className="h-16 px-14 text-sm font-black uppercase tracking-widest rounded-2xl shadow-none hover:bg-orange-600 transition-all">
                  BẮT ĐẦU NGAY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}