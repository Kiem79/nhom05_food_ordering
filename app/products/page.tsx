"use client";

import React, { useState } from "react";
import useProductStore from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Star, ShoppingBag, Search } from "lucide-react";
import { toast } from "sonner";

export default function ProductsPage() {
  const { products } = useProductStore();
  const { addItem } = useCartStore();
  
  // State quản lý lọc danh mục
  const categories = ["Tất cả", "Cơm", "Bún/Phở", "Ăn vặt", "Đồ uống"];
  const [activeTab, setActiveTab] = useState("Tất cả");

  const filteredProducts = activeTab === "Tất cả" 
    ? products 
    : products.filter(p => p.category === activeTab);

  const handleAddToCart = (product: any) => {
    addItem(product);
    toast.success(`Đã thêm ${product.name}`, {
      icon: <ShoppingBag className="text-orange-500" />,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* HEADER TRANG */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter">
            Thực đơn <span className="text-orange-500">Foodie.</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            {filteredProducts.length} Món ăn đã sẵn sàng phục vụ bạn 
          </p>
        </div>

        {/* TABS LỌC (CỰC NGĂN NẮP) */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === cat 
                ? "bg-white text-orange-500 shadow-sm" 
                : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID SẢN PHẨM */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={product.id}
              className="group bg-white rounded-[2rem] p-4 border border-slate-50 shadow-xl shadow-slate-100/50 flex flex-col h-full"
            >
              {/* Image Container: Cố định tỷ lệ 4:3 để luôn đều nhau */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="text-orange-500 fill-orange-500" size={10} />
                  <span className="text-[9px] font-black text-slate-900">4.9</span>
                </div>
              </div>

              {/* Nội dung Card */}
              <div className="px-1 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest italic leading-none">
                    {product.category}
                  </span>
                  <p className="text-sm font-black text-orange-600 italic leading-none">
                    {product.price.toLocaleString()}đ
                  </p>
                </div>
                
                <h3 className="text-base font-black text-slate-900 leading-tight mb-2 min-h-[2.5rem] line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-[10px] text-slate-400 font-medium leading-relaxed mb-6 line-clamp-2">
                  {product.description}
                </p>

                {/* Nút bấm ở cuối Card */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-auto w-full h-12 bg-slate-900 text-white rounded-xl font-black text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-orange-500 transition-all active:scale-95"
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