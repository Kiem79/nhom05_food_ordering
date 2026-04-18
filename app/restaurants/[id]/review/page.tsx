"use client";

import React, { useState, useMemo, use } from "react";
import Link from "next/link";
import { ChevronRight, Star, MessageSquare, BarChart3, Users, Home, Filter, ArrowUpDown, PieChart } from "lucide-react";
import * as ReviewsData from "@/lib/data/review";
import restaurantsData from "@/lib/data/stores.json";
import ReviewCard from "@/components/ui/ReviewCard";
import { motion, AnimatePresence } from "framer-motion";
import type { Restaurant, Review } from "@/types";

interface ReviewPageProps {
  params: Promise<{ id: string }>;
}

type SortOption = "latest" | "oldest" | "high-to-low" | "low-to-high";

export default function ReviewPage({ params }: ReviewPageProps) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  const { restaurant, allReviews } = useMemo(() => {
    const res = (restaurantsData.restaurants as Restaurant[]).find((r) => String(r.id) === id);
    const reviewKey = `REVIEWS_RESTAURANT_${id}` as keyof typeof ReviewsData;
    const rawReviews = ReviewsData[reviewKey];
    const revs = (Array.isArray(rawReviews) ? rawReviews : []) as Review[];
    return { restaurant: res, allReviews: revs };
  }, [id]);

  const distribution = useMemo(() => {
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: allReviews.filter((r) => r.rating === star).length,
    }));
  }, [allReviews]);

  const totalReviews = allReviews.length;
  const averageRating = useMemo(() => {
    return totalReviews > 0
      ? (allReviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
      : "0.0";
  }, [allReviews, totalReviews]);

  const sortedReviews = useMemo(() => {
    const data = [...allReviews];
    switch (sortBy) {
      case "latest":
        return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case "oldest":
        return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case "high-to-low":
        return data.sort((a, b) => b.rating - a.rating);
      case "low-to-high":
        return data.sort((a, b) => a.rating - b.rating);
      default:
        return data;
    }
  }, [allReviews, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-3 mb-10 overflow-x-auto no-scrollbar pb-2">
        <Link href="/" className="text-slate-400 hover:text-orange-500 transition-colors shrink-0">
          <Home size={16} />
        </Link>
        <ChevronRight size={14} className="text-slate-300 shrink-0" />
        <Link href="/restaurants" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors shrink-0">
          Nhà hàng
        </Link>
        <ChevronRight size={14} className="text-slate-300 shrink-0" />
        <Link href={`/restaurants/${id}`} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors truncate max-w-37.5">
          {restaurant?.name}
        </Link>
        <ChevronRight size={14} className="text-slate-300 shrink-0" />
        <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 shrink-0 italic underline underline-offset-4">Đánh giá</span>
      </nav>

      {/* HEADER & SCORE SECTION */}
      <div className="flex flex-col lg:flex-row justify-between gap-12 mb-8 items-start lg:items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="relative flex-1"
        >
          <h1 className="text-7xl md:text-9xl font-[1000] italic tracking-tighter leading-[0.85] flex flex-col">
            <span className="text-slate-900 dark:text-white uppercase">ĐÁNH GIÁ</span>
            <span className="text-orange-500 uppercase drop-shadow-[0_10px_10px_rgba(249,115,22,0.2)]">FOODIE</span>
          </h1>
          <div className="flex items-center gap-4 mt-6">
            <div className="h-1.5 w-24 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
            <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.4em] text-[10px]">Verified Experience Platform</p>
          </div>
        </motion.div>

        {/* SQUARE SCORE CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group self-center lg:self-auto"
        >
          <div className="absolute -inset-6 bg-orange-500/10 rounded-[4.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative bg-slate-900 border-8p border-white dark:border-slate-800 w-65 h-70 rounded-[4.5rem] text-white flex flex-col items-center justify-center shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2">
            <div className="absolute top-8 inset-x-0 flex flex-col items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-1">SCORE</span>
            </div>
            
            <div className="flex items-end justify-center mt-4">
              <span className="text-8xl font-black tracking-tighter leading-none bg-linear-to-b from-white to-slate-400 bg-clip-text text-transparent">
                {averageRating}
              </span>
              <span className="text-2xl font-black text-orange-500 ml-1 mb-2">/5</span>
            </div>
            
            <div className="flex gap-2 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={`${i < Math.round(Number(averageRating)) ? "fill-orange-500 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]" : "text-slate-700"}`} />
              ))}
            </div>
            
            <div className="absolute bottom-10 flex items-center gap-2.5 opacity-60">
              <Users size={14} className="text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{totalReviews} VERIFIED USERS</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* HORIZONTAL FILTER BAR */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 p-2 rounded-[2rem] mb-12 flex flex-wrap items-center justify-between gap-4 shadow-xl border border-slate-800"
      >
        <div className="items-center gap-4 px-6 py-2 text-white font-black uppercase tracking-widest text-[10px] border-r border-slate-800 hidden md:flex">
          <Filter size={16} className="text-orange-500" />
          Bộ lọc
        </div>
        <div className="flex flex-1 flex-wrap gap-2">
          {[
            { label: "Mới nhất", value: "latest" },
            { label: "Cũ nhất", value: "oldest" },
            { label: "Đánh giá cao", value: "high-to-low" },
            { label: "Đánh giá thấp", value: "low-to-high" }
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSortBy(opt.value as SortOption)}
              className={`flex-1 min-w-30 px-4 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                sortBy === opt.value
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-[1.02]"
                  : "bg-slate-800/40 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {opt.label}
              {sortBy === opt.value && <ArrowUpDown size={12} className="animate-pulse" />}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* SIDEBAR - CREATIVE ANALYTICS */}
        <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 border-[3px] border-slate-100 dark:border-slate-800 p-8 rounded-[3.5rem] relative overflow-hidden group/chart shadow-xl dark:shadow-2xl"
          >
            {/* Background Decorative Icon */}
            <div className="absolute -top-6 -right-6 opacity-[0.03] dark:opacity-[0.05] rotate-12 group-hover/chart:rotate-0 transition-transform duration-700">
               <PieChart size={200} className="text-slate-900 dark:text-white" />
            </div>

            <div className="flex items-center justify-between mb-10 relative z-10">
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                <div className="p-2.5 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-500/20">
                  <BarChart3 size={20} />
                </div>
                Data Insight
              </h3>
              <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                Live Stat
              </div>
            </div>
            
            <div className="space-y-7 relative z-10">
              {distribution.map((item, index) => {
                const percentage = totalReviews > 0 ? (item.count / totalReviews) * 100 : 0;
                return (
                  <div key={item.star} className="space-y-2.5 group/bar">
                    <div className="flex justify-between items-center px-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-900 dark:text-white w-4">{item.star}</span>
                        <Star size={12} className="fill-orange-500 text-orange-500" />
                        <div className="h-1 w-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.count} Reviews</span>
                      </div>
                      <span className="text-[11px] font-black text-orange-500">{Math.round(percentage)}%</span>
                    </div>
                    {/* Progress Track */}
                    <div className="h-6 w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl overflow-hidden p-1.5 border border-slate-200/50 dark:border-slate-700/50 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-linear-to-r from-slate-900 via-orange-600 to-orange-400 dark:from-orange-700 dark:via-orange-500 dark:to-amber-400 rounded-xl relative group-hover/bar:brightness-110 transition-all"
                      >
                         {/* Animated Scan Line */}
                         <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent w-20 skew-x-12 -translate-x-full group-hover/bar:animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </aside>

        {/* FEED - ANIMATION FROM RIGHT SIDE */}
        <main className="lg:col-span-8 space-y-10">
          <div className="flex items-center gap-4 mb-2 pl-6 border-l-4 border-orange-500">
             <h2 className="text-3xl font-black italic uppercase text-slate-900 dark:text-white tracking-tighter">Community Feedback</h2>
             <span className="text-slate-300 dark:text-slate-800 text-3xl font-black italic">/ {totalReviews}</span>
          </div>

          <AnimatePresence mode="popLayout">
            {sortedReviews.length > 0 ? (
              sortedReviews.map((review, idx) => (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, x: 100 }} 
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: idx * 0.08 
                  }}
                  className="mb-8"
                >
                  <ReviewCard review={review} index={idx} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-40 flex flex-col items-center justify-center border-4 border-dashed border-slate-100 dark:border-slate-900 rounded-[5rem] text-center"
              >
                <MessageSquare size={64} className="text-slate-200 mb-6" />
                <h3 className="text-2xl font-black text-slate-300 uppercase italic">Chưa có đánh giá</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(500%); }
        }
      `}</style>
    </div>
  );
}