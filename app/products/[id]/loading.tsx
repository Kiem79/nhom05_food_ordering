"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 pb-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded-full mb-10 animate-pulse" />

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-12">
          
          <div className="space-y-8 animate-pulse">
            <div className="relative aspect-4/3 rounded-[3rem] bg-slate-100 dark:bg-slate-900 border-4 border-white dark:border-slate-800" />
            
            <div className="space-y-4">
              <div className="h-16 w-full bg-slate-50 dark:bg-slate-900/50 rounded-3xl" />
              <div className="h-20 w-full bg-slate-200 dark:bg-slate-800 rounded-[2rem]" />
            </div>
          </div>

          <div className="space-y-8 animate-pulse">
            <div className="space-y-4">
              <div className="h-4 w-24 bg-orange-500/20 rounded-full" />
              <div className="space-y-2">
                <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
                <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              </div>
              <div className="flex items-center gap-4">
                <div className="h-8 w-32 bg-slate-100 dark:bg-slate-900 rounded-lg" />
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
                <div className="h-5 w-40 bg-slate-50 dark:bg-slate-900" />
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 space-y-3">
              <div className="h-2 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full" />
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full" />
              <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-800 rounded-full" />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800">
              <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800 rounded-full mb-6" />
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-orange-50 dark:bg-orange-500/5 rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-40 w-full bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] mb-24 animate-pulse" />

        <div>
          <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl mb-12 animate-pulse" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-5 border border-slate-50 dark:border-slate-800 space-y-4 animate-pulse">
                <div className="aspect-4/3 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
                <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-full" />
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-full" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}