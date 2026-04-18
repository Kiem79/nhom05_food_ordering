"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";

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
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
    });

    toast.success("Đã thêm vào giỏ hàng 🛒");
  };

  return (
    <div className="bg-white border rounded-foodie overflow-hidden">
      <div className="relative w-full h-64">
  <Image
  src={product.images?.[0] || "/images/fallback.webp"}
  alt={product.name}
  fill
  className="object-cover"
/>
      </div>

      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>

        <p className="text-sm text-gray-500">
          {product.description}
        </p>

        <div className="flex justify-between mt-4">
          <span className="font-bold">
            {product.price.toLocaleString()}đ
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;