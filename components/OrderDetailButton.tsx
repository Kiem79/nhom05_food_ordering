"use client";

import React from "react";

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  owner?: string;
}

interface Props {
  open: boolean;

  onClose: () => void;
  items: OrderItem[];
}

export default function OrderDetailModal({open, onClose, items = [],}: Props) {
  if (!open || !items?.length) return null;

  const groupByOwner = items.reduce((acc: any, item) => {
  const owner = item.owner || "Unknown";

  if (!acc[owner]) acc[owner] = [];
  acc[owner].push(item);

  return acc;
}, {});

  const subTotal = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const shipFee = 15000;
  const ownerCount = Object.keys(groupByOwner).length;
  const shipPerPerson = shipFee / ownerCount;

  const getOwnerTotal = (owner: string) =>
    groupByOwner[owner].reduce(
      (sum: number, i: any) => sum + i.price * i.quantity,
      0
    );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-slate-900 text-white w-[90%] max-w-3xl rounded-3xl p-6 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase">Chi tiết đơn hàng</h2>
          <button onClick={onClose} className="text-white text-center text-lg">✕</button>
        </div>

        {/* BODY */}
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {Object.keys(groupByOwner).map((owner) => (
            <div key={owner} className="border-b border-white/10 pb-4">

              <h3 className="font-black text-orange-500 mb-2">
                {owner === "Host" ? "Bạn" : owner}
              </h3>

              {groupByOwner[owner].map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{(item.price * item.quantity).toLocaleString()}đ</span>
                </div>
              ))}

              <div className="flex justify-between mt-3 text-sm text-slate-300">
                <span>Tạm tính</span>
                <span>{getOwnerTotal(owner).toLocaleString()}đ</span>
              </div>

              <div className="flex justify-between text-blue-400 text-sm">
                <span>Ship chia</span>
                <span>{shipPerPerson.toLocaleString()}đ</span>
              </div>

              <div className="flex justify-between font-bold mt-2">
                <span>Tổng</span>
                <span>
                  {(getOwnerTotal(owner) + shipPerPerson).toLocaleString()}đ
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-t border-white/10 pt-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Tổng món</span>
            <span>{subTotal.toLocaleString()}đ</span>
          </div>

          <div className="flex justify-between text-blue-400">
            <span>Tổng ship</span>
            <span>{shipFee.toLocaleString()}đ</span>
          </div>
        </div>

      </div>
    </div>
  );
}