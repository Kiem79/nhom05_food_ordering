"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import productsData from "@/lib/data/products.json";
import restaurantsData from "@/lib/data/stores.json";
import type { Product, Restaurant } from "@/types";

interface BreadcrumbsProps {
  customLabels?: Record<string, string>;
  restaurantInfo?: { id: string; name: string };
}

const routeLabels: Record<string, string> = {
  "restaurants": "Quán ăn",
  "products": "Thực đơn",
  "group-order": "Đặt nhóm",
  "cart": "Giỏ hàng",
  "history": "Lịch sử",
  "contact": "Liên hệ",
  "about": "Về chúng tôi",
  "dashboard": "Lịch sử",
  "help-center": "Trung tâm trợ giúp",
  "privacy-policy": "Chính sách bảo mật",
  "terms-of-service": "Điều khoản dịch vụ",
  "review": "Đánh giá"
};

export default function Breadcrumbs({ customLabels, restaurantInfo }: BreadcrumbsProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const getDynamicLabel = (segment: string) => {
    if (customLabels && customLabels[segment]) return customLabels[segment];

    const restaurants = restaurantsData.restaurants as Restaurant[];
    const products = productsData.products as Product[];

    const store = restaurants.find(r => String(r.id) === segment);
    if (store) return store.name;

    const product = products.find(p => String(p.id) === segment);
    if (product) return product.name;

    return decodeURIComponent(segment).replace(/-/g, ' ');
  };

  if (pathSegments[0] === "products" && pathSegments.length === 2) {
    const productId = pathSegments[1];
    const product = (productsData.products as Product[]).find(p => String(p.id) === productId);
    
    const displayStore = restaurantInfo || (restaurantsData.restaurants as Restaurant[]).find(r => String(r.id) === String(product?.restaurantId));
    const productName = customLabels?.[productId] || product?.name || "Chi tiết món";

    return (
      <nav className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
        <Link href="/" className="flex items-center gap-1.5 text-slate-400 hover:text-orange-500 transition-colors">
          <Home size={12} /> <span>Trang chủ</span>
        </Link>
        
        <ChevronRight size={12} className="text-slate-300" />
        <Link href="/restaurants" className="text-slate-400 hover:text-orange-500 transition-colors">Quán ăn</Link>
        
        {displayStore && (
          <>
            <ChevronRight size={12} className="text-slate-300" />
            <Link href={`/restaurants/${displayStore.id}`} className="text-slate-400 hover:text-orange-500 transition-colors">{displayStore.name}</Link>
          </>
        )}

        <ChevronRight size={12} className="text-slate-300" />
        <span className="text-orange-500 italic">{productName}</span>
      </nav>
    );
  }

  return (
    <nav className="w-full flex flex-wrap items-center justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-left">
      <Link href="/" className="flex items-center gap-1.5 text-slate-400 hover:text-orange-500 transition-colors">
        <Home size={12} />
        <span>Trang chủ</span>
      </Link>

      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        
        const label = index === 0 
          ? (routeLabels[segment] || getDynamicLabel(segment))
          : getDynamicLabel(segment);

        return (
          <div key={href} className="flex items-center gap-2">
            <ChevronRight size={12} className="text-slate-300" />
            {isLast ? (
              <span className="text-orange-500 italic">{label}</span>
            ) : (
              <Link href={href} className="text-slate-400 hover:text-orange-500 transition-colors">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}