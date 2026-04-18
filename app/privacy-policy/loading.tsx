import React from "react";

export default function PrivacyPolicySkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20 overflow-x-hidden animate-pulse">
      
      <header className="relative pt-24 pb-40 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="h-4 w-40 bg-slate-800 rounded-md mb-16" />
          
          <div className="space-y-10">
            <div className="h-9 w-48 bg-slate-800 rounded-2xl" />
            
            <div className="space-y-4">
              <div className="h-20 md:h-28 w-2/3 bg-slate-800 rounded-3xl" />
              <div className="h-20 md:h-28 w-1/2 bg-slate-800/50 rounded-3xl" />
            </div>

            <div className="max-w-4xl space-y-6">
              <div className="h-5 w-44 bg-slate-800/80 rounded-full" />
              <div className="space-y-3">
                <div className="h-5 w-full bg-slate-800/50 rounded-full" />
                <div className="h-5 w-5/6 bg-slate-800/50 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-24 -mt-16 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <aside className="lg:w-87.5 shrink-0">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl">
              <div className="h-3 w-32 bg-slate-100 dark:bg-slate-800 rounded-full mb-8 mx-4" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-14 w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl" />
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1 min-h-175">
            <div className="bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-slate-800 p-10 md:p-16 shadow-2xl">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-3xl" />
                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-lg" />
              </div>

              <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-10" />

              <div className="space-y-8 mb-12">
                <div className="space-y-3">
                  <div className="h-5 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                  <div className="h-5 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                  <div className="h-5 w-4/5 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                </div>
                <div className="space-y-3">
                  <div className="h-5 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                  <div className="h-5 w-2/3 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-24 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800" />
                ))}
              </div>
            </div>
          </main>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-slate-200 dark:bg-slate-900 rounded-[4rem] p-12 md:p-20 flex flex-col items-center space-y-10">
          <div className="w-16 h-16 bg-slate-300 dark:bg-slate-800 rounded-full" />
          <div className="space-y-4 flex flex-col items-center">
            <div className="h-14 w-80 bg-slate-300 dark:bg-slate-800 rounded-2xl" />
            <div className="h-14 w-64 bg-slate-300 dark:bg-slate-800 rounded-2xl" />
          </div>
          <div className="h-5 w-full max-w-xl bg-slate-300 dark:bg-slate-800 rounded-full" />
          <div className="flex flex-col md:flex-row gap-6 pt-4">
            <div className="h-16 w-52 bg-slate-300 dark:bg-slate-800 rounded-full" />
            <div className="h-16 w-52 bg-slate-300 dark:bg-slate-800 rounded-full" />
          </div>
        </div>
      </footer>
    </div>
  );
}