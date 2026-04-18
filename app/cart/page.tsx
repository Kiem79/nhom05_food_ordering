"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function Cart() {
  const { items, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Shopping Cart
        </h1>

        <p className="text-gray-500">
          Your cart is empty.
        </p>

        <Link
          href="/products"
          className="inline-block mt-6 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          Quay lại chọn món
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      {/* Danh sách món */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-3"
          >
            <span className="font-medium">
              {item.name} x{item.quantity}
            </span>

            <span className="font-semibold text-primary">
              {(item.price * item.quantity).toLocaleString()}đ
            </span>
          </div>
        ))}
      </div>

      {/* Tổng tiền */}
      <hr className="my-6" />

      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">
          Tổng:
        </p>

        <p className="text-xl font-bold text-orange-500">
          {getTotalPrice().toLocaleString()}đ
        </p>
      </div>

      {/* Nút thanh toán */}
      <div className="mt-8">
        <Link
          href="/checkout"
          className="block w-full text-center py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 transition"
        >
           Đặt hàng
        </Link>
      </div>
    </div>
  );
}