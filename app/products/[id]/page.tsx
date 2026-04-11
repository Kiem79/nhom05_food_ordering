import data from "@/lib/data.json";
import Image from "next/image";
import { notFound } from "next/navigation";

// 1. Khai báo hàm generateStaticParams để Next.js biết cần tạo những trang nào lúc build
export async function generateStaticParams() {
  return data.map((item) => ({
    id: item.id.toString(),
  }));
}

// 2. Định nghĩa Interface cho Props (Giúp tránh lỗi TypeScript)
interface Props {
  params: Promise<{ id: string }> | { id: string };
}

export default async function ProductDetail({ params }: Props) {
  // Đảm bảo params đã được giải quyết (await) để tương thích với Next.js mới
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const product = data.find((item) => item.id.toString() === id);

  // Nếu không tìm thấy, sử dụng hàm notFound() chuẩn của Next.js
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Hình ảnh sản phẩm */}
        <div className="relative w-full h-80 rounded-foodie overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Thông tin chi tiết */}
        <div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            {product.name}
          </h1>

          <p className="text-secondary mb-4">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-primary mb-6">
            {product.price.toLocaleString()}đ
          </p>

          <button
            className="bg-primary text-white px-6 py-3 rounded-foodie hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-primary"
            type="button"
          >
            Thêm vào giỏ
          </button>
        </div>

      </div>
    </div>
  );
}