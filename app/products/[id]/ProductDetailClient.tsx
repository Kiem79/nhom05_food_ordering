"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Sparkles,
  Leaf,
} from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import productsData from "@/lib/data/products.json";
import storesData from "@/lib/data/stores.json";

import type { Product, Restaurant } from "@/types";

interface ProductDetailClientProps {
  id: string;
}

const basePath = "/nhom05_food_ordering";

export default function ProductDetailClient({
  id,
}: ProductDetailClientProps) {
  const { addItem } = useCartStore();

  const products = productsData.products as Product[];
  const restaurants = storesData.restaurants as Restaurant[];

  const product = products.find((item) => String(item.id) === String(id));

  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const getImg = (src?: string) => {
    if (!src) return `${basePath}/placeholder-food.jpg`;

    return src.startsWith("http")
      ? src
      : `${basePath}${src.startsWith("/") ? "" : "/"}${src}`;
  };

  if (!product) {
    return (
      <div className="py-20 text-center font-black uppercase italic text-slate-400 dark:text-slate-600">
        Món ăn không tồn tại
      </div>
    );
  }

  const restaurant = restaurants.find((store) =>
    store.menuIds.includes(product.id)
  );

  const relatedProducts = products.filter((item) =>
    product.relatedIds?.includes(item.id)
  );

  const handleAddToCart = () => {
    const restaurantName = restaurant?.name || "Foodie Restaurant";

    for (let i = 0; i < quantity; i++) {
      addItem(product, restaurantName);
    }

    toast.success(`Đã thêm ${quantity} món vào đơn hàng`, {
      icon: <ShoppingBag className="text-orange-500" />,
      style: {
        borderRadius: "20px",
        fontWeight: "bold",
      },
    });
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 pb-20 transition-colors duration-500">
      {/* Background */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:invert" />

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* DETAIL */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-12">
          {/* LEFT */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-4/3 rounded-[3rem] overflow-hidden shadow-2xl shadow-orange-100 dark:shadow-black/50 border-4 border-white dark:border-slate-900"
            >
              <Image
                src={getImg(product.images?.[0])}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
                unoptimized
              />

              <button
                onClick={() => setIsLiked((prev) => !prev)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg active:scale-75 transition-all"
              >
                <Heart
                  className={`transition-colors ${
                    isLiked
                      ? "fill-red-500 text-red-500"
                      : "text-slate-300 dark:text-slate-600"
                  }`}
                  size={22}
                />
              </button>
            </motion.div>

            {/* QUANTITY */}
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-2 rounded-3xl border border-slate-100 dark:border-slate-800">
                <span className="ml-6 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Số lượng
                </span>

                <div className="flex items-center gap-6 bg-white dark:bg-slate-800 rounded-2xl p-1.5 shadow-sm border border-slate-50 dark:border-slate-700">
                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.max(1, prev - 1))
                    }
                    className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors text-slate-400 hover:text-orange-500"
                  >
                    <Minus size={18} strokeWidth={3} />
                  </button>

                  <span className="text-xl font-black w-6 text-center text-slate-900 dark:text-white">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors text-orange-500"
                  >
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="group relative w-full h-20 bg-slate-900 dark:bg-orange-500 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-orange-500 dark:hover:bg-orange-600 transition-all active:scale-[0.98] shadow-2xl shadow-slate-200 dark:shadow-none overflow-hidden"
              >
                <ShoppingBag
                  size={22}
                  className="group-hover:rotate-12 transition-transform"
                />
                Thêm vào đơn • {(product.price * quantity).toLocaleString()}đ
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            <div>
              <p className="text-orange-500 dark:text-orange-400 font-black uppercase tracking-[0.2em] text-xs mb-3 flex items-center gap-2">
                <Sparkles size={14} />
                {product.category?.[0] || "Món ăn"}
              </p>

              <h1 className="text-5xl font-black text-slate-900 dark:text-white leading-[1.1] mb-4 uppercase italic tracking-tighter">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-3xl font-black text-orange-500 dark:text-orange-400 tracking-tight">
                  {product.price.toLocaleString()}đ
                </p>

                {restaurant && (
                  <>
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
                    <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      Quán:{" "}
                      <span className="text-slate-900 dark:text-slate-200">
                        {restaurant.name}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl shadow-slate-100 dark:shadow-none border border-slate-50 dark:border-slate-800">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-4">
                Mô tả món ăn
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-lg">
                {product.description}
              </p>
            </div>

            {/* NUTRITION */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xl shadow-slate-100 dark:shadow-none border border-slate-100 dark:border-slate-800">
              <h2 className="font-black text-slate-900 dark:text-white mb-4 uppercase italic tracking-widest text-xs">
                Giá trị dinh dưỡng
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Calo", value: product.calories, unit: "" },
                  { label: "Protein", value: product.protein, unit: "g" },
                  { label: "Carbs", value: product.carbs, unit: "g" },
                  { label: "Fat", value: product.fat, unit: "g" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-orange-50 dark:bg-orange-500/10 rounded-2xl p-4 text-center"
                  >
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">
                      {item.label}
                    </p>
                    <p className="text-xl font-black text-orange-500 dark:text-orange-400">
                      {item.value}
                      {item.unit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* INGREDIENTS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-24 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-orange-400 dark:from-orange-500 dark:to-orange-700 rounded-[2.5rem] shadow-2xl shadow-orange-200 dark:shadow-none" />
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl border border-white/30">
              <Leaf className="text-white" size={40} />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                Thành phần chi tiết
              </h3>
              <h2 className="text-white text-2xl md:text-3xl font-black uppercase italic tracking-tight leading-tight">
                {product.ingredients}
              </h2>
            </div>
          </div>
        </motion.div>

        {/* RELATED */}
        <div className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
              Món liên <span className="text-orange-500">quan</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-5 border border-slate-50 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:shadow-orange-100 transition-all duration-500"
              >
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-5">
                  <Image
                    src={getImg(item.images?.[0])}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                </div>

                <h3 className="font-black text-slate-900 dark:text-white uppercase italic text-sm line-clamp-1 mb-2 px-2">
                  {item.name}
                </h3>

                <p className="text-orange-500 dark:text-orange-400 font-black px-2">
                  {item.price.toLocaleString()}đ
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}