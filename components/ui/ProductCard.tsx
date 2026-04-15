"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock } from "lucide-react";
import type { Restaurant } from "@/types";

const basePath = "/nhom05_food_ordering";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  if (!restaurant) return null;

  const imageUrl = restaurant.images?.[0] || "/images/restaurant-placeholder.jpg";
  
  const finalImageSrc = imageUrl.startsWith("http") 
    ? imageUrl 
    : `${basePath}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;

  return (
    <Link href={`/restaurants/${restaurant.id}`} className="group block h-full">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none hover:shadow-2xl hover:shadow-orange-100/50 dark:hover:shadow-orange-950/20 transition-all duration-500 flex flex-col h-full">
        
        {/* IMAGE SECTION */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-slate-800">
          <Image
            src={finalImageSrc}
            alt={restaurant.name || "Restaurant"}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            unoptimized={true}
          />
          <div className="absolute top-4 left-4 flex gap-2">
             <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl flex items-center gap-1 shadow-sm border border-transparent dark:border-slate-800">
                <Star size={12} className="text-orange-500 fill-orange-500" />
                <span className="text-[10px] font-black text-slate-900 dark:text-white">{restaurant.rating || 0}</span>
             </div>
          </div>
          <div className="absolute top-4 right-4 bg-slate-900/80 dark:bg-orange-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">
            {restaurant.status || "ĐANG MỞ CỬA"}
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="p-8 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-4 gap-2">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter group-hover:text-orange-500 transition-colors leading-tight">
              {restaurant.name}
            </h3>
            <span className="text-orange-500 dark:text-orange-400 font-black text-xs whitespace-nowrap">
              ~{restaurant.averagePrice?.toLocaleString() || 0}đ
            </span>
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mb-6 line-clamp-2 leading-relaxed italic">
            {restaurant.description}
          </p>

          <div className="mt-auto space-y-3 border-t border-slate-50 dark:border-slate-800 pt-6">
            <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
              <MapPin size={14} className="text-orange-500 shrink-0" />
              <span className="text-[10px] font-bold truncate">{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
              <Clock size={14} className="text-orange-500 shrink-0" />
              <span className="text-[10px] font-bold">{restaurant.openingHours}</span>
            </div>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mt-6">
            {restaurant.category?.slice(0, 3).map((cat, idx) => (
              <span key={idx} className="bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border border-transparent dark:border-slate-700">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}