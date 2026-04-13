import { Skeleton } from "@/components/ui/skeleton";

export default function GroupOrderLoading() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-6 min-h-screen bg-white animate-in fade-in duration-500">
      
      <Skeleton className="h-4 w-32 rounded-md mb-10" />

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        <div className="w-full lg:flex-[2] space-y-8">
          
          <div className="flex justify-between items-end border-b border-slate-100 pb-6">
            <div className="space-y-3">
              <Skeleton className="h-10 w-64 rounded-xl" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                
                <Skeleton className="h-24 w-24 shrink-0 rounded-3xl" />
                
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-40 sm:w-56 rounded-md" />
                      <Skeleton className="h-5 w-16 rounded-md" />
                    </div>
                    <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <Skeleton className="h-6 w-24 rounded-md" />
                    <Skeleton className="h-8 w-28 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:flex-1 lg:sticky lg:top-24">
          <div className="bg-slate-900 p-10 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(15,23,42,0.3)]">
            
            <Skeleton className="h-3 w-32 rounded-full bg-slate-800 mb-10" />
            
            <div className="space-y-6 mb-12">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24 rounded-md bg-slate-800" />
                <Skeleton className="h-4 w-16 rounded-md bg-slate-800" />
              </div>
              
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24 rounded-md bg-slate-800" />
                <Skeleton className="h-6 w-20 rounded-full bg-slate-800" />
              </div>

              <div className="border-t border-white/10 pt-8 flex justify-between items-end">
                <div className="space-y-2">
                  <Skeleton className="h-2 w-20 rounded-full bg-slate-800" />
                  <Skeleton className="h-4 w-24 rounded-md bg-slate-800" />
                </div>
                <Skeleton className="h-10 w-32 rounded-xl bg-slate-800" />
              </div>
            </div>

            <Skeleton className="w-full h-16 rounded-2xl bg-slate-700/50" />
            
            <div className="mt-8 flex flex-col items-center space-y-2">
              <Skeleton className="h-2 w-48 rounded-full bg-slate-800" />
              <Skeleton className="h-2 w-32 rounded-full bg-slate-800" />
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}