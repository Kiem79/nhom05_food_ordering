import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="bg-white animate-in fade-in duration-500">
      
      {/* 1. HERO SECTION SKELETON */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-28 md:pb-32 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 flex flex-col items-center md:items-start w-full z-10">
          {/* Badge */}
          <Skeleton className="h-8 w-64 rounded-full" />
          
          {/* Tiêu đề H1 (2 dòng) */}
          <div className="space-y-4 w-full flex flex-col items-center md:items-start">
            <Skeleton className="h-14 md:h-[4.5rem] w-full max-w-md rounded-2xl" />
            <Skeleton className="h-14 md:h-[4.5rem] w-3/4 max-w-sm rounded-2xl" />
          </div>
          
          {/* Đoạn văn mô tả */}
          <div className="space-y-3 w-full max-w-xl flex flex-col items-center md:items-start">
            <Skeleton className="h-6 w-full rounded-full" />
            <Skeleton className="h-6 w-5/6 rounded-full" />
          </div>

          {/* 2 Nút bấm */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center md:justify-start">
            <Skeleton className="h-16 w-full sm:w-48 rounded-2xl" />
            <Skeleton className="h-16 w-full sm:w-56 rounded-2xl" />
          </div>
        </div>

        {/* Cột phải: Ảnh lớn */}
        <div className="flex-1 relative w-full">
          <Skeleton className="h-[450px] w-full rounded-[2.5rem]" />
        </div>
      </section>

      {/* 2. FEATURES SECTION SKELETON */}
      <section className="bg-slate-50/50 py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tiêu đề Section */}
          <div className="text-center mb-16 space-y-4 flex flex-col items-center">
            <Skeleton className="h-4 w-40 rounded-full" />
            <Skeleton className="h-10 w-80 max-w-full rounded-xl" />
          </div>

          {/* 3 Cards Đặc quyền */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-10 rounded-[2.5rem] border border-white shadow-sm flex flex-col">
                <Skeleton className="w-16 h-16 rounded-2xl mb-6" />
                <Skeleton className="h-7 w-48 rounded-lg mb-4" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-5/6 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA SECTION SKELETON */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl flex flex-col items-center">
          {/* Icon trên cùng */}
          <Skeleton className="w-20 h-20 rounded-3xl bg-slate-800 mb-8" />
          
          {/* Tiêu đề lớn */}
          <div className="space-y-4 w-full flex flex-col items-center mb-8">
            <Skeleton className="h-12 md:h-16 w-3/4 max-w-md rounded-2xl bg-slate-800" />
            <Skeleton className="h-12 md:h-16 w-1/2 max-w-xs rounded-2xl bg-slate-800 md:hidden" /> {/* Dòng 2 chỉ hiện ở mobile theo code gốc */}
          </div>
          
          {/* Mô tả */}
          <div className="space-y-3 w-full flex flex-col items-center max-w-md">
            <Skeleton className="h-5 w-full rounded-full bg-slate-800" />
            <Skeleton className="h-5 w-4/5 rounded-full bg-slate-800" />
          </div>
          
          {/* Nút bấm */}
          <div className="pt-6 w-full flex justify-center">
            <Skeleton className="h-16 w-52 rounded-2xl bg-slate-700/50" />
          </div>
        </div>
      </section>

    </div>
  );
}