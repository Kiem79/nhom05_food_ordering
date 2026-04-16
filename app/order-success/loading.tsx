"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-white dark:bg-slate-950 px-6 transition-colors duration-500">
      <div className="max-w-lg w-full text-center space-y-8 animate-pulse">
        
        <div className="relative inline-block">
          <div className="w-32 h-32 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>
          <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border-2 border-dashed border-slate-100 dark:border-slate-900 rounded-full" />
        </div>

        <div className="space-y-6 flex flex-col items-center">
          <div className="space-y-3">
            <div className="h-12 md:h-14 w-64 bg-slate-200 dark:bg-slate-800 rounded-2xl mx-auto" />
            <div className="h-12 md:h-14 w-72 bg-slate-100 dark:bg-slate-900 rounded-2xl mx-auto" />
          </div>
          
          <div className="space-y-2">
            <div className="h-3 w-80 bg-slate-50 dark:bg-slate-900/50 rounded-full mx-auto" />
            <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-6 w-full max-w-sm mx-auto">
          <div className="h-16 bg-slate-100 dark:bg-slate-900 rounded-2xl" />
          <div className="h-16 border-2 border-slate-50 dark:border-slate-900 rounded-2xl" />
          
          <div className="h-2 w-24 bg-slate-50 dark:bg-slate-900/50 rounded-full mx-auto mt-4" />
        </div>
      </div>
    </div>
  );
}