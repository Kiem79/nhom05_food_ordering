import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: "completed" | "shipping";
  items: OrderItem[];
}

interface OrderState {
  orders: Order[];

  addOrder: (order: Order) => void;

  // 🔥 thêm cho dashboard
  getTotalSpent: () => number;
  getTotalOrders: () => number;
  getFavoriteFood: () => string | null;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      // ✅ chống trùng ID
      addOrder: (order) =>
        set((state) => {
          const exists = state.orders.find((o) => o.id === order.id);
          if (exists) return state;

          return {
            orders: [order, ...state.orders],
          };
        }),

      // 📊 tổng tiền
      getTotalSpent: () =>
        get().orders.reduce((sum, o) => sum + o.total, 0),

      // 📊 tổng đơn
      getTotalOrders: () => get().orders.length,

      // 📊 món ăn nhiều nhất
      getFavoriteFood: () => {
        const countMap: Record<string, number> = {};

        get().orders.forEach((order) => {
          order.items.forEach((item) => {
            countMap[item.name] =
              (countMap[item.name] || 0) + item.quantity;
          });
        });

        let max = 0;
        let favorite: string | null = null;

        for (const key in countMap) {
          if (countMap[key] > max) {
            max = countMap[key];
            favorite = key;
          }
        }

        return favorite;
      },
    }),
    {
      name: "order-storage",

      // ✅ chỉ lưu orders thôi
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);