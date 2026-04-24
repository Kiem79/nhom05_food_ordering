"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Users, Zap, ShieldCheck, Info } from "lucide-react";
import { Product } from "@/types/product";
import productsData from "@/lib/data/products.json"; 
import FoodCardSkeleton from "@/components/ui/FoodCardSkeleton";
import Image from "next/image";

const basePath = "/nhom05_food_ordering";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const [featuredProducts] = useState<Product[]>(() => {
    const allProducts = [...(productsData.products as Product[])];
    return allProducts.sort(() => 0.5 - Math.random()).slice(0, 6);
  });

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
            <div className="inline-flex items-center gap-2 bg-orange-50 dark:bg-slate-900/50 px-4 py-2 rounded-2xl border border-orange-100 dark:border-orange-500/20">
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
            <div className="relative w-full aspect-5/4 rounded-[3rem] overflow-hidden shadow-2xl shadow-orange-100 dark:shadow-none border-12px border-slate-50 dark:border-slate-900">
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1551248429-40975aa4de74"
                  alt="Food"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/40 px-6 border-y border-slate-100 dark:border-slate-800 transition-colors">
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

      {/* MENU NỔI BẬT */}
      <section className="px-6 py-24 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                Thực đơn <span className="text-orange-500">nổi bật</span>
              </h2>
              <div className="h-1.5 w-24 bg-orange-500 mt-2 rounded-full"></div>
            </div>
            <Link href="/restaurants" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-2">
              Xem tất cả <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <FoodCardSkeleton key={i} />
              ))
            ) : (
              featuredProducts.map((item) => (
                <HomeProductCard key={item.id} product={item} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-5xl mx-auto bg-slate-900 dark:bg-orange-500 rounded-[3rem] p-16 text-center text-white space-y-8 shadow-2xl relative overflow-hidden">
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
    </div>
  );
}

function HomeProductCard({ product }: { product: Product }) {
  const rawImg = product.images[0];
  const finalImg = rawImg.startsWith("http") 
    ? rawImg 
    : `${basePath}${rawImg.startsWith("/") ? "" : "/"}${rawImg}`;

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 flex flex-col h-full">
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={finalImg}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          unoptimized={true} 
        />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-white/20">
          <span className="text-orange-600 dark:text-orange-500 font-black text-xs">
            {product.calories} kcal
          </span>
        </div>
      </div>
      
      {/* BODY SECTION */}
      <div className="p-8 flex flex-col flex-1">
        
        <div className="flex flex-col min-h-40">
          <div className="flex flex-wrap gap-2">
            {product.category.slice(0, 2).map((cat, idx) => (
              <span key={idx} className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-lg">
                {cat}
              </span>
            ))}
          </div>
          
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-4 pt-3 pb-1 line-clamp-2 italic uppercase tracking-tighter leading-[1.1]">
            {product.name}
          </h3>
          
          <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mt-2 font-medium leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex-1 min-h-5"></div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
          <span className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter">
            {product.price.toLocaleString()}đ
          </span>
          <Link 
            href={`/products/${product.id}`}
            className="flex items-center gap-2 bg-slate-900 dark:bg-slate-800 text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-all active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none"
          >
            Chi tiết <Info size={14} />
          </Link>
        </div>
      </div>
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
    <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-orange-500/5 transition-all duration-500 group relative overflow-hidden">
      <div className="mb-6 text-orange-500 dark:text-orange-500 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
      
      {/* Hiệu ứng trang trí góc */}
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-tl-[2rem] -mr-8 -mb-8 transition-all group-hover:mr-0 group-hover:mb-0"></div>
    </div>
  );
}