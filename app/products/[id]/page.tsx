import React from "react";

// 1. Khai báo params tĩnh để Next.js có thể xuất file HTML (Fix lỗi Export)
export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}

// 2. Định nghĩa Interface để TypeScript không báo lỗi
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  // Đợi params được resolve theo chuẩn Next.js 15+
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-3xl font-black text-slate-900 mb-4">
          Chi tiết món ăn
        </h1>
        
        <div className="p-4 bg-orange-50 rounded-xl inline-block border border-orange-100">
          <p className="text-[#F97316] font-bold underline decoration-2 underline-offset-4">
            Mã sản phẩm: #{id}
          </p>
        </div>

        <div className="mt-8 p-4 bg-blue-50 text-blue-700 rounded-lg text-sm">
          <strong>Thông báo cho Team:</strong> Đây là trang tạm thời để Mạnh fix lỗi build hệ thống. 
          Thảo Nguyên sẽ vào đây thiết kế UI chi tiết sau nhé!
        </div>
      </div>
    </div>
  );
}