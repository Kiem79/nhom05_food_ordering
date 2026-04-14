import { useCartStore } from '@/store/cartStore';

export const useCart = () => {
  const store = useCartStore();
  const subtotal = store.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Tính tiền riêng cho từng người
  const totalPerUser = store.items.reduce((acc, item) => {
    acc[item.addedBy || 'Ẩn danh'] = (acc[item.addedBy || 'Ẩn danh'] || 0) + item.price * item.quantity;
    return acc;
  }, {} as Record<string, number>);

  return { ...store, subtotal, totalPerUser };
};