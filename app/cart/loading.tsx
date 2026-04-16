"use client";

import React from "react";

export default function Loading() {
  const skeletonItems = Array.from({ length: 3 });

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-6 py-24 font-sans">
        
        {/* --- TITLE SKELETON --- */}
        <div className="h-14 w-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse mb-12" />

        {/* --- CART CARD SKELETON --- */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-50 dark:border-slate-800 shadow-2xl space-y-10 animate-pulse">
          
          {/* List Items Skeleton */}
          <div className="space-y-8">
            {skeletonItems.map((_, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="space-y-3 w-2/3">
                  {/* Item Name */}
                  <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                  {/* Item Info  */}
                  <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                </div>
                
                <div className="flex items-center gap-6">
                  {/* Price */}
                  <div className="h-6 w-20 bg-orange-100 dark:bg-orange-900/20 rounded-lg" />
                  {/* Trash Icon */}
                  <div className="h-10 w-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
                </div>
              </div>
            ))}
          </div>

          {/* --- TOTAL BOX SKELETON --- */}
          <div className="pt-8 border-t-4 border-slate-50 dark:border-slate-800 flex justify-between items-end">
            <div className="space-y-4">
              {/* Label */}
              <div className="h-2 w-32 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
              {/* Grand Total Amount */}
              <div className="h-12 w-48 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            </div>
            
            {/* Checkout Button */}
            <div className="h-16 w-48 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Background Decor mờ  */}
      <div className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}