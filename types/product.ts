export interface Product {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  category: string[];
  images: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string;
  relatedIds: number[];
}