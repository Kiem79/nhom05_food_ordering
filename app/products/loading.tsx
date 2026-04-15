"use client";

import React from "react";

export default function Loading() {
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-transparent dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-pulse">
        <div className="space-y-4">
          <div className="h-14 w-64 md:w-80 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="h-3 w-40 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-[20px] gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-20 bg-white dark:bg-slate-800 rounded-[15px]" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {skeletonCards.map((_, idx) => (
          <div 
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-[30px] p-4 border border-slate-100 dark:border-slate-800 flex flex-col h-full animate-pulse"
          >
            <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800 rounded-[20px] mb-6" />

            <div className="px-1 flex flex-col flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-3 w-16 bg-orange-500/10 rounded-full" />
                <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-md" />
                <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-800 rounded-md" />
              </div>

              <div className="h-3 w-full bg-slate-50 dark:bg-slate-900 rounded-full" />

              <div className="mt-auto h-12 w-full bg-slate-100 dark:bg-slate-800 rounded-[20px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}