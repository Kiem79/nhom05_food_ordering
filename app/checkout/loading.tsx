"use client";

import React from "react";

export default function Loading() {
  const skeletonMembers = Array.from({ length: 3 });

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto py-12 px-6 font-sans grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* --- LEFT COLUMN: INFO & MEMBERS --- */}
        <div className="lg:col-span-2 space-y-12">
          {/* Back Button Link */}
          <div className="h-4 w-40 bg-slate-100 dark:bg-slate-800/50 rounded-full animate-pulse" />

          {/* Page Title */}
          <div className="space-y-4">
            <div className="h-14 w-80 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            <div className="h-14 w-64 bg-orange-100 dark:bg-orange-900/20 rounded-2xl animate-pulse" />
          </div>

          {/* Section 01: Address */}
          <div className="space-y-6">
            <div className="h-3 w-48 bg-slate-100 dark:bg-slate-800/50 rounded-full animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-16 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl animate-pulse" />
              <div className="h-16 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl animate-pulse" />
            </div>
          </div>

          {/* Section 02: Member List */}
          <div className="space-y-6">
            <div className="h-3 w-56 bg-slate-100 dark:bg-slate-800/50 rounded-full animate-pulse" />
            <div className="grid grid-cols-1 gap-4">
              {skeletonMembers.map((_, idx) => (
                <div 
                  key={idx} 
                  className="p-6 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6"
                >
                  <div className="flex items-center gap-5 w-full">
                    {/* Avatar Circle */}
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" />
                    <div className="flex flex-col gap-3 w-1/2">
                      {/* Name */}
                      <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                      {/* Detail lines */}
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full animate-pulse" />
                    </div>
                  </div>
                  {/* Button QR */}
                  <div className="h-14 w-44 bg-slate-100 dark:bg-slate-800 rounded-[1.5rem] animate-pulse shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: STICKY SIDEBAR --- */}
        <div className="relative">
          <div className="bg-[#111827] dark:bg-slate-900/90 p-10 rounded-[3rem] min-h-125 flex flex-col items-center justify-between border border-white/5 backdrop-blur-sm animate-pulse">
            
            {/* Top Placeholder (QR Icon Area) */}
            <div className="my-auto space-y-6 w-full flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-800 dark:bg-slate-800/50 rounded-full" />
              <div className="h-2 w-3/4 bg-slate-800 dark:bg-slate-800/50 rounded-full" />
              <div className="h-2 w-1/2 bg-slate-800 dark:bg-slate-800/50 rounded-full" />
            </div>

            {/* Bottom Summary Area */}
            <div className="w-full space-y-6 pt-8 border-t border-white/10">
              <div className="flex justify-between">
                <div className="h-2 w-20 bg-slate-800 rounded-full" />
                <div className="h-2 w-16 bg-slate-800 rounded-full" />
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-24 bg-slate-800 rounded-full" />
                <div className="h-6 w-24 bg-orange-900/50 rounded-lg" />
              </div>
              {/* Final Button */}
              <div className="h-16 w-full bg-slate-800 dark:bg-orange-900/30 rounded-[1.5rem]" />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}