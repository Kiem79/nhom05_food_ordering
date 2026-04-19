"use client";

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
  displayImage?: string;
  restaurantId?: number | string;
}

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  displayImage?: string;
  restaurantId: number;
  owner: string;
  note?: string; // Tính năng ghi chú từ phiên bản 2
}

interface CartStore {
  items: CartItem[];
  discountPercent: number;
  discountFixed: number;
  addItem: (product: Product, owner?: string) => void;
  removeItem: (id: string | number, owner: string) => void;
  updateQuantity: (id: string | number, owner: string, quantity: number) => void;
  updateNote: (id: string | number, owner: string, note: string) => void; // Hàm ghi chú từ phiên bản 2
  clearCart: () => void;
  applyVoucher: (code: string) => { success: boolean; message: string };
  getSubTotal: () => number;
  getDiscountAmount: () => number;
  getFinalTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      discountPercent: 0,
      discountFixed: 0,

      addItem: (product, owner = "Host") => {
        const currentItems = get().items;
        let safeOwner = owner || "Host";

        if (RESTAURANT_NAMES.some((name) => safeOwner.toUpperCase() === name.toUpperCase())) {
          safeOwner = "Host";
        }

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
          return;
        }

        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          displayImage: product.displayImage ?? product.image ?? "",
          restaurantId: product.restaurantId ? Number(product.restaurantId) : 1,
          quantity: 1,
          owner: safeOwner,
          note: "", // Khởi tạo ghi chú trống
        };
        set({ items: [...currentItems, newItem] });
      },

      removeItem: (id, owner) => {
        set({
          items: get().items.filter((item) => !(item.id === id && item.owner === owner)),
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
          discountFixed: 0,
        }),

      applyVoucher: (code) => {
        const c = code.trim().toUpperCase();

        if (c === "GIAM10") {
          set({ discountPercent: 10, discountFixed: 0 });
          return { success: true, message: "Đã áp dụng mã Giảm 10% cho đơn đầu tiên!" };
        }

        if (c === "GIAM20" ) {
          set({ discountPercent: 20, discountFixed: 0 });
          return { success: true, message: "Đã áp dụng mã giảm giá 20%!" };
        }

        if (c === "FREESHIP") {
          set({ discountPercent: 0, discountFixed: 15000 });
          return { success: true, message: "Đã giảm 15.000đ vào tổng đơn!" };
        }

        return { success: false, message: "Mã giảm giá không tồn tại!" };
      },

      getSubTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const sub = get().getSubTotal();
        const percentDiscount = (sub * get().discountPercent) / 100;
        const totalDiscount = percentDiscount + get().discountFixed;
        
        // Đảm bảo không giảm lố số tiền của đơn hàng
        return Math.min(totalDiscount, sub);
      },

      getFinalTotal: () => {
        const sub = get().getSubTotal();
        const discount = get().getDiscountAmount();
        
        return sub - discount;
      },
    }),
    {
      name: "foodie-cart-v6",
    }
  )
);