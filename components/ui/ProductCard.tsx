// components/ui/RestaurantCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock } from "lucide-react";
import type { Restaurant } from "@/types";

const basePath = "/nhom05_food_ordering";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  // 1. CÂU LỆNH "CỨU MẠNG": Nếu không có dữ liệu quán, không vẽ gì cả để tránh crash app
  if (!restaurant) return null;

  // 2. Sử dụng Optional Chaining (?) để an toàn tuyệt đối
  const imageUrl = restaurant.images?.[0] || "/images/restaurant-placeholder.jpg";
  
  const finalImageSrc = imageUrl.startsWith("http") 
    ? imageUrl 
    : `${basePath}${imageUrl}`;

  return (
    <Link href={`/restaurants/${restaurant.id}`} className="group">
      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-50 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500">
        
        {/* IMAGE SECTION */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={finalImageSrc}
            alt={restaurant.name || "Restaurant"}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            unoptimized={true}
          />
          <div className="absolute top-4 left-4 flex gap-2">
             <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                <Star size={12} className="text-orange-500 fill-orange-500" />
                <span className="text-[10px] font-black text-slate-900">{restaurant.rating || 0}</span>
             </div>
          </div>
          <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
            {restaurant.status || "Đang cập nhật"}
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter group-hover:text-orange-500 transition-colors">
              {restaurant.name}
            </h3>
            <span className="text-orange-500 font-black text-sm">
              ~{restaurant.averagePrice?.toLocaleString() || 0}đ
            </span>
          </div>

          <p className="text-xs text-slate-400 font-medium mb-6 line-clamp-2 leading-relaxed italic">
            {restaurant.description}
          </p>

          <div className="space-y-3 border-t border-slate-50 pt-6">
            <div className="flex items-center gap-3 text-slate-400">
              <MapPin size={14} className="text-orange-500" />
              <span className="text-[11px] font-bold truncate">{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Clock size={14} className="text-orange-500" />
              <span className="text-[11px] font-bold">{restaurant.openingHours}</span>
            </div>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mt-6">
            {restaurant.category?.map((cat, idx) => (
              <span key={idx} className="bg-slate-50 text-slate-400 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}