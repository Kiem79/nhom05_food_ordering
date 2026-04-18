"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";
import useAuthStore from "@/store/authStore";

export default function CheckoutPage() {
  const router = useRouter();

  // authStore
  const { user } = useAuthStore();

  // cartStore
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  // orderStore
  const { addOrder } = useOrderStore();

  // state
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank">("cod");
  const [location, setLocation] = useState("cong-a");
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // fix hydration
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // check login
  useEffect(() => {
    if (!mounted) return;

    if (!user) {
      toast.error("Vui lòng đăng nhập để đặt món!");
      router.push("/auth/login");
    }
  }, [mounted, user, router]);

  if (!mounted) return null;

  // handle order
  const handleOrder = () => {
    if (!user) {
      toast.error("Phiên đăng nhập hết hạn!");
      return;
    }

    if (items.length === 0) {
      toast.error("Giỏ hàng đang trống!");
      return;
    }

    setIsProcessing(true);
    const loadingId = toast.loading("Đang xử lý đơn hàng...");

    setTimeout(() => {
      addOrder({
        id: `SOM-${Date.now()}`,
        date: new Date().toLocaleDateString(),
        total: getTotalPrice(),
        status: paymentMethod === "cod" ? "shipping" : "completed",
        items: items.map((item) => ({ ...item })),
      });

      toast.dismiss(loadingId);
      toast.success("Đặt hàng thành công!");

      // clear cart sau khi đặt
      clearCart();

      // chuyển sang trang thành công
      router.push("/order-success");

      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <Link href="/cart" className="text-secondary text-sm">
        ← Quay lại giỏ hàng
      </Link>

      <div className="grid lg:grid-cols-3 gap-10 mt-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">
          <h1 className="text-4xl font-bold text-primary">
            Thanh toán
          </h1>

          {/* LOCATION */}
          <div>
            <h3 className="text-secondary mb-4">
              Chọn điểm nhận
            </h3>

            <div className="flex gap-3 flex-wrap">
              {["cong-a", "cong-b", "thu-vien"].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`px-4 py-2 rounded-foodie border transition ${
                    location === loc
                      ? "bg-primary text-white"
                      : "bg-white"
                  }`}
                >
                  {loc === "cong-a"
                    ? "Cổng A"
                    : loc === "cong-b"
                    ? "Cổng B"
                    : "Thư viện"}
                </button>
              ))}
            </div>
          </div>

          {/* PAYMENT */}
          <div>
            <h3 className="text-secondary mb-4">
              Phương thức thanh toán
            </h3>

            <div className="flex gap-3">
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`px-4 py-2 rounded-foodie border transition ${
                  paymentMethod === "cod"
                    ? "bg-primary text-white"
                    : "bg-white"
                }`}
              >
                COD
              </button>

              <button
                onClick={() => setPaymentMethod("bank")}
                className={`px-4 py-2 rounded-foodie border transition ${
                  paymentMethod === "bank"
                    ? "bg-primary text-white"
                    : "bg-white"
                }`}
              >
                Bank
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 rounded-foodie border shadow-sm">
          <h3 className="font-bold mb-4">
            Đơn hàng
          </h3>

          {items.length === 0 ? (
            <p className="text-gray-400 text-sm">
              Giỏ hàng trống 😢
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm mb-3"
              >
                <span>
                  {item.name} x{item.quantity}
                </span>

                <span>
                  {(item.price * item.quantity).toLocaleString()}đ
                </span>
              </div>
            ))
          )}

          <div className="mt-6 pt-4 border-t font-bold text-primary text-lg">
            Tổng: {getTotalPrice().toLocaleString()}đ
          </div>

          <Button
            onClick={handleOrder}
            disabled={isProcessing}
            className="w-full mt-6"
          >
            {isProcessing
              ? "Đang xử lý..."
              : "Đặt hàng"}
          </Button>
        </div>
      </div>
    </div>
  );
}