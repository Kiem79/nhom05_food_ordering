import RestaurantContent from "@/components/ui/RestaurantContent";
import restaurantsData from "@/lib/data/stores.json";

// Sinh ra danh sách ID lúc Build
export async function generateStaticParams() {
  return restaurantsData.restaurants.map((r: any) => ({
    id: String(r.id),
  }));
}

// BẮT BUỘC: Next.js 15+ phải dùng async/await cho params
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <RestaurantContent id={resolvedParams.id} />;
}