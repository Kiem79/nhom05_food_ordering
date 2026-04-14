"use client";

import { useCartStore } from "@/store/cartStore";

export default function Cart() {
  const { items, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {items.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <span>
            {item.name} x{item.quantity}
          </span>
          <span>
            {(item.price * item.quantity).toLocaleString()}đ
          </span>
        </div>
      ))}

      <hr className="my-4" />

      <p className="font-bold">
        Tổng: {getTotalPrice().toLocaleString()}đ
      </p>
    </div>
  );
}