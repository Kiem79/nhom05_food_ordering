"use client";

import React from "react";

export default function Loading() {
  const skeletonOrders = Array.from({ length: 2 });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-slate-50/30 dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-pulse">
        <div className="space-y-4">
          <div className="h-16 md:h-20 w-80 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-orange-500/30 rounded-full" />
            <div className="h-3 w-40 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
          </div>
        </div>
        <div className="h-12 w-48 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-4">
          <div className="bg-slate-900 dark:bg-slate-800 rounded-[3.5rem] p-1 animate-pulse">
            <div className="bg-white dark:bg-slate-900 rounded-[3.3rem] p-10 flex flex-col items-center">
              {/* Avatar Circle */}
              <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-[2.8rem] mb-8" />
              {/* User Name */}
              <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg mb-10" />
              
              <div className="grid grid-cols-1 gap-3 w-full">
                <div className="h-24 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700" />
                <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-[2rem]" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-10">
          {skeletonOrders.map((_, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm animate-pulse"
            >
              <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-5 flex justify-between">
                <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-full" />
                <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
              </div>

              <div className="p-8 md:p-10 space-y-8">
                {[1, 2].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-[2rem]" />
                      <div className="space-y-3">
                        <div className="h-5 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                        <div className="h-2 w-24 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                      </div>
                    </div>
                    <div className="h-6 w-20 bg-slate-100 dark:bg-slate-800 rounded-lg" />
                  </div>
                ))}

                <div className="pt-8 border-t-2 border-dashed border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div className="space-y-3">
                    <div className="h-2 w-28 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                    <div className="h-10 w-40 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                  </div>
                  <div className="h-14 w-44 bg-slate-100 dark:bg-slate-800 rounded-[1.8rem]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}