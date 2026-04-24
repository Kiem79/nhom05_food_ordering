"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-transparent dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      
      <div className="mb-12 animate-pulse">
        <div className="h-16 md:h-20 w-3/4 md:w-125 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-4" />
        <div className="h-3 w-64 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        <div className="animate-pulse">
          <div className="relative w-full h-100 bg-slate-100 dark:bg-slate-900 rounded-[3rem] border-4 border-white dark:border-slate-800 overflow-hidden">
            <div className="absolute inset-0 opacity-10 flex flex-wrap gap-8 p-8">
                {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-slate-400 rounded-full" />
                ))}
            </div>
            <div className="absolute left-10 bottom-10 w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="absolute right-10 top-10 w-10 h-10 bg-orange-500/20 rounded-full" />
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 h-10 w-48 bg-white/80 dark:bg-slate-800/80 rounded-2xl" />
          </div>
        </div>

        <div className="space-y-8 animate-pulse">
          
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-50 dark:border-slate-800">
            <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg mb-10" />
            
            <div className="space-y-10 relative">
              <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800" />
              
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-6 relative z-10">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
                  <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded-md" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-slate-900/80 rounded-[4rem] p-10 border border-white/5">
             <div className="h-6 w-40 bg-orange-500/30 rounded-lg mb-6" />
             <div className="h-3 w-full bg-slate-800 rounded-full mb-6" />
             <div className="h-16 w-48 bg-white/10 rounded-2xl mb-8" />
             <div className="h-16 w-full bg-white dark:bg-orange-500/40 rounded-2xl" />
          </div>

        </div>
      </div>
    </div>
  );
}