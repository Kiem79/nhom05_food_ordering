import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto min-h-screen relative animate-in fade-in duration-500">
      
      <Skeleton className="h-4 w-48 mb-8 rounded-md" />

      <div className="mb-12 space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-[2px] rounded-full" />
          <Skeleton className="w-32 h-4 rounded-full" />
        </div>
        
        <Skeleton className="h-12 md:h-14 w-full max-w-md rounded-2xl" />
        
        <Skeleton className="h-5 w-64 rounded-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div 
            key={item} 
            className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 flex flex-col h-full"
          >
            <Skeleton className="h-56 w-full rounded-none" />

            <div className="p-6 flex flex-col flex-1">
              <Skeleton className="h-3 w-32 rounded-full mb-4" />
              
              <div className="space-y-2 mb-4">
                <Skeleton className="h-6 w-full rounded-md" />
                <Skeleton className="h-6 w-2/3 rounded-md" />
              </div>
              
              <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                <div className="flex flex-col space-y-2">
                  <Skeleton className="h-2 w-12 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-md" />
                </div>
                
                <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
              </div>
            </div>
          </div>
        ))}
      </div>

      </div>
  );
}