import data from "@/lib/data.json";
import Image from "next/image";

// generate static params (bắt buộc cho export)
export async function generateStaticParams() {
  return data.map((item) => ({
    id: item.id.toString(),
  }));
}

export default function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = data.find((item) => item.id.toString() === params.id);

  // nếu không tìm thấy
  if (!product) {
    return <div className="p-6">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Image */}
        <div className="relative w-full h-80 rounded-foodie overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Info */}
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