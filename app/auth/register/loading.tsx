"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50/50 dark:bg-slate-950 p-6 transition-colors duration-500 overflow-hidden">
      
      {/* Form Card Skeleton */}
      <div className="bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-orange-100 dark:shadow-none w-full max-w-md space-y-6 border border-white dark:border-slate-800 animate-pulse">
        
        {/* Header Skeleton */}
        <div className="text-center space-y-3 mb-8">
          <div className="h-10 w-56 bg-slate-200 dark:bg-slate-800 rounded-xl mx-auto" />
          <div className="h-2 w-40 bg-slate-100 dark:bg-slate-800/50 mx-auto rounded-full" />
        </div>

        {/* Input Skeletons */}
        <div className="space-y-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              {/* Label */}
              <div className="h-2 w-20 bg-slate-100 dark:bg-slate-800/50 ml-4 rounded-full" />
              {/* Input box */}
              <div className="h-16 w-full bg-slate-50 dark:bg-slate-800/40 rounded-2xl border-2 border-slate-50 dark:border-slate-800" />
            </div>
          ))}
        </div>

        {/* Submit Button Skeleton */}
        <div className="pt-2">
          <div className="h-18 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-sm" />
        </div>

        {/* Footer Link Skeleton */}
        <div className="flex justify-center pt-4">
          <div className="h-2 w-44 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-[80px]" />
      </div>
    </div>
  );
}