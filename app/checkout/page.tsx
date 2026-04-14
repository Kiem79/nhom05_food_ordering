"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import {
  CheckCircle2,
  Loader2,
  Sparkles,
=======
import { 
  MapPin, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  ArrowLeft, 
  Loader2, 
  Sparkles 
>>>>>>> main
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { items, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank">("cod");
  const [location, setLocation] = useState("cong-a");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 🔐 Check login
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Vui lòng đăng nhập để đặt món!");
      router.push("/auth/login");
    }
  }, [status, router]);

  // ✅ HANDLE ORDER
  const handleOrder = () => {
    if (!session) {
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
      // 🔥 QUAN TRỌNG: clone items
      addOrder({
        id: `SOM-${Date.now()}`,
        date: new Date().toLocaleDateString(),
        total: getTotalPrice(),
        status: paymentMethod === "cod" ? "shipping" : "completed",
        items: items.map((item) => ({ ...item })), // ✅ FIX BUG
      });

      toast.dismiss(loadingId);
      toast.success("Đặt hàng thành công!");

      clearCart();
      setIsSuccess(true);
      setIsProcessing(false);
    }, 1500);
  };

  // ⏳ Loading
  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-secondary text-sm">
          Đang kiểm tra quyền truy cập...
        </p>
      </div>
    );
  }

  // ✅ SUCCESS UI
  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto py-32 text-center space-y-10">
        <div className="relative inline-block">
          <div className="w-28 h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={56} />
          </div>
          <div className="absolute -top-2 -right-2 text-primary animate-bounce">
            <Sparkles size={28} />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-primary">
          Đặt hàng thành công!
        </h1>

        <p className="text-secondary">
          Bạn nhớ ra{" "}
          <span className="text-primary font-bold">
            {location === "cong-a"
              ? "Cổng A"
              : location === "cong-b"
              ? "Cổng B"
              : "Thư viện"}
          </span>{" "}
          nhận đồ nhé!
        </p>

        <Button onClick={() => router.push("/")}>
          Về trang chủ
        </Button>
      </div>
    );
  }

  // 🧾 MAIN UI
  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <Link href="/group-order" className="text-secondary text-sm">
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
            <h3 className="text-secondary mb-4">Chọn điểm nhận</h3>
            <div className="flex gap-3">
              {["cong-a", "cong-b", "thu-vien"].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`px-4 py-2 rounded-foodie border ${
                    location === loc
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  {loc}
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
                className={`px-4 py-2 rounded-foodie border ${
                  paymentMethod === "cod"
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                COD
              </button>

              <button
                onClick={() => setPaymentMethod("bank")}
                className={`px-4 py-2 rounded-foodie border ${
                  paymentMethod === "bank"
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                Bank
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 rounded-foodie border">
          <h3 className="font-bold mb-4">Đơn hàng</h3>

          {items.length === 0 ? (
            <p className="text-gray-400 text-sm">
              Giỏ hàng trống 😢
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm mb-2"
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

          <div className="mt-4 font-bold text-primary">
            Tổng: {getTotalPrice().toLocaleString()}đ
          </div>

          <Button
            onClick={handleOrder}
            disabled={isProcessing}
            className="w-full mt-6"
          >
            {isProcessing ? "Đang xử lý..." : "Đặt hàng"}
          </Button>
        </div>
      </div>
    </div>
  );
}