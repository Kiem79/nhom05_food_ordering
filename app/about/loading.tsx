import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div className="py-16 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center mb-16">
        <Skeleton className="h-10 w-80 max-w-full rounded-2xl mb-4" />
        <Skeleton className="h-6 w-64 max-w-full rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 container mx-auto">
        
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full">
            
            <Skeleton className="w-16 h-16 rounded-2xl mb-6" />
            
            <div className="space-y-3 mb-2">
              <Skeleton className="h-7 w-3/4 rounded-lg" />     
              <Skeleton className="h-5 w-1/2 rounded-md" />     
              <Skeleton className="h-4 w-1/3 rounded-md" />     
            </div>
            
            <div className="mt-auto pt-4 border-t border-slate-100 space-y-2">
              <Skeleton className="h-4 w-full rounded-md" />    
              <Skeleton className="h-4 w-4/5 rounded-md" />    
            </div>
            
            <div className="flex gap-4 pt-4 mt-4 border-t border-slate-100">
              <Skeleton className="w-9 h-9 rounded-full" />   
              <Skeleton className="w-9 h-9 rounded-full" />     
            </div>
            
          </div>
        ))}
        
      </div>
      
    </div>
  );
}