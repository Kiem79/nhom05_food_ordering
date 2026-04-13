export type OrderStatus = "Đang xử lý" | "Đang chuẩn bị" | "Đang giao" | "Hoàn thành" | "Đã hủy";

export interface OrderItem {
  id: number;          
  name: string;        
  price: number;      
  quantity: number;   
  image: string;       
}

export interface Order {
  id: string;           
  date: string;        
  restaurantId: number;
  restaurantName: string; 
  items: OrderItem[];   
  total: number;        
  status: OrderStatus;  
  address?: string;      
  note?: string;        
}