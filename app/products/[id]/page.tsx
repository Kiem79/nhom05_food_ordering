import productsData from "@/lib/data/products.json";
import type { Product } from "@/types";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  const products = productsData.products as Product[];

  return products.map((product) => ({
    id: String(product.id),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const products = productsData.products as Product[];

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  return {
    title: product
      ? `${product.name} | Food Ordering`
      : "Chi tiết món ăn",
    description:
      product?.description || "Xem chi tiết món ăn ngon hấp dẫn",
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  const products = productsData.products as Product[];

  const productExists = products.some(
    (item) => String(item.id) === String(id)
  );

  if (!productExists) {
    notFound();
  }

  return <ProductDetailClient id={id} />;
}