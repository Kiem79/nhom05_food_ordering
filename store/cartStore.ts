import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  images?: string[];
  restaurantName?: string;
  owner: string; // [cite: 571, 679]
}

interface CartStore {
  items: CartItem[];
  shippingFee: number;
  discountPercent: number;
  addItem: (item: Omit<CartItem, 'quantity' | 'owner'>, owner?: string) => void;
  removeItem: (id: string | number, owner: string) => void;
  updateQuantity: (id: string | number, owner: string, quantity: number) => void;
  clearCart: () => void;
  setShippingFee: (fee: number) => void;
  applyVoucher: (code: string) => { success: boolean; message: string };
  getSubTotal: () => number;
  getDiscountAmount: () => number;
  getFinalTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      shippingFee: 15000,
      discountPercent: 0,
      addItem: (product, owner = "Host") => {
        const currentItems = get().items;
        const safeOwner = owner || "Host";
        const existingItem = currentItems.find(
          (item) => item.id === product.id && item.owner === safeOwner
        );
        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id && item.owner === safeOwner
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1, owner: safeOwner }] });
        }
      },
      removeItem: (id, owner) =>
        set({ items: get().items.filter((i) => !(i.id === id && i.owner === owner)) }),
      updateQuantity: (id, owner, quantity) =>
        set({
          items: get().items.map((item) =>
            item.id === id && item.owner === owner
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        }),
      clearCart: () => set({ items: [], discountPercent: 0, shippingFee: 15000 }),
      setShippingFee: (fee) => set({ shippingFee: fee }),
      applyVoucher: (code) => {
        if (code.toUpperCase() === "GIAM20") {
          set({ discountPercent: 20 });
          return { success: true, message: "Áp dụng thành missionary mã giảm 20%!" };
        }
        return { success: false, message: "Mã giảm giá không hợp lệ!" };
      },
      getSubTotal: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      getDiscountAmount: () => (get().getSubTotal() * get().discountPercent) / 100,
      getFinalTotal: () => get().getSubTotal() - get().getDiscountAmount(),
    }),
    { name: 'foodie-cart-v2' }
  )
);