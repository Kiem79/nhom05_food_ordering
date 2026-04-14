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

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center px-6 lg:px-24 bg-white py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-foodie">
              <Zap size={14} className="text-primary fill-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Foodie v1.0
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-primary leading-tight">
              Ăn trưa <br />
              <span className="text-primary">cùng team</span>
            </h1>

            <p className="text-secondary text-lg max-w-lg">
              Giải pháp đặt món nhóm thông minh, tiết kiệm phí ship và chia bill tự động.
            </p>

            <div className="flex flex-wrap gap-5 pt-6">
              <Link href="/restaurants" className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-2xl shadow-slate-200 flex items-center gap-3 active:scale-95 text-sm">
                ĐẶT MÓN NGAY <ArrowRight size={18} />
              </Link>

              <Link
                href="/group-order"
                className="border px-8 py-4 rounded-foodie font-bold text-primary hover:bg-primary/10"
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
            <div className="relative w-full aspect-\[5\/4\] {
    aspect-ratio: 5/4 rounded-foodie overflow-hidden">
              <div className="relative w-full h-64">
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
      <section className="py-20 bg-secondary/5 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<ShoppingBag />}
            title="Menu đa dạng"
            desc="Hàng trăm món ăn được cập nhật mỗi ngày."
          />
          <FeatureCard
            icon={<Users />}
            title="Đặt hàng nhóm"
            desc="Gộp đơn dễ dàng, tiết kiệm chi phí."
          />
          <FeatureCard
            icon={<ShieldCheck />}
            title="Chia bill tự động"
            desc="Không cần tính toán thủ công."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto bg-primary rounded-foodie p-12 text-center text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Sẵn sàng đặt món cùng team?
          </h2>
          <p className="text-sm opacity-90">
            Trải nghiệm ngay nền tảng đặt món nhóm thông minh.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex bg-white text-primary px-6 py-3 rounded-foodie font-bold hover:opacity-90"
          >
            Bắt đầu ngay <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </section>

      {/* MENU */}
      <section className="px-6 pb-20">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Thực đơn nổi bật
        </h2>

        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <FoodCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.slice(0, 6).map((item) => (
              <ProductCard key={item.id} product={{...item, id: item.id.toString()}} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* FIX any → React.ReactNode */
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
    <div className="bg-white p-8 rounded-foodie border hover:shadow-md transition">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
      <p className="text-sm text-secondary">{desc}</p>
    </div>
  );
}