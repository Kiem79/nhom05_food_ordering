"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Star, ShoppingBag, MapPin, Phone, Clock, Mail } from "lucide-react";
import { toast } from "sonner";

// Stores & Data
import restaurantsData from "@/lib/data/stores.json";
import productsData from "@/lib/data/products.json";
import { useCartStore } from "@/store/cartStore";

// Types
import type { Restaurant, Product } from "@/types";

export default function RestaurantDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const { addItem } = useCartStore();

  const restaurants = (restaurantsData.restaurants as Restaurant[]);
  const allProducts = (productsData.products as Product[]);

  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center font-black uppercase italic text-2xl text-slate-400">
        Không tìm thấy quán
      </div>
    );
  }

  const menu: Product[] = allProducts.filter((p) => 
    restaurant.menuIds.includes(p.id)
  );

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    // CẬP NHẬT: Truyền thêm restaurant.name để đồng bộ với cartStore mới
    addItem(product, restaurant.name);
    
    toast.success(`Đã thêm ${product.name}`, {
      icon: <ShoppingBag className="text-orange-500" />,
      style: { borderRadius: '20px', fontWeight: 'bold' }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans selection:bg-orange-100">
      
      {/* --- HERO SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative min-h-125 h-auto rounded-[3.5rem] overflow-hidden mb-12 shadow-2xl shadow-slate-200 border-4 border-white flex items-end"
      >
        <Image
          src={restaurant.images[0]}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <div className="relative z-10 w-full p-8 md:p-14 pt-32">
           <div className="flex gap-3 mb-6">
              <span className="bg-orange-500 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                {restaurant.status}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                {restaurant.category[0]}
              </span>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-tight mb-6">
             {restaurant.name}
           </h1>
           
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="relative max-w-3xl bg-black/30 backdrop-blur-md border-l-4 border-orange-500 p-6 rounded-r-2xl"
           >
              <p className="text-slate-100 font-medium text-base md:text-lg italic leading-relaxed">
                {restaurant.description}
              </p>
           </motion.div>
        </div>
      </motion.div>

      {/* --- QUICK INFO BAR --- */}
      <div className="flex flex-wrap lg:flex-nowrap gap-4 mb-20">
        <div className="flex-2 min-w-75">
           <InfoItem 
            icon={<MapPin size={20}/>} 
            label="Địa điểm" 
            value={restaurant.address} 
            isFullWidth={true} 
           />
        </div>
        <div className="flex-1 min-w-40">
          <InfoItem icon={<Clock size={20}/>} label="Phục vụ" value={restaurant.openingHours} />
        </div>
        <div className="flex-1 min-w-35">
          <InfoItem icon={<Star size={20} className="fill-orange-500 text-orange-500"/>} label="Rating" value={`${restaurant.rating} / 5.0`} />
        </div>
      </div>

      {/* --- MENU GRID --- */}
      <section className="space-y-12 mb-32">
        <div className="flex flex-col gap-2 border-l-8 border-orange-500 pl-6">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter text-slate-900">
            Thực đơn <span className="text-orange-500">Signature</span>
          </h2>
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
            Khám phá {menu.length} món ngon đặc sắc
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {menu.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12 }} 
                transition={{ delay: idx * 0.05, duration: 0.4 }}
              >
                <Link href={`/products/${product.id}`} className="group block h-full">
                  <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl hover:shadow-orange-200/40 transition-all duration-500 flex flex-col h-full relative">
                    <div className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-md border border-slate-50">
                       <p className="text-base font-black text-orange-600 tracking-tight">
                          {product.price.toLocaleString()}đ
                       </p>
                    </div>
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 px-4 py-1.5 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                          {product.category[0]}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-orange-500 transition-colors duration-300 leading-tight mb-3 uppercase italic tracking-tight">
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 line-clamp-2">
                        {product.description}
                      </p>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="mt-auto w-full h-14 bg-slate-900 text-white rounded-[1.2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-orange-500 transition-all active:scale-95 shadow-lg shadow-slate-200"
                      >
                        <Plus size={20} strokeWidth={3} />
                        Thêm vào đơn
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <footer className="border-t-4 border-slate-100 pt-20 pb-10">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div className="space-y-4">
               <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900">
                 Liên hệ <span className="text-orange-500">Đặt bàn</span>
               </h2>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                 Kết nối trực tiếp với nhà hàng qua thông tin chính thức
               </p>
            </div>
            
            <div className="flex flex-wrap gap-6">
               <div className="flex items-center gap-4 bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-50">
                  <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                     <Phone size={24} />
                  </div>
                  <div>
                     <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Hotline hỗ trợ</p>
                     <p className="text-xl font-black text-slate-900 italic tracking-tight">
                        {restaurant.contact?.phone || restaurant.phoneNumber}
                     </p>
                  </div>
               </div>

               <div className="flex items-center gap-4 bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-50">
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                     <Mail size={24} />
                  </div>
                  <div>
                     <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Email liên hệ</p>
                     <p className="text-xl font-black text-slate-900 italic tracking-tight lowercase">
                        {restaurant.contact?.email || `contact@${restaurant.slug}.com`}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}

function InfoItem({ icon, label, value, isFullWidth = false }: { icon: React.ReactNode; label: string; value: string | number; isFullWidth?: boolean }) {
  return (
    <div className="flex items-center gap-5 p-6 rounded-[2.5rem] bg-white border border-slate-50 shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 mb-0.5">{label}</p>
        <p className={`text-sm font-bold text-slate-900 ${isFullWidth ? "whitespace-normal" : "truncate"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}