import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  addedBy: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Omit<CartItem, "quantity" | "addedBy">, userName: string) => void;
  removeItem: (id: string, userName: string) => void;
  updateQuantity: (id: string, userName: string, delta: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, userName) => {
        const items = get().items;
        const existing = items.find((i) => i.id === product.id && i.addedBy === userName);
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === product.id && i.addedBy === userName ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1, addedBy: userName }] });
        }
      },
      removeItem: (id, userName) => {
        set({ items: get().items.filter((i) => !(i.id === id && i.addedBy === userName)) });
      },
      updateQuantity: (id, userName, delta) => {
        set({
          items: get().items.map((i) =>
            i.id === id && i.addedBy === userName ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
    }),
    { name: "foodie-cart-storage" }
  )
);