"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronRight, ShoppingBag, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function GroupOrderPage() {
  const router = useRouter();
  const { items, getTotalPrice, removeItem, clearCart } = useCartStore() as any;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
  const timer = setTimeout(() => {
    setIsClient(true);
  }, 0);

  return () => clearTimeout(timer);
}, []);

  if (!isClient) return null;

  const totalPrice = typeof getTotalPrice === 'function' ? getTotalPrice() : 0;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-6 min-h-screen bg-white">
      {/* NÚT QUAY LẠI TRANG THỰC ĐƠN */}
      <Link href="/products" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 font-bold text-xs uppercase tracking-widest mb-10 transition-colors group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Quay lại chọn món
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* ================= CỘT TRÁI: DANH SÁCH MÓN ================= */}
        <div className="w-full lg:flex-[2] space-y-8">
          <div className="flex justify-between items-end border-b border-slate-100 pb-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-4 italic uppercase">
                <ShoppingBag className="text-orange-500" size={32} /> Giỏ hàng nhóm
              </h1>
              <p className="text-slate-400 font-medium mt-1">Mã đơn: #FDE-2026</p>
            </div>
            {items.length > 0 && (
              <Button 
                variant="ghost" 
                onClick={() => {
                  clearCart();
                  toast.info("Đã dọn sạch giỏ hàng!");
                }} 
                className="text-slate-400 hover:text-red-500 text-[10px] font-black uppercase tracking-tighter"
              >
                Xóa tất cả
              </Button>
            )}
          </div>

          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-6 bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-100/50 hover:bg-white transition-all group">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl shadow-md">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-black text-slate-900 text-xl leading-none">{item.name}</h4>
                        <span className="text-[10px] font-black text-orange-500/60 uppercase tracking-widest bg-orange-500/5 px-2 py-1 rounded-md mt-2 inline-block">
                          {item.category}
                        </span>
                      </div>
                      <button 
                        onClick={() => {
                          removeItem(item.id);
                          toast.error(`Đã xóa ${item.name}`);
                        }} 
                        className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-xl font-black text-slate-900">{item.price.toLocaleString()}đ</span>
                      <div className="bg-white border border-slate-200 px-4 py-1.5 rounded-xl flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Số lượng:</span>
                        <span className="text-sm font-black text-slate-900">{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                <ShoppingBag size={40} />
              </div>
              <p className="text-slate-400 font-bold">Chưa có món nào trong giỏ hết bạn ơi!</p>
              <Link href="/products">
                <Button className="mt-6 bg-slate-900 rounded-xl px-8 uppercase text-xs font-black">Đi chọn món ngay</Button>
              </Link>
            </div>
          )}
        </div>

        {/* ================= CỘT PHẢI: TỔNG KẾT & CHỐT ĐƠN ================= */}
        <div className="w-full lg:flex-1 lg:sticky lg:top-24">
          <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(15,23,42,0.3)] relative overflow-visible">
            {/* Trang trí nền */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-10 opacity-80">
              Tóm tắt đơn hàng
            </h3>
            
            <div className="space-y-6 mb-12">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold text-sm">Tổng món ăn</span>
                <span className="font-black">{items.length} món</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold text-sm">Phí giao hàng</span>
                <span className="text-green-400 text-[10px] font-black uppercase bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                  Miễn phí
                </span>
              </div>

              <div className="border-t border-white/10 pt-8 flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Thành tiền</span>
                  <span className="text-white font-bold text-sm uppercase leading-none">Tổng cộng</span>
                </div>
                <span className="text-4xl font-black text-orange-500 tracking-tighter tabular-nums leading-none">
                  {totalPrice.toLocaleString()}đ
                </span>
              </div>
            </div>

            {/* Nút thanh toán đã fix lỗi UI */}
            <Button 
              disabled={items.length === 0}
              onClick={() => router.push('/checkout')}
              className="w-full h-16 rounded-2xl bg-orange-500 text-white font-black uppercase tracking-widest hover:bg-orange-600 shadow-[0_15px_30px_rgba(249,115,22,0.3)] flex items-center justify-center gap-3 group active:scale-95 transition-all whitespace-nowrap px-4"
            >
              <span>Tiến hành thanh toán</span>
              <ChevronRight className="group-hover:translate-x-1 transition-transform shrink-0" size={20} />
            </Button>
            
            <p className="mt-8 text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
              * Vui lòng kiểm tra kỹ số lượng <br /> trước khi thanh toán
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}