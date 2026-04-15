"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50/30 dark:bg-slate-950 p-6 transition-colors duration-500 overflow-hidden">
      
      <div className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-[100px]" />
      </div>

      {/* Form Card Skeleton */}
      <div className="bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[3.5rem] shadow-2xl shadow-orange-100/50 dark:shadow-none w-full max-w-md space-y-10 border border-white dark:border-slate-800 relative z-10 animate-pulse">
        
        {/* Header Skeleton */}
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-2 w-24 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
        </div>

        {/* Input Skeletons */}
        <div className="space-y-8">
          {/* Email field */}
          <div className="space-y-3">
            <div className="h-2 w-16 bg-slate-100 dark:bg-slate-800/50 ml-4 rounded-full" />
            <div className="h-16 w-full bg-slate-50 dark:bg-slate-800/40 rounded-2xl border-2 border-slate-50 dark:border-slate-800" />
          </div>

          {/* Password field */}
          <div className="space-y-3">
            <div className="h-2 w-20 bg-slate-100 dark:bg-slate-800/50 ml-4 rounded-full" />
            <div className="h-16 w-full bg-slate-50 dark:bg-slate-800/40 rounded-2xl border-2 border-slate-50 dark:border-slate-800" />
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="h-20 w-full bg-slate-200 dark:bg-slate-800 rounded-[2rem]" />

        {/* Footer Link Skeleton */}
        <div className="flex justify-center">
          <div className="h-2 w-40 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
        </div>
      </div>
    </div>
  );
}