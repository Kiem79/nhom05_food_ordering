import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

// Định nghĩa lại CartItem dựa trên Product nhưng ép thêm restaurantName
export interface CartItem extends Product {
  quantity: number;
  restaurantName: string; // Bỏ dấu '?' để bắt buộc phải có tên nhà hàng
}

interface CartState {
  items: CartItem[];
  // Cập nhật tham số: restaurantName là bắt buộc để đồng bộ Dashboard
  addItem: (product: Product, restaurantName: string) => void; 
  removeItem: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, restaurantName) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);

        if (existingItem) {
          // Nếu đã có món này trong giỏ, tăng số lượng
          set({
            items: currentItems.map((item) =>
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ),
          });
        } else {
          // Nếu món mới, thêm vào giỏ kèm thông tin nhà hàng "snapshot"
          set({ 
            items: [
              ...currentItems, 
              { 
                ...product, 
                quantity: 1, 
                restaurantName: restaurantName // Lưu tên nhà hàng ngay tại đây
              }
            ] 
          });
        }
      },

      removeItem: (id) => 
        set({ items: get().items.filter((i) => i.id !== id) }),

      updateQuantity: (id, delta) => {
        const currentItems = get().items;
        set({
          items: currentItems.map((item) =>
            item.id === id 
              ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      totalPrice: () => 
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    { 
      name: "foodie-cart-storage", // Đổi tên key cho chuyên nghiệp
    }
  )
);