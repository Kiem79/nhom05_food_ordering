import RestaurantContent from "@/components/ui/RestaurantContent";
import restaurantsData from "@/lib/data/stores.json";
import type { Restaurant } from "@/types";

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

  return <RestaurantContent id={id} />;
}