"use client";

import React, { useMemo, useRef } from "react";
import { Star, Calendar, ShoppingBag, Quote, CheckCircle2, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
  index: number;
}

const MESH_GRADIENTS = [
  "from-rose-500 via-pink-500 to-rose-600",
  "from-amber-400 via-orange-500 to-yellow-500",
  "from-emerald-400 via-teal-500 to-cyan-500",
  "from-blue-500 via-indigo-500 to-purple-500",
  "from-violet-500 via-purple-500 to-fuchsia-500",
];

export default function ReviewCard({ review, index }: ReviewCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const gradientClass = useMemo(() => {
    const charCodeSum = review.userName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return MESH_GRADIENTS[charCodeSum % MESH_GRADIENTS.length];
  }, [review.userName]);

  const firstLetter = review.userName.charAt(0).toUpperCase();

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, x: 50 }} 
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="group relative bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 overflow-hidden"
    >
      {/* Neon Glow Background */}
      <div className={`absolute -top-24 -left-24 w-64 h-64 bg-linear-to-br ${gradientClass} opacity-0 group-hover:opacity-20 blur-[80px] transition-opacity duration-700`} />
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] dark:opacity-[0.07] group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
        <Quote size={180} fill="currentColor" />
      </div>

      <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <motion.div 
                whileHover={{ rotate: 12, scale: 1.1 }}
                className={`w-20 h-20 bg-linear-to-br ${gradientClass} rounded-[2.2rem] flex items-center justify-center text-white text-3xl font-[1000] shadow-2xl shadow-orange-500/20 ring-4 ring-white dark:ring-slate-800`}
              >
                {firstLetter}
              </motion.div>
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1.5 border-4 border-white dark:border-slate-900 shadow-xl">
                <CheckCircle2 size={14} fill="currentColor" />
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-slate-900 dark:text-white text-2xl tracking-tighter uppercase flex items-center gap-2">
                {review.userName}
                <Sparkles size={16} className="text-orange-500 animate-pulse" />
              </h4>
              <div className="flex items-center gap-2.5 mt-1 text-slate-400 dark:text-slate-500 text-[11px] font-bold uppercase tracking-[0.3em]">
                <Calendar size={14} className="text-orange-500" />
                {review.date}
              </div>
            </div>
          </div>

          {/* Badge Score góc phải */}
          <div className="hidden sm:flex flex-col items-end">
             <span className="text-4xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">{review.rating}.0</span>
             <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Rating</span>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex gap-2 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={24}
              className={`${
                i < review.rating 
                  ? "fill-orange-500 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]" 
                  : "fill-slate-100 text-slate-100 dark:fill-slate-800 dark:text-slate-800"
              } transition-all duration-300 group-hover:scale-110`}
              style={{ transitionDelay: `${i * 50}ms` }}
            />
          ))}
        </div>

        {/* Content Section */}
        <div className="relative mb-10">
          <p className="text-slate-700 dark:text-slate-200 text-xl font-medium leading-[1.6] tracking-tight relative z-10 pl-6 border-l-4 border-orange-500/30 group-hover:border-orange-500 transition-colors duration-500">
            &quot;{review.comment}&quot;
          </p>
        </div>

        {/* Purchased Items Tags */}
        <div className="flex flex-wrap gap-3">
          {review.purchasedItemNames.map((item, idx) => (
            <div 
              key={idx}
              className="group/tag flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 text-[11px] font-black uppercase tracking-wider border border-slate-100 dark:border-slate-700/50 hover:border-orange-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm"
            >
              <ShoppingBag size={14} className="text-orange-500 group-hover/tag:scale-125 transition-transform" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Border Glow */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/10 rounded-[3.5rem] transition-all duration-500 pointer-events-none" />
      
      {/* Bottom Shine Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-orange-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </motion.div>
  );
}