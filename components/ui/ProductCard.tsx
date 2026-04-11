"use client";

import Image from "next/image";
import { toast } from "sonner";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
};

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const handleAddToCart = () => {
    toast.success("Đã thêm vào giỏ hàng 🛒");
  };

  return (
    <div className="bg-white border border-gray-100 rounded-foodie shadow-sm overflow-hidden hover:shadow-md transition">
      
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        
        <h3 className="text-lg font-semibold text-primary line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-secondary mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          
          <span className="text-primary font-bold">
            {product.price.toLocaleString()}đ
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            className="bg-primary text-white px-4 py-2 rounded-foodie text-sm hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`Thêm ${product.name} vào giỏ hàng`}
          >
            Thêm
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;