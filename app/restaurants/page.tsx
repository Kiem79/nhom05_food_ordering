"use client";

import React, { useMemo, useState } from "react";
import restaurantsData from "@/lib/data/stores.json";
import productsData from "@/lib/data/products.json";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Clock, ChevronRight } from "lucide-react"; // Đổi sang ChevronRight
import type { Restaurant, Product } from "@/types";

export default function RestaurantsPage() {
  const restaurants = restaurantsData.restaurants as Restaurant[];
  const products = productsData.products as Product[];

  const categories = [
    "Tất cả",
    ...Array.from(new Set(products.flatMap((p) => p.category))),
  ];

  const [activeTab, setActiveTab] = useState("Tất cả");
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái đóng mở thanh category

  const filteredRestaurants = useMemo(() => {
    if (activeTab === "Tất cả") return restaurants;

    return restaurants.filter((restaurant) => {
      const menuProducts = products.filter((p) =>
        restaurant.menuIds.includes(p.id)
      );

      return menuProducts.some((p) =>
        p.category.includes(activeTab)
      );
    });
  }, [activeTab, restaurants, products]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="mb-12 flex flex-col gap-6">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tight">
            Chọn quán <span className="text-orange-500">Foodie.</span>
          </h1>

          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            {filteredRestaurants.length} quán phù hợp
          </p>
        </div>

        {/* CATEGORY FILTER - Đổi sang bên trái, đẩy từ trái sang phải */}
        <div className="flex justify-start items-center gap-2">
          <motion.div 
            initial={false}
            animate={{ width: isExpanded ? "100%" : "auto" }}
            className="flex bg-slate-100 p-1.5 rounded-2xl overflow-hidden shadow-inner items-center"
          >
            {/* MŨI TÊN CAM ĐIỀU KHIỂN - NẰM BÊN TRÁI */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="shrink-0 p-2.5 bg-orange-500 rounded-xl text-white shadow-lg shadow-orange-200 transition-transform active:scale-95 mr-1"
            >
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                <ChevronRight size={16} strokeWidth={3} />
              </motion.div>
            </button>

            {/* HIỂN THỊ TAB ĐANG CHỌN KHI ĐÓNG */}
            {!isExpanded && (
              <span className="px-5 py-2.5 text-[10px] font-black uppercase text-orange-500 bg-white rounded-xl shadow-sm whitespace-nowrap">
                {activeTab}
              </span>
            )}

            {/* DANH SÁCH CATEGORY - ĐẨY RA TỪ TRÁI SANG PHẢI */}
            <div className={`flex gap-1 overflow-x-auto no-scrollbar transition-all duration-500 ${isExpanded ? "opacity-100 w-full ml-1" : "w-0 opacity-0 invisible"}`}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeTab === cat
                      ? "bg-white text-orange-500 shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* RESTAURANTS GRID */}
      <div className="relative min-h-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              },
              exit: { 
                opacity: 0, 
                x: -20, 
                transition: { duration: 0.2 } 
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredRestaurants.map((restaurant) => {
              const menuProducts = products.filter((p) =>
                restaurant.menuIds.includes(p.id)
              );

              const allCategories = [
                ...new Set(menuProducts.flatMap((p) => p.category)),
              ];

              return (
                <motion.div
                  key={restaurant.id}
                  variants={{
                    hidden: { opacity: 0, x: 50 }, 
                    visible: { 
                      opacity: 1, 
                      x: 0, 
                      transition: { type: "spring", damping: 20, stiffness: 100 } 
                    }
                  }}
                >
                  <Link href={`/restaurants/${restaurant.id}`}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-orange-100/40 transition-all duration-300 h-full"
                    >
                      {/* IMAGE */}
                      <div className="relative aspect-4/3 w-full overflow-hidden">
                        <Image
                          src={restaurant.images[0]}
                          alt={restaurant.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-2 shadow-lg">
                          <Star
                            size={14}
                            className="text-orange-500 fill-orange-500"
                          />
                          <span className="text-[12px] font-black text-slate-900">
                            {restaurant.rating}
                          </span>
                        </div>

                        <div className="absolute top-4 right-4 bg-zinc-900/40 backdrop-blur-md text-white px-3 py-1.5 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-2xl border border-white/10">
                          {restaurant.status}
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="p-5 flex flex-col h-full">
                        <div className="flex justify-between items-start gap-3">
                          <h3 className="text-lg font-black text-slate-900 line-clamp-1 uppercase tracking-tight">
                            {restaurant.name}
                          </h3>

                          <span className="text-sm font-black text-orange-500 whitespace-nowrap">
                            ~{restaurant.averagePrice.toLocaleString()}đ
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-5">
                          {restaurant.description}
                        </p>

                        {/* ADDRESS + HOURS */}
                        <div className="mt-4 space-y-2 text-xs text-slate-500">
                          <div className="flex items-center gap-2">
                            <MapPin size={14} />
                            <span className="line-clamp-1">
                              {restaurant.address}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>{restaurant.openingHours}</span>
                          </div>
                        </div>

                        {/* MENU CATEGORIES */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {allCategories.slice(0, 3).map((cat) => (
                            <span
                              key={cat}
                              className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-[9px] font-black uppercase"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>

                        {/* BADGES */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {restaurant.badges.map((badge) => (
                            <span
                              key={badge}
                              className="px-2 py-1 bg-orange-50 text-orange-500 rounded-full text-[9px] font-black uppercase"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>

                        {/* TAGS */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {restaurant.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] text-slate-400 font-bold"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}