import RestaurantContent from "@/components/ui/RestaurantContent";
import restaurantsData from "@/lib/data/stores.json";

export async function generateStaticParams() {
  return restaurantsData.restaurants.map((r: any) => ({
    id: String(r.id),
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <RestaurantContent id={resolvedParams.id} />;
}