"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  QrCode,
  X,
  MapPin,
  Building2,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useCartStore } from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

const HCMC_DISTRICTS = [
  { id: "q_td", label: "Quận Thủ Đức", fee: 15000 },
  { id: "q1", label: "Quận 1", fee: 35000 },
  { id: "q3", label: "Quận 3", fee: 30000 },
  { id: "q7", label: "Quận 7", fee: 40000 },
  { id: "q_bt", label: "Bình Thạnh", fee: 20000 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const {
    items,
    clearCart,
    getFinalTotal,
    discountPercent,
    shippingFee,
    setShippingFee,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(
    HCMC_DISTRICTS[0].id
  );
  const [detailedAddress, setDetailedAddress] = useState("");
  const [payingMember, setPayingMember] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      toast.error("Vui lòng đăng nhập để thanh toán!");
      router.replace("/auth/login");
    }
  }, [mounted, user, router]);

  useEffect(() => {
    const district = HCMC_DISTRICTS.find(
      (d) => d.id === selectedDistrict
    );

    if (district) {
      setShippingFee(district.fee);
    }
  }, [selectedDistrict, setShippingFee]);

  const owners = useMemo(() => {
    return Array.from(
      new Set(items.map((item) => item.owner).filter(Boolean))
    ) as string[];
  }, [items]);

  const shipPerPerson =
    owners.length > 0 ? shippingFee / owners.length : 0;

  const calculateUserSubtotal = (ownerName: string) => {
    return items
      .filter((item) => item.owner === ownerName)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateUserTotal = (ownerName: string) => {
    const subtotal = calculateUserSubtotal(ownerName);
    const discount = (subtotal * discountPercent) / 100;
    return subtotal - discount + shipPerPerson;
  };

  const handleFinalOrder = () => {
    if (!user) {
      toast.error("Bạn cần đăng nhập!");
      router.replace("/auth/login");
      return;
    }

    if (!detailedAddress.trim()) {
      toast.error("Vui lòng nhập địa chỉ nhận hàng!");
      return;
    }

    if (items.length === 0) {
      toast.error("Giỏ hàng đang trống!");
      return;
    }

    setIsProcessing(true);
    const loadingId = toast.loading("Đang xử lý đơn hàng...");

    setTimeout(() => {
      const district = HCMC_DISTRICTS.find(
        (d) => d.id === selectedDistrict
      );

      const orderItems = items.map((item) => {
        const finalDisplayImage =
          Array.isArray(item.images) && item.images.length > 0
            ? item.images[0]
            : "/placeholder-food.png";

        return {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          displayImage: finalDisplayImage,
          restaurantName: item.restaurantName || "Foodie Partner",
          owner: item.owner,
        };
      });

      const newOrder = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toLocaleDateString("vi-VN"),
        createdAt: new Date().toISOString(),
        customer: user.name,
        address: detailedAddress,
        district: district?.label || "",
        shippingFee,
        status: "Đã hoàn thành",
        total: getFinalTotal() + shippingFee,
        items: orderItems,
      };

      const existingOrders = JSON.parse(
        localStorage.getItem("foodie_orders") || "[]"
      );

      localStorage.setItem(
        "foodie_orders",
        JSON.stringify([...existingOrders, newOrder])
      );

      clearCart();

      toast.dismiss(loadingId);
      toast.success("Đặt hàng thành công!");

      router.replace("/order-success");
    }, 1500);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-orange-500" size={40} />
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Đang tải checkout...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <Breadcrumbs />

          <Link
            href="/group-order"
            className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] hover:text-orange-500"
          >
            <ArrowLeft size={16} />
            Quay lại giỏ hàng nhóm
          </Link>

          <h1 className="text-6xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
            Thanh toán
            <br />
            <span className="text-orange-500">Từng người</span>
          </h1>

          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 flex items-center gap-3">
              <MapPin size={18} className="text-orange-500" />
              Địa chỉ nhận hàng
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Building2
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <select
                  value={selectedDistrict}
                  onChange={(e) =>
                    setSelectedDistrict(e.target.value)
                  }
                  className="w-full h-16 pl-14 pr-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white font-black outline-none focus:border-orange-500"
                >
                  {HCMC_DISTRICTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label} - {d.fee.toLocaleString()}đ
                    </option>
                  ))}
                </select>
              </div>

              <input
                value={detailedAddress}
                onChange={(e) =>
                  setDetailedAddress(e.target.value)
                }
                placeholder="Số nhà, tên đường..."
                className="w-full h-16 px-8 rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white font-black outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {owners.map((name) => (
              <div
                key={name}
                className="p-6 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center"
              >
                <div>
                  <p className="font-black text-xl dark:text-white">
                    {name === "Host"
                      ? `Bạn (${user?.name})`
                      : name}
                  </p>
                  <p className="text-sm text-slate-400">
                    {Math.round(
                      calculateUserTotal(name)
                    ).toLocaleString()}
                    đ
                  </p>
                </div>

                <button
                  onClick={() => setPayingMember(name)}
                  className="p-4 rounded-2xl bg-slate-900 dark:bg-orange-500 text-white"
                >
                  <QrCode size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="sticky top-28 bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl">
            {payingMember ? (
              <div className="space-y-6">
                <div className="flex justify-between">
                  <p className="font-black text-orange-500">
                    {payingMember}
                  </p>
                  <button onClick={() => setPayingMember(null)}>
                    <X size={20} />
                  </button>
                </div>

                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${payingMember}_${calculateUserTotal(
                    payingMember
                  )}`}
                  alt="QR"
                  width={200}
                  height={200}
                  className="mx-auto bg-white rounded-3xl p-4"
                />
              </div>
            ) : (
              <p className="text-slate-500 text-center py-10">
                Chọn người để hiện QR
              </p>
            )}

            <div className="mt-10 border-t border-white/10 pt-6">
              <div className="flex justify-between mb-4">
                <span>Ship</span>
                <span>{shippingFee.toLocaleString()}đ</span>
              </div>

              <div className="flex justify-between mb-6">
                <span>Tổng</span>
                <span className="text-orange-500 text-2xl font-black">
                  {(getFinalTotal() + shippingFee).toLocaleString()}đ
                </span>
              </div>

              <button
                onClick={handleFinalOrder}
                disabled={isProcessing}
                className="w-full py-5 rounded-2xl bg-orange-500 hover:bg-orange-600 font-black uppercase"
              >
                {isProcessing
                  ? "Đang xử lý..."
                  : "Xác nhận chốt đơn"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}