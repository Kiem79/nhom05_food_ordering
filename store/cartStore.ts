"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

export interface CartItem extends Product {
  quantity: number;
  restaurantName: string;
  owner: string;
  images: string[];
}

interface CartStore {
  items: CartItem[];
  shippingFee: number;
  discountPercent: number;

  addItem: (product: Product, restaurantName: string, owner?: string) => void;
  removeItem: (id: number, owner?: string) => void;
  updateQuantity: (id: number, deltaOrQuantity: number, owner?: string) => void;

  clearCart: () => void;
  setShippingFee: (fee: number) => void;

  applyVoucher: (code: string) => { success: boolean; message: string };

  totalPrice: () => number;
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

      // ================= ADD ITEM =================
      addItem: (product, restaurantName, owner = "Host") => {
        const safeOwner = owner || "Host";
        const currentItems = get().items;

        const productId = Number(product.id);

        const existingItem = currentItems.find(
          (item) =>
            Number(item.id) === productId &&
            item.owner === safeOwner
        );

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              Number(item.id) === productId &&
              item.owner === safeOwner
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item
            ),
          });
          return;
        }

        const newItem: CartItem = {
          ...product,

          // 🔥 FIX QUAN TRỌNG: luôn giữ images
          images: product.images ?? ["/placeholder-food.png"],

          id: productId,
          quantity: 1,
          restaurantName,
          owner: safeOwner,
        };

        set({
          items: [...currentItems, newItem],
        });
      },

      // ================= REMOVE =================
      removeItem: (id, owner) => {
        const safeId = Number(id);

        if (!owner) {
          set({
            items: get().items.filter(
              (item) => Number(item.id) !== safeId
            ),
          });
          return;
        }

        set({
          items: get().items.filter(
            (item) =>
              !(Number(item.id) === safeId && item.owner === owner)
          ),
        });
      },

      // ================= UPDATE =================
      updateQuantity: (id, deltaOrQuantity, owner) => {
        const safeId = Number(id);
        const currentItems = get().items;

        set({
          items: currentItems.map((item) => {
            const matched =
              Number(item.id) === safeId &&
              (!owner || item.owner === owner);

            if (!matched) return item;

            if (owner) {
              return {
                ...item,
                quantity: Math.max(1, deltaOrQuantity),
              };
            }

            return {
              ...item,
              quantity: Math.max(
                1,
                item.quantity + deltaOrQuantity
              ),
            };
          }),
        });
      },

      // ================= CLEAR =================
      clearCart: () =>
        set({
          items: [],
          discountPercent: 0,
          shippingFee: 15000,
        }),

      setShippingFee: (fee) => set({ shippingFee: fee }),

      // ================= VOUCHER =================
      applyVoucher: (code) => {
        const c = code.trim().toUpperCase();

        if (c === "GIAM20" || c === "FOODIE20") {
          set({ discountPercent: 20 });
          return {
            success: true,
            message: "Đã áp dụng mã giảm 20%",
          };
        }

        if (c === "NHOM05") {
          set({ discountPercent: 50 });
          return {
            success: true,
            message: "Mã nhóm: giảm 50%",
          };
        }

        return {
          success: false,
          message: "Mã không tồn tại",
        };
      },

      // ================= TOTAL =================
      totalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),

      getSubTotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),

      getDiscountAmount: () =>
        (get().getSubTotal() * get().discountPercent) / 100,

      getFinalTotal: () =>
        get().getSubTotal() - get().getDiscountAmount(),
    }),
    {
      name: "foodie-cart-v3",
    }
  )
);