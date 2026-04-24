import RestaurantContent from "@/components/ui/RestaurantContent";
import restaurantsData from "@/lib/data/stores.json";
import type { Restaurant } from "@/types";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import * as Reviews from "@/lib/data/review";

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

  const reviewKey = `REVIEWS_RESTAURANT_${id}` as keyof typeof Reviews;
  const rawReviews = Reviews[reviewKey];
  const reviews = Array.isArray(rawReviews) ? rawReviews : [];
  
  const totalReviews = reviews.length;
  const actualRating = totalReviews > 0 
    ? (reviews.reduce((acc: number, curr: { rating: number }) => acc + curr.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24">
      <Breadcrumbs />
      <RestaurantContent 
        id={id} 
        actualRating={actualRating} 
        totalReviews={totalReviews} 
      />
    </div>
  );
}
