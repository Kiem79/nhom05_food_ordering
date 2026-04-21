"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ReviewLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen bg-white dark:bg-slate-950">
      
      <div className="flex items-center gap-3 mb-10 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-16 h-3 bg-slate-100 dark:bg-slate-900 rounded-full animate-pulse" />
            {i < 4 && <div className="w-3 h-3 bg-slate-50 dark:bg-slate-900 rounded-full" />}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12 items-start lg:items-center">
        <div className="flex-1 space-y-4">
          <div className="w-full max-w-[500px] h-20 md:h-32 bg-slate-100 dark:bg-slate-900 rounded-3xl animate-pulse" />
          <div className="w-64 h-4 bg-slate-50 dark:bg-slate-900 rounded-full animate-pulse" />
        </div>

        <div className="w-65 h-70 bg-slate-100 dark:bg-slate-900 rounded-[4.5rem] border-8 border-white dark:border-slate-800 shadow-xl animate-pulse flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-2 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="w-32 h-20 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
            <div className="flex gap-2">
                {[1,2,3,4,5].map(i => <div key={i} className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded-lg" />)}
            </div>
        </div>
      </div>

      <div className="h-16 w-full bg-slate-900 rounded-[2rem] mb-12 animate-pulse" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 space-y-8">
          <div className="h-[450px] w-full bg-slate-100 dark:bg-slate-900 rounded-[3.5rem] border-[3px] border-slate-50 dark:border-slate-800 p-8 space-y-8">
             <div className="w-1/2 h-8 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
             {[1,2,3,4,5].map(i => (
                <div key={i} className="space-y-3">
                    <div className="flex justify-between"><div className="w-20 h-2 bg-slate-200 dark:bg-slate-800 rounded" /> <div className="w-10 h-2 bg-slate-200 dark:bg-slate-800 rounded" /></div>
                    <div className="w-full h-6 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
                </div>
             ))}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="w-48 h-10 bg-slate-100 dark:bg-slate-900 rounded-xl mb-6 animate-pulse" />
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="w-full h-64 bg-slate-50 dark:bg-slate-900/50 rounded-[4rem] border-2 border-slate-100 dark:border-slate-900 animate-pulse p-8 space-y-4"
            >
                <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                    <div className="space-y-2">
                        <div className="w-32 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
                        <div className="w-20 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
                    </div>
                </div>
                <div className="w-full h-20 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}