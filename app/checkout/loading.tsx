import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6 animate-in fade-in duration-500">
      
      <Skeleton className="h-4 w-40 rounded-md mb-12" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        <div className="lg:col-span-2 space-y-12">
          
          <div className="space-y-4">
            <Skeleton className="h-14 md:h-18 w-48 rounded-2xl" />
            <Skeleton className="h-14 md:h-18 w-64 rounded-2xl" />
          </div>
          
          <div className="space-y-6">
            <Skeleton className="h-4 w-56 rounded-full" /> 
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-6 rounded-[2.5rem] border-2 border-slate-100 bg-white">
                  <Skeleton className="h-6 w-24 mb-3 rounded-md" />
                  <Skeleton className="h-3 w-32 rounded-sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Skeleton className="h-4 w-56 rounded-full" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[1, 2].map((item) => (
                <div key={item} className="p-7 rounded-[2.5rem] border-2 border-slate-100 bg-white flex items-center gap-5">
                  <Skeleton className="w-14 h-14 rounded-2xl shrink-0" />
                  
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-6 w-32 rounded-md" />
                    <Skeleton className="h-3 w-40 rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-fit lg:sticky lg:top-24">
          <div className="bg-slate-900 p-10 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)]">
            
            <Skeleton className="h-3 w-32 rounded-full bg-slate-800 mb-12" />
            
            <div className="space-y-6 mb-12">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-32 rounded-md bg-slate-800" />
                  <Skeleton className="h-4 w-16 rounded-md bg-slate-800" />
                </div>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-8 flex justify-between items-end mb-12">
              <div className="space-y-3">
                <Skeleton className="h-2 w-24 rounded-full bg-slate-800" />
                <Skeleton className="h-4 w-20 rounded-md bg-slate-800" />
              </div>
              <Skeleton className="h-10 w-32 rounded-xl bg-slate-800" />
            </div>

            <Skeleton className="w-full h-20 rounded-3xl bg-slate-700/50" />
            
            <div className="mt-8 flex flex-col items-center space-y-2">
              <Skeleton className="h-2 w-56 rounded-full bg-slate-800" />
              <Skeleton className="h-2 w-48 rounded-full bg-slate-800" />
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}