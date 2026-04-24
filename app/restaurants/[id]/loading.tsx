"use client";

import React from "react";

export default function Loading() {
  const skeletonMenuItems = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      
      <div className="relative h-75 md:h-100 w-full bg-slate-200 dark:bg-slate-900 animate-pulse">
        <div className="max-w-7xl mx-auto h-full px-6 flex flex-col justify-end pb-12">
          <div className="absolute top-8 left-6 h-8 w-24 bg-white/20 rounded-full" />
          
          <div className="space-y-4">
            <div className="h-12 w-2/3 md:w-1/2 bg-white/30 dark:bg-slate-800/50 rounded-2xl" />
            <div className="flex gap-4">
              <div className="h-5 w-32 bg-white/20 rounded-md" />
              <div className="h-5 w-24 bg-white/20 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-10 animate-pulse">
        <div className="bg-white dark:bg-slate-900 shadow-xl rounded-[2.5rem] p-6 border border-slate-100 dark:border-slate-800 flex justify-around">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-4 w-12 bg-slate-100 dark:bg-slate-800 rounded-full" />
              <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-10 animate-pulse">
          <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-900" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skeletonMenuItems.map((_, idx) => (
            <div 
              key={idx} 
              className="flex gap-4 p-4 rounded-[2rem] border border-slate-50 dark:border-slate-900 animate-pulse"
            >
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-2xl shrink-0" />
              
              <div className="flex-1 space-y-3 py-1">
                <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-900 rounded-full" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 w-16 bg-orange-500/20 rounded-md" />
                  <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}