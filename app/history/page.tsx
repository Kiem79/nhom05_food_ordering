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
    <div className="max-w-5xl mx-auto px-6 py-10 bg-transparent dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      <h1 className="text-3xl font-bold text-primary dark:text-white mb-6">
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
                : "bg-secondary/10 dark:bg-slate-800 text-primary dark:text-slate-400"
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
        <p className="text-black dark:text-slate-500 text-center mt-10 ">
          Bạn chưa có đơn hàng nào 😢
        </p>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            className="bg-white dark:bg-slate-900 p-5 rounded-foodie border border-slate-200 dark:border-slate-800 cursor-pointer hover:shadow-md transition"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-primary dark:text-orange-500 font-bold">
                  #{order.id}
                </p>
                <p className="text-black dark:text-slate-400 text-sm">
                  {order.date}
                </p>
              </div>

              <div className="text-right">
                <p className="text-primary dark:text-white font-bold">
                  {order.total.toLocaleString()}đ
                </p>
                <p className="text-black dark:text-slate-500 text-sm">
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
          className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 p-6 rounded-foodie w-100 border border-transparent dark:border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-primary dark:text-white mb-4">
              Đơn #{selectedOrder.id}
            </h2>

            <ul className="space-y-2">
              {selectedOrder.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between text-sm text-black dark:text-slate-400"
                >
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-medium dark:text-slate-200">
                    {item.price.toLocaleString()}đ
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 font-bold text-primary dark:text-orange-500 text-right border-t dark:border-slate-800 pt-4">
              Tổng: {selectedOrder.total.toLocaleString()}đ
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 w-full bg-primary dark:bg-orange-500 text-white py-2 rounded-foodie hover:opacity-90 transition-opacity"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
