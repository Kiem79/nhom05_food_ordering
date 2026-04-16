"use client";

import React from "react";

export default function Loading() {
  const skeletonRestaurants = Array.from({ length: 6 });

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 bg-transparent dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      
      <div className="mb-12 flex flex-col gap-6 animate-pulse">
        <div className="space-y-3">
          <div className="h-12 md:h-14 w-64 md:w-96 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="h-3 w-32 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
        </div>

        <div className="flex justify-start items-center gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl items-center border border-transparent dark:border-slate-800 w-[200px]">
            <div className="shrink-0 w-9 h-9 bg-orange-500/50 rounded-xl mr-1" />
            <div className="h-9 w-24 bg-white dark:bg-slate-800 rounded-xl shadow-sm" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skeletonRestaurants.map((_, idx) => (
          <div 
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col h-full animate-pulse"
          >
            <div className="relative aspect-4/3 w-full bg-slate-200 dark:bg-slate-800">
              <div className="absolute top-4 left-4 h-8 w-14 bg-white/50 dark:bg-slate-700/50 rounded-2xl" />
              <div className="absolute top-4 right-4 h-8 w-20 bg-black/20 rounded-2xl" />
            </div>

            <div className="p-6 flex flex-col flex-1 space-y-4">
              <div className="flex justify-between items-start gap-3">
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                <div className="h-5 w-16 bg-orange-500/20 rounded-md" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full" />
                <div className="h-3 w-2/3 bg-slate-100 dark:bg-slate-800 rounded-full" />
              </div>

              <div className="pt-4 space-y-2 border-t border-slate-50 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-orange-500/30 rounded-full" />
                  <div className="h-3 w-40 bg-slate-100 dark:bg-slate-800 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-orange-500/30 rounded-full" />
                  <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800 rounded-full" />
                </div>
              </div>

              <div className="flex gap-1.5 pt-2">
                <div className="h-5 w-12 bg-slate-100 dark:bg-slate-800 rounded-lg" />
                <div className="h-5 w-12 bg-slate-100 dark:bg-slate-800 rounded-lg" />
                <div className="h-5 w-16 bg-orange-50 dark:bg-orange-500/10 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}