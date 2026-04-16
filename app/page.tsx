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
    <div className="flex flex-col w-full overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center px-6 lg:px-24 bg-white dark:bg-slate-950 py-20 transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 dark:bg-slate-900 px-4 py-2 rounded-2xl">
              <Zap size={14} className="text-orange-500 fill-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-orange-600 dark:text-orange-500">
                Foodie v1.0 • Smart Ordering
              </span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Ăn trưa <br />
              <span className="text-orange-500 italic">cùng team</span>
            </h1>

            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-lg leading-relaxed font-medium">
              Giải pháp đặt món nhóm thông minh, giúp team của bạn tiết kiệm phí ship và chia bill tự động chỉ trong vài giây.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/restaurants" className="bg-slate-900 dark:bg-orange-500 text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-wider hover:bg-orange-500 dark:hover:bg-white dark:hover:text-slate-900 transition-all shadow-lg shadow-slate-200 dark:shadow-none flex items-center gap-3 active:scale-95 text-sm">
                ĐẶT MÓN NGAY <ArrowRight size={18} />
              </Link>

              <Link
                href="/group-order"
                className="border-2 border-slate-100 dark:border-slate-800 px-10 py-4 rounded-2xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center"
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
            <div className="relative w-full aspect-[5/4] rounded-[3rem] overflow-hidden shadow-2xl shadow-orange-100 dark:shadow-none border-[12px] border-slate-50 dark:border-slate-900">
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1551248429-40975aa4de74"
                  alt="Food"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/40 px-6 border-y border-slate-100 dark:border-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<ShoppingBag size={28} />}
            title="Menu đa dạng"
            desc="Hàng trăm món ăn từ các thương hiệu nổi tiếng được cập nhật mỗi ngày."
          />
          <FeatureCard
            icon={<Users size={28} />}
            title="Đặt hàng nhóm"
            desc="Gộp đơn dễ dàng với đồng nghiệp, giúp tiết kiệm phí ship tối đa."
          />
          <FeatureCard
            icon={<ShieldCheck size={28} />}
            title="Chia bill tự động"
            desc="Hệ thống tự động tính toán và chia hóa đơn chính xác cho từng người."
          />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-5xl mx-auto bg-slate-900 dark:bg-orange-600 rounded-[3rem] p-16 text-center text-white space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Sẵn sàng đặt món <br className="md:hidden" /> cùng team?
          </h2>
          <p className="text-lg text-slate-300 opacity-90 max-w-xl mx-auto font-medium">
            Trải nghiệm ngay nền tảng đặt món nhóm thông minh nhất dành cho văn phòng.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex bg-orange-500 text-white dark:bg-white dark:text-orange-600 px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl shadow-orange-500/20 dark:shadow-none"
          >
            Bắt đầu ngay <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </section>

      {/* MENU */}
      <section className="px-6 py-24 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                Thực đơn <span className="text-orange-500">nổi bật</span>
              </h2>
              <div className="h-1.5 w-24 bg-orange-500 mt-2 rounded-full"></div>
            </div>
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
        </div>
      </section>
    </div>
  );
}

/* FEATURE CARD NÂNG CẤP GIAO DIỆN */
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
    <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-orange-500/5 transition-all duration-500 group relative overflow-hidden">
      <div className="mb-6 text-orange-500 dark:text-orange-500 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
      
      {/* Hiệu ứng trang trí nhỏ ở góc card */}
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-tl-[2rem] -mr-8 -mb-8 transition-all group-hover:mr-0 group-hover:mb-0"></div>
    </div>
  );
}