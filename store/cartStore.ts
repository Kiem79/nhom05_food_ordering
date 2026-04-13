import { create } from "zustand";
import { persist } from "zustand/middleware";

// Định nghĩa cấu trúc món ăn có thêm 'owner' để biết ai đặt món đó
interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  owner: string; // Tên người đặt (Mặc định là "Host" hoặc tên bạn bè từ Demo)
}
interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  voucherCode: string | null;
  discountPercent: number;
  shippingFee: number; // Phí ship động theo khu vực TPHCM

  // Actions cho giỏ hàng
  // owner = "Host" là giá trị mặc định để tránh lỗi undefined
  addItem: (product: Product, owner?: string) => void; 
  removeItem: (id: string | number, owner: string) => void;
  updateQuantity: (id: string | number, owner: string, quantity: number) => void;
  clearCart: () => void;
  
  // Actions cho Voucher & Phí ship
  setShippingFee: (fee: number) => void;
  applyVoucher: (code: string) => { success: boolean; message: string };
  removeVoucher: () => void;

  // Bộ não tính toán (Dùng cho cả 2 trang)
  getSubTotal: () => number;
  getDiscountAmount: () => number;
  getFinalTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      voucherCode: null,
      discountPercent: 0,
      shippingFee: 15000, // Mặc định Thủ Đức

      // Thêm món: Nếu không truyền owner, hệ thống tự hiểu là "Host"
      addItem: (product, owner = "Host") => {
        const currentItems = get().items;
        // Đảm bảo owner luôn có giá trị hợp lệ (không trống)
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

      // Xóa món: Xóa đúng món của đúng người
      removeItem: (id, owner) => 
        set({ 
            items: get().items.filter((i) => !(i.id === id && i.owner === owner)) 
        }),

      // Cập nhật số lượng
      updateQuantity: (id, owner, quantity) =>
        set({
          items: get().items.map((item) =>
            item.id === id && item.owner === owner 
              ? { ...item, quantity: Math.max(1, quantity) } 
              : item
          ),
        }),

      clearCart: () => set({ 
        items: [], 
        voucherCode: null, 
        discountPercent: 0, 
        shippingFee: 15000 
      }),

      setShippingFee: (fee) => set({ shippingFee: fee }),

      applyVoucher: (code) => {
        const upperCode = code.toUpperCase().trim();
        if (upperCode === "GIAM20") {
          set({ voucherCode: upperCode, discountPercent: 20 });
          return { success: true, message: "Áp dụng thành công mã giảm 20%!" };
        }
        return { success: false, message: "Mã giảm giá không hợp lệ!" };
      },

      removeVoucher: () => set({ voucherCode: null, discountPercent: 0 }),

      // --- CÁC HÀM TÍNH TOÁN CHI TIẾT ---
      // getSubTotal: Tính tổng tiền món ăn (đã lọc các món không hợp lệ)
      getSubTotal: () => 
        get().items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0),

      getDiscountAmount: () => 
        (get().getSubTotal() * (get().discountPercent || 0)) / 100,

      getFinalTotal: () => 
        get().getSubTotal() - get().getDiscountAmount(),
    }),
    { name: "cart-storage" }
  )
);