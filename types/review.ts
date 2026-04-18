export interface Review {
  id: string;
  restaurantId: number;
  userName: string;
  rating: number; 
  comment: string;
  date: string;
  purchasedItemNames: string[]; 
}