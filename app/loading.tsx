import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row items-center gap-10 py-16 px-4 max-w-7xl mx-auto">
        <div className="flex-1 space-y-6 w-full">
          <Skeleton className="h-8 w-64 rounded-full mb-6" /> 
          
          <div className="space-y-3">
            <Skeleton className="h-16 w-full max-w-md rounded-2xl" /> 
            <Skeleton className="h-16 w-3/4 max-w-sm rounded-2xl" /> 
          </div>

          <div className="space-y-2 pt-4">
            <Skeleton className="h-5 w-full max-w-lg rounded-full" /> 
            <Skeleton className="h-5 w-4/5 max-w-md rounded-full" />
          </div>

          <div className="flex flex-wrap gap-4 pt-6">
            <Skeleton className="h-14 w-44 rounded-full" /> 
            <Skeleton className="h-14 w-52 rounded-full" /> 
          </div>
        </div>

        <div className="flex-1 w-full">
          <Skeleton className="h-[400px] w-full rounded-[3rem]" />
        </div>
      </div>

      <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <Skeleton className="h-4 w-40 rounded-full" />
          <Skeleton className="h-10 w-80 rounded-2xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-start shadow-sm">
              <Skeleton className="h-14 w-14 rounded-2xl mb-6" /> 
              <Skeleton className="h-7 w-48 rounded-lg mb-4" /> 
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-full rounded-full" /> 
                <Skeleton className="h-4 w-5/6 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16 px-4 max-w-7xl mx-auto mb-16">
        <div className="bg-[#0f172a] rounded-[3rem] p-12 md:p-20 flex flex-col items-center text-center shadow-xl">
          
          <Skeleton className="h-16 w-16 rounded-2xl bg-slate-800 mb-8" /> 
          
          <Skeleton className="h-14 w-3/4 max-w-xl rounded-2xl bg-slate-800 mb-6" /> 
          
          <div className="space-y-3 w-full flex flex-col items-center mb-10">
            <Skeleton className="h-5 w-2/3 max-w-lg rounded-full bg-slate-800" />
            <Skeleton className="h-5 w-1/2 max-w-md rounded-full bg-slate-800" />
          </div>
          
          <Skeleton className="h-14 w-48 rounded-full bg-slate-700/50" /> 
        </div>
      </div>

    </div>
  );
}