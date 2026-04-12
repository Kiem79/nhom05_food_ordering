"use client";

import React, { useEffect, useState } from "react";
import data from '@/lib/data.json';
import { Button } from '@/components/ui/button';
import { Plus, ShoppingCart, ArrowRight, Star } from 'lucide-react';
import { useCartStore } from "@/store/cartStore"; 
import { toast } from "sonner";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function ProductsPage() {
  const { addItem, items } = useCartStore() as any;
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
  const timer = setTimeout(() => {
    setIsMounted(true);
  }, 0);

  return () => clearTimeout(timer);
}, []);

  const totalItems = items?.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0) || 0;

  const handleAddToCart = (product: any) => {
    addItem(product);
    toast.success(`Đã thêm ${product.name} vào đơn nhóm!`);
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto min-h-screen relative animate-in fade-in duration-500">
      
      {/* THANH ĐIỀU HƯỚNG */}
      <Breadcrumbs />

      {/* HEADER SECTION */}
      <div className="mb-12 space-y-2">
        <div className="flex items-center gap-2 text-orange-500 font-black text-xs uppercase tracking-[0.3em]">
          <span className="w-10 h-[2px] bg-orange-500"></span>
          HCMUTE Foodie
        </div>
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase">
          Thực đơn <span className="text-orange-500">hôm nay</span>
        </h2>
        <p className="text-slate-500 font-medium italic">Chọn món và gom đơn cùng đồng đội nào!</p>
      </div>

      {/* GRID DANH SÁCH MÓN ĂN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.products.map((p: any) => (
          <div key={p.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 group hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col h-full">
            {/* Ảnh món ăn */}
            <div className="relative h-56 overflow-hidden">
              <img 
                src={p.image} 
                alt={p.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-black text-white bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full uppercase tracking-widest">
                  {p.category}
                </span>
              </div>
            </div>

            {/* Nội dung Card */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                <Star size={12} fill="currentColor" />
                <span className="text-[10px] font-bold text-slate-400 tracking-tighter">4.8 (100+ đơn hàng)</span>
              </div>
              
              <h3 className="font-black text-xl text-slate-900 leading-tight mb-4 group-hover:text-orange-500 transition-colors line-clamp-2">
                {p.name}
              </h3>
              
              <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Giá bán</span>
                  <span className="text-2xl font-black text-slate-900 leading-none tracking-tighter">
                    {p.price.toLocaleString('en-US').replace(/,/g, '.')}đ
                  </span>
                </div>
                
                <Button 
                  onClick={() => handleAddToCart(p)}
                  size="icon" 
                  className="w-12 h-12 rounded-2xl bg-slate-900 hover:bg-orange-500 hover:scale-110 active:scale-95 transition-all shadow-lg flex items-center justify-center shrink-0"
                >
                  <Plus className="w-6 h-6 text-white" strokeWidth={3} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NÚT GIỎ HÀNG NỔI (Chỉ hiển thị khi đã mounted và có món) */}
      {isMounted && totalItems > 0 && (
        <div className="fixed bottom-10 right-10 z-50">
          <Link href="/group-order">
            <button className="flex items-center gap-5 bg-orange-500 text-white p-2 pr-10 rounded-full shadow-[0_20px_50px_rgba(249,115,22,0.4)] hover:scale-105 transition-all border-4 border-white animate-in slide-in-from-bottom-10">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-orange-500 relative shadow-inner">
                <ShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-0.5">Giỏ hàng của Mạnh</p>
                <p className="text-sm font-black flex items-center gap-2 uppercase">XEM ĐƠN NHÓM <ArrowRight size={16} /></p>
              </div>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}