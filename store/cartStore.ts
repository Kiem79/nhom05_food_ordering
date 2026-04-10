import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create()(
  persist(
    (set, get: any) => ({ // Thêm 'get' ở đây để lấy dữ liệu trong store
      items: [],
      addItem: (product: any) => 
        set((state: any) => {
          const existingItem = state.items.find((item: any) => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item: any) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),
      
      // HÀM QUAN TRỌNG ĐỂ FIX LỖI ĐANG GẶP:
      getTotalPrice: () => {
        const items = get().items || [];
        return items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
      },

      clearCart: () => set({ items: [] }),
    }),
    { name: 'foodie-cart-storage' }
  )
);