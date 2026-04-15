"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      
\      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24">
        
\        <div className="text-center mb-16 flex flex-col items-center space-y-6">
          <div className="h-16 md:h-20 w-3/4 max-w-2xl bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          <div className="h-2 w-48 bg-slate-100 dark:bg-slate-800/50 rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          
\          <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-14 border border-slate-100 dark:border-slate-800 shadow-2xl space-y-10 animate-pulse">
            <div className="space-y-4">
              <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-2 w-64 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
            </div>

            <div className="space-y-8">
\              {[1, 2].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-2 w-20 bg-slate-100 dark:bg-slate-800/50 ml-4 rounded-full" />
                  <div className="h-14 w-full bg-slate-50 dark:bg-slate-800/40 rounded-2xl" />
                </div>
              ))}
\              <div className="space-y-3">
                <div className="h-2 w-28 bg-slate-100 dark:bg-slate-800/50 ml-4 rounded-full" />
                <div className="h-32 w-full bg-slate-50 dark:bg-slate-800/40 rounded-[2rem]" />
              </div>
\              <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 rounded-[2rem]" />
            </div>
          </div>

\          <div className="space-y-10 animate-pulse">
            {/* Hotline & Open Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-32 bg-orange-50 dark:bg-orange-500/5 rounded-[2.5rem] border border-orange-100 dark:border-orange-500/10" />
              <div className="h-32 bg-slate-900 dark:bg-slate-800 rounded-[2.5rem]" />
            </div>

\            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-2xl space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
                <div className="space-y-3 flex-1">
                  <div className="h-2 w-24 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                  <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                </div>
              </div>
\              <div className="h-72 w-full bg-slate-100 dark:bg-slate-800/40 rounded-[2.5rem]" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}