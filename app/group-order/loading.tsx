"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 bg-slate-50/10 dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      
      <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 animate-pulse">
        <div className="space-y-4">
          <div className="h-16 md:h-20 w-80 md:w-[450px] bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="h-3 w-48 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
        </div>
        <div className="flex gap-3">
          <div className="h-14 w-32 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800" />
          <div className="h-14 w-40 bg-orange-50 dark:bg-orange-500/10 rounded-2xl border border-orange-100 dark:border-orange-500/20" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2 space-y-10 animate-pulse">
          <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-10 md:p-14 border border-slate-50 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
            {/* Title Line */}
            <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl mb-12" />
            
            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-8">
                  <div className="w-28 h-28 bg-slate-100 dark:bg-slate-800 rounded-[2rem] shrink-0" />
                  
                  <div className="flex-1 space-y-4">
                    <div className="h-3 w-32 bg-orange-500/20 rounded-full" />
                    <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                    <div className="flex gap-4">
                      <div className="h-6 w-24 bg-slate-100 dark:bg-slate-800 rounded-md" />
                      <div className="h-6 w-16 bg-blue-500/10 rounded-md" />
                    </div>
                  </div>

                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800/50 rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative animate-pulse">
          <div className="bg-slate-900 dark:bg-slate-900/80 rounded-[4rem] p-12 border-4 border-white/5 dark:border-slate-800">
            {/* Title */}
            <div className="h-10 w-32 bg-orange-500/30 rounded-lg mb-10" />
            
            <div className="space-y-6 mb-12">
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-slate-700 rounded-full" />
                <div className="h-3 w-24 bg-slate-700 rounded-full" />
              </div>
              <div className="h-12 w-full bg-white/5 rounded-2xl border border-white/5" />
            </div>

            <div className="space-y-4 mb-12">
              <div className="h-3 w-32 bg-slate-700 rounded-full" />
              <div className="h-16 w-3/4 bg-white/10 rounded-2xl" />
            </div>

            <div className="bg-white/5 rounded-[3rem] p-8 mb-10 border border-white/10">
              <div className="h-4 w-40 bg-orange-500/20 rounded-full mb-4" />
              <div className="h-12 w-32 bg-white/10 rounded-xl" />
            </div>

            <div className="h-20 w-full bg-orange-500/40 rounded-[2.5rem]" />
          </div>
        </div>

      </div>
    </div>
  );
}