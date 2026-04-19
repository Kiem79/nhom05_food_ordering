import React from "react";

export default function TermsOfServiceSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20 overflow-x-hidden animate-pulse">
      
      <header className="relative pt-24 pb-36 bg-slate-900 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="h-4 w-40 bg-slate-800 rounded-md mb-12" />
          
          <div className="mt-12 space-y-6">
            <div className="h-10 w-52 bg-slate-800 rounded-2xl" />
            
            <div className="space-y-4">
              <div className="h-16 md:h-24 w-3/4 bg-slate-800 rounded-3xl" />
              <div className="h-16 md:h-24 w-1/2 bg-slate-800/50 rounded-3xl" />
            </div>

            <div className="max-w-2xl space-y-3">
              <div className="h-5 w-full bg-slate-800 rounded-full" />
              <div className="h-5 w-4/6 bg-slate-800 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 -mt-20 relative z-20 space-y-12">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-20 bg-slate-200 dark:bg-slate-800 h-16 lg:h-auto" />

              <div className="flex-1 p-8 md:p-14 space-y-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800" />
                  <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                </div>

                <div className="space-y-4">
                  <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                  <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                  <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                </div>

                {i === 2 && (
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((p) => (
                      <div key={p} className="h-16 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      <footer className="max-w-6xl mx-auto px-6 mt-32">
        <div className="bg-slate-200 dark:bg-slate-900 rounded-[4rem] p-12 md:p-24 flex flex-col items-center space-y-10">
          <div className="w-16 h-16 bg-slate-300 dark:bg-slate-800 rounded-full" />
          <div className="space-y-4 flex flex-col items-center">
            <div className="h-12 md:h-16 w-80 bg-slate-300 dark:bg-slate-800 rounded-2xl" />
            <div className="h-12 md:h-16 w-60 bg-slate-300 dark:bg-slate-800 rounded-2xl" />
          </div>
          <div className="h-6 w-full max-w-md bg-slate-300 dark:bg-slate-800 rounded-full" />
          
          <div className="flex flex-col md:flex-row gap-6 pt-4">
            <div className="h-16 w-56 bg-slate-300 dark:bg-slate-800 rounded-full" />
            <div className="h-16 w-56 bg-slate-300 dark:bg-slate-800 rounded-full" />
          </div>
        </div>
      </footer>
    </div>
  );
}