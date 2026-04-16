"use client";

import React from "react";

export default function Loading() {
  const skeletonItems = Array.from({ length: 5 });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-transparent dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      <div className="h-9 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6 animate-pulse" />

      <div className="flex gap-3 mb-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="h-10 w-24 bg-slate-100 dark:bg-slate-800/50 rounded-full" 
          />
        ))}
      </div>

      <div className="space-y-4 animate-pulse">
        {skeletonItems.map((_, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900/50 p-5 rounded-[20px] border border-slate-100 dark:border-slate-800 flex justify-between items-center"
          >
            <div className="space-y-3">
              <div className="h-5 w-20 bg-orange-500/20 dark:bg-orange-500/10 rounded-md" />
              <div className="h-3 w-32 bg-slate-100 dark:bg-slate-800 rounded-full" />
            </div>

            <div className="space-y-3 flex flex-col items-end">
              <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}