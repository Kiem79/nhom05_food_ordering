import data from "@/lib/data.json";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  return data.map((item) => ({
    id: item.id.toString(),
  }));
}

// ✅ Params chuẩn Next.js 15 (KHÔNG dùng Promise)
interface Props {
  params: { id: string };
}

export default function ProductDetail({ params }: Props) {
  const { id } = params;

  // Tìm sản phẩm theo id
  const product = data.find(p => p.id === Number(params.id));

  // Không có thì 404
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">

        {/* Hình ảnh */}
        <div className="relative w-full h-80 rounded-foodie overflow-hidden bg-gray-100">
          <Image
            src={product.images?.[0] || "/images/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Thông tin */}
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
            className="bg-primary text-white px-6 py-3 rounded-foodie hover:opacity-90 transition"
            type="button"
          >
            Thêm vào giỏ
          </button>
        </div>

      </div>
    </div>
  );
}