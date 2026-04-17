import RestaurantContent from "@/components/ui/RestaurantContent";
import restaurantsData from "@/lib/data/stores.json";
import type { Restaurant } from "@/types";
import Breadcrumbs from "@/components/ui/Breadcrumbs"; // Nhập component Breadcrumbs

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const restaurants = restaurantsData.restaurants as Restaurant[];

  return restaurants.map((restaurant) => ({
    id: String(restaurant.id),
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const restaurants = restaurantsData.restaurants as Restaurant[];
  const restaurant = restaurants.find((r) => String(r.id) === id);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24">
      <Breadcrumbs />
      <RestaurantContent id={id} />
    </div>
  );
}