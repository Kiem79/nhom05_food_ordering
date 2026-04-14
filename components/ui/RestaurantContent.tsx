"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, ShoppingBag, MapPin, Clock, Star, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import restaurantsData from "@/lib/data/stores.json";
import productsData from "@/lib/data/products.json";
import { useCartStore } from "@/store/cartStore";
import type { Restaurant, Product } from "@/types";

const basePath = "/nhom05_food_ordering";

export default function RestaurantContent({ id }: { id: string }) {
  const { addItem } = useCartStore();
  const restaurants = (restaurantsData.restaurants as Restaurant[]);
  const allProducts = (productsData.products as Product[]);

  const restaurant = restaurants.find((r) => String(r.id) === String(id));

  if (!restaurant) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-sans">
        <h2 className="text-2xl font-black uppercase italic text-slate-300">
          Không tìm thấy quán (ID: {id})
        </h2>
        <p className="text-xs text-slate-400 mt-2 italic">Vui lòng kiểm tra lại dữ liệu trong file stores.json</p>
        <Link href="/restaurants" className="mt-8 text-orange-500 font-black uppercase text-[10px] tracking-widest border-b-2 border-orange-500 pb-1">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const menu = allProducts.filter((p) => restaurant.menuIds.includes(p.id));

  const getImg = (src: string) => src.startsWith("http") ? src : `${basePath}${src.startsWith("/") ? "" : "/"}${src}`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 font-sans">
      <Link href="/restaurants" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 font-black uppercase text-[10px] tracking-widest mb-10 transition-all group">
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Quay lại thực đơn
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative min-h-[450px] rounded-[3.5rem] overflow-hidden mb-12 shadow-2xl border-4 border-white flex items-end">
        <Image 
          src={getImg(restaurant.images[0])} 
          alt={restaurant.name} fill className="object-cover" priority unoptimized 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="relative z-10 w-full p-8 md:p-14">
           <span className="bg-orange-500 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block shadow-lg shadow-orange-500/20">{restaurant.status}</span>
           <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-tight mb-6">{restaurant.name}</h1>
           <div className="max-w-2xl bg-black/20 backdrop-blur-md border-l-4 border-orange-500 p-6 rounded-r-2xl">
              <p className="text-slate-100 font-medium italic leading-relaxed">{restaurant.description}</p>
           </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {menu.map((product) => (
          <div key={product.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl flex flex-col h-full group">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <Image src={getImg(product.images[0])} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
              <div className="absolute top-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-xl font-black text-sm">{product.price.toLocaleString()}đ</div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-xl font-black text-slate-900 mb-2 uppercase italic tracking-tight group-hover:text-orange-500 transition-colors">{product.name}</h3>
              <p className="text-xs text-slate-400 font-medium mb-8 line-clamp-2 leading-relaxed italic">{product.description}</p>
              <button 
                onClick={() => {
                  addItem(product, restaurant.name);
                  toast.success(`Đã thêm ${product.name}`, { style: { borderRadius: '15px', fontWeight: 'bold' } });
                }}
                className="mt-auto w-full h-14 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <Plus size={18} strokeWidth={3} />
                Thêm vào đơn
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}