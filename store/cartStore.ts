import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  images?: string[];
  restaurantName?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: any, restaurantName: string) => void; // Fix tham số truyền vào
  removeItem: (id: string | number) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, restaurantName) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === product.id);
        
        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          // Gộp thông tin món ăn và tên quán vào 1 object
          const newItem: CartItem = {
            ...product,
            quantity: 1,
            restaurantName: restaurantName
          };
          set({ items: [...currentItems, newItem] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      clearCart: () => set({ items: [] }),
      totalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    { name: 'foodie-cart' }
  )
);