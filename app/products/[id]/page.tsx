import productsData from "@/lib/data/products.json";
import restaurantsData from "@/lib/data/stores.json";
import type { Product, Restaurant } from "@/types";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const products = productsData.products as Product[];

  // 1. Tìm sản phẩm dựa trên ID từ URL
  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    notFound();
  }

  // 2. Tìm quán ăn dựa trên restaurantId có sẵn trong file products.json
  const restaurants = restaurantsData.restaurants as Restaurant[];
  const store = restaurants.find(
    (res) => String(res.id) === String(product.restaurantId)
  );

  // 3. Chuẩn bị thông tin quán ăn để truyền vào Breadcrumbs
  // Nếu tìm thấy store, ta lấy ID và Name để hiện nấc trung gian
  const restaurantInfo = store 
    ? { id: String(store.id), name: store.name } 
    : undefined;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28">
      {/* Truyền dữ liệu vào Breadcrumbs */}
      <Breadcrumbs 
        customLabels={{ [id]: product.name }} 
        restaurantInfo={restaurantInfo} 
      />
      
      <ProductDetailClient id={id} />
    </div>
  );
}