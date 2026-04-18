"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Star,
  ShoppingBag,
  MapPin,
  Phone,
  Clock,
  Mail,
  Flame,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";

import restaurantsData from "@/lib/data/stores.json";
import productsData from "@/lib/data/products.json";
import { useCartStore } from "@/store/cartStore";

import type { Restaurant, Product } from "@/types";

const basePath = "/nhom05_food_ordering";

interface RestaurantContentProps {
  id: string;
  actualRating: string;
  totalReviews: number;
}

export default function RestaurantContent({
  id,
  actualRating,
  totalReviews,
}: RestaurantContentProps) {
  const { addItem } = useCartStore();

  const restaurants = restaurantsData.restaurants as Restaurant[];
  const allProducts = productsData.products as Product[];

  const restaurant = restaurants.find(
    (r) => String(r.id) === String(id)
  );

  const getImg = (src: string) =>
    src.startsWith("http")
      ? src
      : `${basePath}${src.startsWith("/") ? "" : "/"}${src}`;

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-black uppercase italic text-2xl text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-950">
        Không tìm thấy quán
        <Link
          href="/restaurants"
          className="mt-6 text-sm text-orange-500 border-b-2 border-orange-500"
        >
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const menu: Product[] = allProducts.filter((product) =>
    restaurant.menuIds.includes(product.id)
  );

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(product, restaurant.name);

    toast.success(`Đã thêm ${product.name}`, {
      icon: <ShoppingBag className="text-orange-500" />,
      style: {
        borderRadius: "20px",
        fontWeight: "bold",
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans bg-white dark:bg-slate-950 selection:bg-orange-100 dark:selection:bg-orange-500/30 transition-colors duration-500">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative min-h-[500px] h-auto rounded-[3.5rem] overflow-hidden mb-12 shadow-2xl shadow-slate-200 dark:shadow-black/40 border-4 border-white dark:border-slate-900 flex items-end"
      >
        <Image
          src={getImg(restaurant.images[0])}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />

        <div className="relative z-10 w-full p-8 md:p-14 pt-32">
          <div className="flex gap-3 mb-6 flex-wrap">
            <span className="bg-orange-500 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              {restaurant.status}
            </span>

            {restaurant.category?.[0] && (
              <span className="bg-white/20 backdrop-blur-md text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
                {restaurant.category[0]}
              </span>
            )}
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

      {/* INFO BAR */}
      <div className="flex flex-wrap lg:flex-nowrap gap-4 mb-20">
        <div className="flex-2 min-w-[300px]">
          <InfoItem
            icon={<MapPin size={20} />}
            label="Địa điểm"
            value={restaurant.address}
            isFullWidth
          />
        </div>

        <div className="flex-1 min-w-[180px]">
          <InfoItem
            icon={<Clock size={20} />}
            label="Phục vụ"
            value={restaurant.openingHours}
          />
        </div>

        <Link href={`/restaurants/${id}/review`} className="flex-1 min-w-[160px] group">
          <div className="flex items-center gap-5 p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 shadow-sm hover:border-orange-500 hover:shadow-lg transition-all h-full relative overflow-hidden">
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 shrink-0 group-hover:scale-110 transition-transform">
              <Star size={20} className="fill-orange-500 text-orange-500" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-0.5">
                Rating ({totalReviews})
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                {actualRating} / 5.0
                <ArrowUpRight size={14} className="text-orange-500 opacity-0 group-hover:opacity-100 transition-all" />
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* MENU */}
      <section className="space-y-12 mb-32">
        <div className="flex flex-col gap-2 border-l-8 border-orange-500 pl-6">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white">
            Thực đơn <span className="text-orange-500">Signature</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">
            Khám phá {menu.length} món ngon đặc sắc
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {menu.map((product, idx) => {
              const isPopular =
                restaurant.popularProductIds?.includes(product.id);

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -12 }}
                  transition={{
                    delay: idx * 0.05,
                    duration: 0.4,
                  }}
                  className="relative"
                >
                  {isPopular && (
                    <motion.div
                      className="absolute -top-5 -left-5 z-30"
                      animate={{
                        rotate: [-2, 2, -2],
                        y: [0, -1, 0],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 border-4 border-white dark:border-slate-900 shadow-lg shadow-orange-200 dark:shadow-orange-900/40 flex items-center justify-center">
                        <Flame
                          size={25}
                          className="fill-white text-white"
                        />
                      </div>
                    </motion.div>
                  )}

                  <Link
                    href={`/products/${product.id}`}
                    className="group block h-full"
                  >
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-black/30 hover:shadow-2xl hover:shadow-orange-200/40 dark:hover:shadow-orange-900/20 transition-all duration-500 flex flex-col h-full relative">
                      <div className="absolute top-6 right-6 z-20 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-md border border-slate-50 dark:border-slate-700">
                        <p className="text-base font-black text-orange-600 dark:text-orange-400 tracking-tight">
                          {product.price.toLocaleString()}đ
                        </p>
                      </div>

                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={getImg(product.images[0])}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          unoptimized
                        />
                      </div>

                      <div className="p-8 flex flex-col flex-1">
                        <div className="mb-4">
                          {product.category?.[0] && (
                            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 dark:bg-orange-500/10 dark:text-orange-400 px-4 py-1.5 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                              {product.category[0]}
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300 leading-tight mb-3 uppercase italic tracking-tight">
                          {product.name}
                        </h3>

                        <p className="text-sm text-slate-400 dark:text-slate-500 font-medium leading-relaxed mb-8 line-clamp-2">
                          {product.description}
                        </p>

                        <button
                          onClick={(e) =>
                            handleAddToCart(e, product)
                          }
                          className="mt-auto w-full h-14 bg-slate-900 dark:bg-orange-500 text-white rounded-[1.2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-orange-500 dark:hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none"
                        >
                          <Plus size={20} strokeWidth={3} />
                          Thêm vào đơn
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* CONTACT */}
      <footer className="border-t-4 border-slate-100 dark:border-slate-800 pt-20 pb-10">
        <div className="flex flex-wrap gap-8 justify-between items-start">
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white">
              Liên hệ <span className="text-orange-500">Đặt bàn</span>
            </h2>
            <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              Kết nối trực tiếp với nhà hàng
            </p>
          </div>

          <div className="flex flex-row flex-wrap gap-8">
            <ContactCard
              icon={<Phone size={28} />}
              label="Gọi điện ngay"
              value={
                restaurant.contact?.phone ||
                restaurant.phoneNumber
              }
              href={`tel:${
                restaurant.contact?.phone ||
                restaurant.phoneNumber
              }`}
              orange
            />

            <ContactCard
              icon={<Mail size={28} />}
              label="Email liên hệ"
              value={
                restaurant.contact?.email ||
                `contact@${restaurant.slug}.com`
              }
              href={`mailto:${
                restaurant.contact?.email ||
                `contact@${restaurant.slug}.com`
              }`}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
  isFullWidth = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  isFullWidth?: boolean;
}) {
  return (
    <div className="flex items-center gap-5 p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-black/20 transition-shadow h-full">
      <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-0.5">
          {label}
        </p>
        <p
          className={`text-sm font-bold text-slate-900 dark:text-white ${
            isFullWidth ? "whitespace-normal" : "truncate"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  orange = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  orange?: boolean;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05, y: -5 }}
      className="flex items-center gap-6 bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-2xl dark:shadow-black/30 border border-white dark:border-slate-800 relative overflow-hidden group cursor-pointer min-w-[320px]"
    >
      <div
        className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform duration-500 ${
          orange ? "bg-orange-500" : "bg-slate-900 dark:bg-slate-800"
        }`}
      >
        {icon}
      </div>

      <div>
        <p
          className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${
            orange
              ? "text-orange-500"
              : "text-slate-400 dark:text-slate-500"
          }`}
        >
          {label}
        </p>
        <p className="text-xl font-black text-slate-900 dark:text-white italic tracking-tighter lowercase">
          {value}
        </p>
      </div>
    </motion.a>
  );
}