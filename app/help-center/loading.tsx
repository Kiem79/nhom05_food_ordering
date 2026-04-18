import React from "react";

export default function HelpCenterSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20 overflow-x-hidden animate-pulse">
      
      <header className="relative pt-24 pb-32 bg-slate-900 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="h-4 w-40 bg-slate-800 rounded-md mb-12" />
          
          <div className="mt-12 space-y-8">
            <div className="h-10 w-48 bg-slate-800 rounded-2xl" />
            
            <div className="space-y-4">
              <div className="h-20 md:h-24 w-3/4 bg-slate-800 rounded-3xl" />
              <div className="h-20 md:h-24 w-1/2 bg-slate-800/50 rounded-3xl" />
            </div>
            <div className="max-w-3xl space-y-3">
              <div className="h-5 w-full bg-slate-800 rounded-full" />
              <div className="h-5 w-5/6 bg-slate-800 rounded-full" />
              <div className="h-5 w-4/6 bg-slate-800 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 -mt-10 relative z-30">
        <div className="w-full h-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl" />
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-16">
          {[1, 2].map((category) => (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              </div>

              <div className="grid gap-4">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item} 
                    className="h-20 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem]" 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 mt-12">
        <div className="bg-slate-200 dark:bg-slate-900 rounded-[4rem] p-12 md:p-20 flex flex-col items-center space-y-8">
          <div className="w-12 h-12 bg-slate-300 dark:bg-slate-800 rounded-full" />
          <div className="h-16 w-64 bg-slate-300 dark:bg-slate-800 rounded-2xl" />
          <div className="h-6 w-full max-w-lg bg-slate-300 dark:bg-slate-800 rounded-full" />
          
          <div className="flex flex-col md:flex-row gap-6 pt-4">
            <div className="h-16 w-48 bg-slate-300 dark:bg-slate-800 rounded-full" />
            <div className="h-16 w-48 bg-slate-300 dark:bg-slate-800 rounded-full" />
          </div>
        </div>
      </footer>
    </div>
  );
}