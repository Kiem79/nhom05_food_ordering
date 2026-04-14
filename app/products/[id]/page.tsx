<<<<<<< HEAD
import data from "@/lib/data.json";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  return data.map((item) => ({
    id: item.id.toString(),
  }));
}

// ✅ Params chuẩn Next.js 15 (KHÔNG dùng Promise)
interface Props {
  params: { id: string };
}

export default function ProductDetail({ params }: Props) {
  const { id } = params;

  // Tìm sản phẩm theo id
  const product = data.find((item) => item.id.toString() === id);

  // Không có thì 404
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">

        {/* Hình ảnh */}
        <div className="relative w-full h-80 rounded-foodie overflow-hidden bg-gray-100">
          <Image
            src={product.images?.[0] || "/images/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Thông tin */}
        <div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            {product.name}
          </h1>

          <p className="text-secondary mb-4">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-primary mb-6">
            {product.price.toLocaleString()}đ
          </p>

          <button
            className="bg-primary text-white px-6 py-3 rounded-foodie hover:opacity-90 transition"
            type="button"
          >
            Thêm vào giỏ
          </button>
=======
"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingBag, Heart, Sparkles, ChevronLeft, Leaf } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";

// Data & Types
import productsData from "@/lib/data/products.json";
import storesData from "@/lib/data/stores.json";
import type { Product, Restaurant } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: PageProps) {
  // Giải nén Promise params (Chuẩn Next.js 15)
  const decodedParams = use(params);
  const id = decodedParams.id;
  
  const { addItem } = useCartStore();

  const products = productsData.products as Product[];
  const restaurants = storesData.restaurants as Restaurant[];

  const product = products.find((item) => String(item.id) === id);

  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) return <div className="py-20 text-center font-black uppercase italic text-slate-400">Món ăn không tồn tại</div>;

  const restaurant = restaurants.find((store) => store.menuIds.includes(product.id));
  const relatedProducts = products.filter((item) => product.relatedIds.includes(item.id));

  // CẬP NHẬT: Logic thêm vào giỏ kèm theo tên nhà hàng
  const handleAddToCart = () => {
    const restaurantName = restaurant?.name || "Foodie Restaurant";
    
    for (let i = 0; i < quantity; i++) {
      addItem(product, restaurantName);
    }
    
    toast.success(`Đã thêm ${quantity} món vào đơn hàng`, {
      icon: <ShoppingBag className="text-orange-500" />,
      style: { borderRadius: '20px', fontWeight: 'bold' }
    });
  };

  return (
    <div className="relative min-h-screen bg-white pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link href={`/restaurants/${restaurant?.id}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 font-bold text-xs uppercase tracking-widest mb-10 transition-colors group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Quay lại thực đơn
        </Link>

        {/* --- PHẦN 1: THÔNG TIN CHI TIẾT --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-12">
          
          {/* CỘT TRÁI: ẢNH & ĐIỀU KHIỂN */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-4/3 rounded-[3rem] overflow-hidden shadow-2xl shadow-orange-100 border-4 border-white"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg active:scale-75 transition-all"
              >
                <Heart className={`transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-slate-300"}`} size={22} />
              </button>
            </motion.div>

            {/* BỘ CHỌN SỐ LƯỢNG & NÚT GIỎ HÀNG */}
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-50 p-2 rounded-3xl border border-slate-100">
                <span className="ml-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Số lượng</span>
                <div className="flex items-center gap-6 bg-white rounded-2xl p-1.5 shadow-sm border border-slate-50">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-orange-500">
                    <Minus size={18} strokeWidth={3} />
                  </button>
                  <span className="text-xl font-black w-6 text-center text-slate-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl transition-colors text-orange-500">
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="group relative w-full h-20 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-orange-500 transition-all active:scale-[0.98] shadow-2xl shadow-slate-200 overflow-hidden"
              >
                <ShoppingBag size={22} className="group-hover:rotate-12 transition-transform" />
                Thêm vào đơn • {(product.price * quantity).toLocaleString()}đ
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: THÔNG TIN */}
          <div className="space-y-8">
            <div>
              <p className="text-orange-500 font-black uppercase tracking-[0.2em] text-xs mb-3 flex items-center gap-2">
                <Sparkles size={14} /> {product.category[0]}
              </p>
              <h1 className="text-5xl font-black text-slate-900 leading-[1.1] mb-4 uppercase italic tracking-tighter">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-3xl font-black text-orange-500 tracking-tight">{product.price.toLocaleString()}đ</p>
                {restaurant && <div className="h-8 w-px bg-slate-200 mx-2" />}
                {restaurant && (
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Quán: <span className="text-slate-900">{restaurant.name}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-100 border border-slate-50">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Mô tả món ăn</h2>
              <p className="text-slate-500 leading-relaxed font-medium text-lg">{product.description}</p>
            </div>

            {/* SECTION DINH DƯỠNG */}
            <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-100 border border-slate-100">
              <h2 className="font-black text-slate-900 mb-4 uppercase italic tracking-widest text-xs">
                Giá trị dinh dưỡng
              </h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-orange-50 rounded-2xl p-4 text-center">
                  <p className="text-xs text-slate-400 font-bold">Calo</p>
                  <p className="text-xl font-black text-orange-500">{product.calories}</p>
                </div>
                <div className="bg-orange-50 rounded-2xl p-4 text-center">
                  <p className="text-xs text-slate-400 font-bold">Protein</p>
                  <p className="text-xl font-black text-orange-500">{product.protein}g</p>
                </div>
                <div className="bg-orange-50 rounded-2xl p-4 text-center">
                  <p className="text-xs text-slate-400 font-bold">Carbs</p>
                  <p className="text-xl font-black text-orange-500">{product.carbs}g</p>
                </div>
                <div className="bg-orange-50 rounded-2xl p-4 text-center">
                  <p className="text-xs text-slate-400 font-bold">Fat</p>
                  <p className="text-xl font-black text-orange-500">{product.fat}g</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- PHẦN 2: BANNER THÀNH PHẦN --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-24 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-orange-400 rounded-[2.5rem] shadow-2xl shadow-orange-200" />
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl border border-white/30">
              <Leaf className="text-white" size={40} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Thành phần chi tiết</h3>
              <h2 className="text-white text-2xl md:text-3xl font-black uppercase italic tracking-tight leading-tight">
                {product.ingredients}
              </h2>
            </div>
            <Sparkles className="hidden lg:block text-white/20 group-hover:text-white/40 transition-colors" size={80} />
          </div>
        </motion.div>

        {/* --- PHẦN 3: MÓN LIÊN QUAN --- */}
        <div className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
              Món liên <span className="text-orange-500">quan</span>
            </h2>
            <div className="h-0.5 flex-1 bg-slate-100 ml-10 hidden md:block" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/products/${item.id}`} className="group bg-white rounded-[2.5rem] p-5 border border-slate-50 shadow-lg hover:shadow-2xl hover:shadow-orange-100 transition-all duration-500">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-5">
                  <Image src={item.images[0]} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="font-black text-slate-900 uppercase italic text-sm line-clamp-1 mb-2 px-2">{item.name}</h3>
                <p className="text-orange-500 font-black px-2">{item.price.toLocaleString()}đ</p>
              </Link>
            ))}
          </div>
>>>>>>> main
        </div>

      </div>
    </div>
  );
}