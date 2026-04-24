"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      
      <section className="relative min-h-[85vh] flex items-center px-6 lg:px-24 py-20 animate-pulse">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          
          <div className="space-y-8">
            <div className="h-8 w-48 bg-slate-100 dark:bg-slate-900 rounded-2xl" />
            
            <div className="space-y-4">
              <div className="h-16 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="h-16 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-900 rounded-full" />
              <div className="h-4 w-5/6 bg-slate-100 dark:bg-slate-900 rounded-full" />
            </div>

            <div className="flex gap-4 pt-4">
              <div className="h-14 w-44 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="h-14 w-32 bg-slate-100 dark:bg-slate-900 rounded-2xl" />
            </div>
          </div>

          <div className="relative aspect-5/4 w-full bg-slate-100 dark:bg-slate-900 rounded-[3rem] border-12 border-slate-50 dark:border-slate-900" />
        </div>
      </section>

      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/40 px-6 animate-pulse">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800" />
          ))}
        </div>
      </section>

      <section className="px-6 py-24 animate-pulse">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-1.5 w-24 bg-orange-200 dark:bg-orange-900/30 mt-2 rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-slate-100 dark:bg-slate-900 rounded-3xl" />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}