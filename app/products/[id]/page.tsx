import data from "@/lib/data.json";
import Image from "next/image";
import { notFound } from "next/navigation";

// BẮT BUỘC: Cho Next.js biết không có dữ liệu động nào khác ngoài danh sách đã khai báo
// Điều này giúp vượt qua lỗi build "output: export"
export const dynamicParams = false;

// 1. Khai báo hàm generateStaticParams để tạo các trang tĩnh tại thời điểm build
export async function generateStaticParams() {
  return data.map((item) => ({
    id: item.id.toString(),
  }));
}

// 2. Định nghĩa Interface cho Props
interface Props {
  params: Promise<{ id: string }> | { id: string };
}

export default async function ProductDetail({ params }: Props) {
  // Giải quyết params (Next.js 15+ yêu cầu await params)
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const product = data.find((item) => item.id.toString() === id);

  // Nếu không tìm thấy sản phẩm trong data.json
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