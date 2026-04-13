export interface RestaurantContact {
  phone: string;
  email: string;
}

export interface Restaurant {
  id: number;
  name: string;
  slug: string;
  description: string;
  address: string;
  phoneNumber: string;
  openingHours: string;
  rating: number;
  category: string[];
  averagePrice: number;
  images: string[];
  menuIds: number[];
  contact: RestaurantContact;
  status: "Đang mở cửa" | "Đóng cửa";
  tags: string[];
  badges: string[];
  popularProductIds: number[];
}