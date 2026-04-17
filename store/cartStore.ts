import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const RESTAURANT_NAMES = [
  "Cơm tấm Cô Ba",
  "Bún Phở Ba Miền",
  "Bếp Bánh Ngọc Thảo",
  "Ellen's Healthy Kitchen",
  "Bunkr - Fast Food",
  "Hot N' Grilled Saigon",
  "1997 Drinks",
  "Tiệm Chay An Nhiên"
];

export interface Product {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  images?: string[];
  restaurantId?: number | string;
}

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  restaurantId: number;
  owner: string;
  note?: string; 
}

interface CartStore {
  items: CartItem[];
  shippingFee: number;
  discountPercent: number;

  addItem: (product: Product, owner?: string) => void;
  removeItem: (id: string | number, owner: string) => void;
  updateQuantity: (id: string | number, owner: string, quantity: number) => void;
  updateNote: (id: string | number, owner: string, note: string) => void;
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

        let safeOwner = owner || "Host";

        if (
          RESTAURANT_NAMES.some(
            (name) => safeOwner.toUpperCase() === name.toUpperCase()
          )
        ) {
          safeOwner = "Host";
        }

        const existingItem = currentItems.find(
          (item) =>
            item.id === product.id && item.owner === safeOwner
        );

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id && item.owner === safeOwner
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
          return;
        }

        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          images: product.images ?? (product.image ? [product.image] : []),
          restaurantId: product.restaurantId
            ? Number(product.restaurantId)
            : 1,
          quantity: 1,
          owner: safeOwner,
          note: "", 
        };

        set({ items: [...currentItems, newItem] });
      },

      removeItem: (id, owner) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === id && item.owner === owner)
          ),
        });
      },

      updateQuantity: (id, owner, quantity) => {
        set({
          items: get().items.map((item) =>
            item.id === id && item.owner === owner
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        });
      },

      updateNote: (id, owner, note) => {
        set({
          items: get().items.map((item) =>
            item.id === id && item.owner === owner
              ? { ...item, note: note }
              : item
          ),
        });
      },

      clearCart: () =>
        set({
          items: [],
          discountPercent: 0,
          shippingFee: 15000,
        }),

      setShippingFee: (fee) => set({ shippingFee: fee }),

      applyVoucher: (code) => {
        const c = code.trim().toUpperCase();

        if (c === "GIAM20" || c === "FOODIE20") {
          set({ discountPercent: 20 });
          return {
            success: true,
            message: "Đã áp dụng mã giảm giá 20%!",
          };
        }

        if (c === "NHOM05") {
          set({ discountPercent: 50 });
          return {
            success: true,
            message: "Mã nhóm 05: Giảm ngay 50%!",
          };
        }

        return {
          success: false,
          message: "Mã giảm giá không tồn tại!",
        };
      },

      getSubTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getDiscountAmount: () => {
        const sub = get().getSubTotal();
        return (sub * get().discountPercent) / 100;
      },

      getFinalTotal: () => {
        const sub = get().getSubTotal();
        const discount = get().getDiscountAmount();
        const shipping = get().shippingFee;

        return sub - discount + shipping;
      },
    }),
    {
      name: "foodie-cart-v6",
    }
  )
);