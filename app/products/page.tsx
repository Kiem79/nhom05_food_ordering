"use client";

import React, { useState, useEffect } from "react";
import useProductStore from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
// FIX 1: Import đúng interface Product từ types
import type { Product } from "@/types"; 
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ProductsPage() {
  const { products } = useProductStore();
  const { addItem } = useCartStore();

  const categories = ["Tất cả", "Cơm", "Bún/Phở", "Ăn vặt", "Đồ uống"];
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [mounted, setMounted] = useState(false);

  // Tránh lỗi Hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // FIX 2: Đảm bảo p.category tồn tại và so sánh chuẩn xác
  const filteredProducts =
    activeTab === "Tất cả"
      ? products
      : products.filter((p) => p.category.includes(activeTab));

  const handleAddToCart = (product: Product) => {
    // FIX 3: Chuyển đổi format nếu addItem yêu cầu CartItem cụ thể
    addItem({
      ...product,
      quantity: 1
    } as any); 
    
    toast.success(`Đã thêm ${product.name}`, {
      icon: <ShoppingBag className="text-primary" />,
    });
  };

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-transparent dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      {/* HEADER */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Breadcrumbs />
          <h1 className="text-5xl font-black text-primary dark:text-white uppercase italic tracking-tighter">
            Thực đơn <span className="text-primary dark:text-orange-500">Foodie.</span>
          </h1>
          <p className="text-secondary dark:text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
            {filteredProducts.length} Món ăn đã sẵn sàng phục vụ bạn
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-secondary/10 dark:bg-slate-900 p-1.5 rounded-foodie overflow-x-auto border border-transparent dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-foodie text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === cat
                  ? "bg-white dark:bg-orange-500 text-primary dark:text-white shadow-sm"
                  : "text-secondary dark:text-slate-400 hover:text-primary dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group bg-white dark:bg-slate-900 rounded-foodie p-4 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-full hover:shadow-xl dark:hover:shadow-orange-500/10 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-foodie mb-6 bg-slate-100 dark:bg-slate-800">
                <Image
                  src={product.images?.[0] || "/placeholder-food.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-foodie flex items-center gap-1 backdrop-blur-sm">
                  <Star className="text-primary dark:text-orange-500 fill-primary dark:fill-orange-500" size={10} />
                  <span className="text-[9px] font-black text-primary dark:text-white">
                    4.9
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-1 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[8px] font-black text-primary dark:text-orange-500 uppercase tracking-widest italic">
                    {product.category}
                  </span>
                  <p className="text-sm font-black text-primary dark:text-white italic">
                    {product.price.toLocaleString()}đ
                  </p>
                </div>

                <h3 className="text-base font-black text-primary dark:text-white mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-[10px] text-secondary dark:text-slate-500 mb-6 line-clamp-2">
                  {product.description}
                </p>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-auto w-full h-12 bg-primary dark:bg-orange-500 text-white rounded-foodie font-black text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:opacity-90 dark:hover:bg-white dark:hover:text-primary transition-all active:scale-95"
                >
                  <Plus size={14} /> Thêm vào giỏ
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}