import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  images?: string[];
  restaurantName?: string;
  owner: string; 
}

interface CartStore {
  items: CartItem[];
  shippingFee: number;
  discountPercent: number;
  // Hợp nhất: Thêm sản phẩm kèm tên quán và người đặt
  addItem: (product: any, restaurantName: string, owner?: string) => void;
  // Xóa sản phẩm dựa trên ID và người đặt cụ thể
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

      addItem: (product, restaurantName, owner = "Host") => {
        const currentItems = get().items;
        const safeOwner = owner || "Host";
        
        // Tìm xem người này đã đặt món này chưa
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
          // Nếu món mới, gộp cả restaurantName và owner vào
          const newItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            images: product.images,
            restaurantName: restaurantName,
            quantity: 1,
            owner: safeOwner,
          };
          set({ items: [...currentItems, newItem] });
        }
      },

      removeItem: (id, owner) =>
        set({ 
          items: get().items.filter((i) => !(i.id === id && i.owner === owner)) 
        }),

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
        const c = code.toUpperCase();
        if (c === "GIAM20" || c === "FOODIE20") {
          set({ discountPercent: 20 });
          return { success: true, message: "Đã áp dụng mã giảm giá 20%!" };
        }
        if (c === "NHOM05") {
          set({ discountPercent: 50 });
          return { success: true, message: "Mã nhóm 05: Giảm ngay 50%!" };
        }
        return { success: false, message: "Mã giảm giá không tồn tại!" };
      },

      getSubTotal: () => 
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      
      getDiscountAmount: () => 
        (get().getSubTotal() * get().discountPercent) / 100,
      
      getFinalTotal: () => 
        get().getSubTotal() - get().getDiscountAmount() + get().shippingFee,
    }),
    { 
      name: 'foodie-cart-v2' // V2 để tránh xung đột với cache cũ của browser
    }
  )
);