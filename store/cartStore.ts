import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string | number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;
        const exist = items.find((i) => i.id === product.id);

        if (exist) {
          set({
            items: items.map((i) =>
              i.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              { ...product, quantity: 1 }, // ✅ FIX ở đây
            ],
          });
        }
      },

      removeItem: (id) =>
        set({
          items: get().items.filter((i) => i.id !== id),
        }),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
    }),
    { name: "cart-storage" }
  )
);