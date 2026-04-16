"use client";

import React from "react";

export default function Loading() {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        
        {/* --- HEADER SKELETON --- */}
        <div className="mb-16">
          <div className="h-12 md:h-16 w-64 md:w-96 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          <div className="h-3 w-40 bg-slate-100 dark:bg-slate-900 mt-5 rounded-full animate-pulse" />
        </div>

        {/* --- INTRO CARD SKELETON --- */}
        <div className="bg-slate-100 dark:bg-slate-900/50 rounded-[2.5rem] p-10 md:p-14 mb-24 animate-pulse">
          <div className="space-y-3">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>
        </div>

        {/* --- GRID THÀNH VIÊN SKELETON --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {skeletonCards.map((_, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm"
            >
              {/* Avatar Box */}
              <div className="relative aspect-square rounded-[2rem] bg-slate-200 dark:bg-slate-800 animate-pulse mb-8" />
              
              <div className="space-y-4">
                {/* Name */}
                <div className="h-8 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
                
                {/* Role */}
                <div className="h-3 w-1/2 bg-orange-200/50 dark:bg-orange-900/30 rounded-full animate-pulse" />
                
                {/* Button */}
                <div className="h-14 w-full bg-slate-100 dark:bg-slate-800/80 rounded-xl mt-4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}