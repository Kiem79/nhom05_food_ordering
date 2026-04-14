"use client";

import { useState } from "react";
import { useOrderStore, Order } from "@/store/orderStore";

type FilterType = "all" | "completed" | "shipping";

export default function HistoryPage() {
  const { orders } = useOrderStore();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const filters: FilterType[] = ["all", "completed", "shipping"];

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status === filter);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Lịch sử đơn hàng
      </h1>

      {/* FILTER */}
      <div className="flex gap-3 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-foodie text-sm font-medium transition ${
              filter === f
                ? "bg-primary text-white"
                : "bg-secondary/10 text-primary"
            }`}
          >
            {f === "all"
              ? "Tất cả"
              : f === "completed"
              ? "Hoàn thành"
              : "Đang giao"}
          </button>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredOrders.length === 0 && (
        <p className="text-black text-center mt-10 ">
          Bạn chưa có đơn hàng nào 😢
        </p>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            className="bg-white p-5 rounded-foodie border cursor-pointer hover:shadow-md transition"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-primary font-bold">
                  #{order.id}
                </p>
                <p className="text-black text-sm">
                  {order.date}
                </p>
              </div>

              <div className="text-right">
                <p className="text-primary font-bold">
                  {order.total.toLocaleString()}đ
                </p>
                <p className="text-black text-sm">
                  {order.status === "completed"
                    ? "Hoàn thành"
                    : "Đang giao"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white p-6 rounded-foodie w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-primary mb-4">
              Đơn #{selectedOrder.id}
            </h2>

            <ul className="space-y-2">
              {selectedOrder.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>
                    {item.price.toLocaleString()}đ
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 font-bold text-primary text-right">
              Tổng: {selectedOrder.total.toLocaleString()}đ
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 w-full bg-primary text-white py-2 rounded-foodie"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
