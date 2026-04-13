"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import { useOrderStore } from "@/store/orderStore";
import Image from "next/image";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  const { user } = useAuthStore();
  const {
    getTotalOrders,
    getTotalSpent,
    getFavoriteFood,
  } = useOrderStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // 👉 tránh hydration mismatch
  if (!mounted) return null;

  const totalOrders = getTotalOrders();
  const totalSpent = getTotalSpent();
  const favoriteFood = getFavoriteFood() || "Chưa có";

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

      {/* USER INFO */}
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-foodie overflow-hidden bg-secondary/20">
          <Image
            src={user?.avatar || "/images/avatar.png"}
            alt="avatar"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-primary">
            {user?.name || "User"}
          </h1>
          <p className="text-black text-sm">
            Chào mừng quay lại 👋
          </p>
        </div>
      </div>

      {/* EMPTY STATE */}
      {totalOrders === 0 && (
        <p className="text-black text-center">
          Bạn chưa có đơn hàng nào 😢
        </p>
      )}

      {/* STATS */}
      {totalOrders > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-foodie border">
            <p className="text-black">Tổng đơn</p>
            <h2 className="text-2xl font-bold text-primary">
              {totalOrders}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-foodie border">
            <p className="text-black">Tổng chi tiêu</p>
            <h2 className="text-2xl font-bold text-primary">
              {totalSpent?.toLocaleString("vi-VN")}đ
            </h2>
          </div>

          <div className="bg-white p-6 rounded-foodie border">
            <p className="text-black">Món yêu thích</p>
            <h2 className="text-2xl font-bold text-primary">
              {favoriteFood}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}