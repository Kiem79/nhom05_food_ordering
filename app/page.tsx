"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Users, Zap, ShieldCheck } from "lucide-react";
import data from "@/lib/data.json";
import ProductCard from "@/components/ui/ProductCard";
import FoodCardSkeleton from "@/components/ui/FoodCardSkeleton";
import Image from "next/image";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center px-6 lg:px-24 bg-white py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-2xl">
              <Zap size={14} className="text-orange-500 fill-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                Foodie v1.0
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 italic uppercase tracking-tighter leading-[0.9]">
              Ăn trưa <br />
              <span className="text-orange-500">cùng team</span>
            </h1>

            <p className="text-slate-400 font-medium text-lg max-w-lg leading-relaxed italic">
              Giải pháp đặt món nhóm thông minh, tiết kiệm phí ship và chia bill tự động dành riêng cho đồng đội.
            </p>

            <div className="flex flex-wrap gap-5 pt-6">
              <Link href="/restaurants" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-2xl shadow-slate-200 flex items-center gap-3 active:scale-95 text-xs">
                ĐẶT MÓN NGAY <ArrowRight size={18} />
              </Link>

              <Link
                href="/group-order"
                className="border-4 border-slate-50 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-all text-xs"
              >
                Đặt nhóm
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative w-full aspect-[5/4] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src="https://images.unsplash.com/photo-1551248429-40975aa4de74"
                alt="Foodie Team Lunch"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<ShoppingBag size={24} />}
            title="Menu đa dạng"
            desc="Hàng trăm món ăn từ các thương hiệu hàng đầu được cập nhật mỗi ngày."
          />
          <FeatureCard
            icon={<Users size={24} />}
            title="Đặt hàng nhóm"
            desc="Gộp đơn cùng đồng đội chỉ trong 1 click, tiết kiệm tối đa chi phí ship."
          />
          <FeatureCard
            icon={<ShieldCheck size={24} />}
            title="Chia bill tự động"
            desc="Hệ thống tự động tính toán và chia bill sòng phẳng, không lo nhầm lẫn."
          />
        </div>
      </section>

      {/* --- MENU PREVIEW --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col gap-2 border-l-8 border-orange-500 pl-6 mb-12">
            <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
              Thực đơn <span className="text-orange-500">nổi bật</span>
            </h2>
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
                Tinh hoa ẩm thực dành cho bữa trưa của bạn
            </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <FoodCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {data.slice(0, 6).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[4rem] p-16 text-center text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter relative z-10">
            Sẵn sàng đặt món <br /> <span className="text-orange-500">cùng đồng đội?</span>
          </h2>
          <p className="text-slate-400 font-medium max-w-lg mx-auto relative z-10">
            Trải nghiệm nền tảng đặt món nhóm thông minh nhất hiện nay. Tiết kiệm hơn, vui hơn!
          </p>
          <Link
            href="/auth/register"
            className="inline-flex bg-orange-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-slate-900 transition-all relative z-10 shadow-xl shadow-orange-500/20 active:scale-95"
          >
            BẮT ĐẦU NGAY <ArrowRight className="ml-3" size={18} />
          </Link>
        </div>
      </section>
      
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all group">
      <div className="mb-6 text-orange-500 group-hover:scale-110 transition-transform inline-block">
        {icon}
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-3 uppercase italic tracking-tight">{title}</h3>
      <p className="text-sm text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}