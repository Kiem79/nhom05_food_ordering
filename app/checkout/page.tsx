"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { MapPin, CreditCard, Banknote, CheckCircle2, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore() as any;
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [location, setLocation] = useState("cong-a");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // --- BƯỚC 1: THÊM STATE ĐỂ KIỂM TRA MOUNT ---
  const [isMounted, setIsMounted] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
  const timer = setTimeout(() => {
    setIsMounted(true);
  }, 0);

  return () => clearTimeout(timer);
}, []);

  const handleOrder = () => {
    setIsProcessing(true);
    const loadingId = toast.loading("Đang xử lý đơn hàng...");

    setTimeout(() => {
      toast.dismiss(loadingId); 
      toast.success("Đặt hàng thành công! Shipper đang chuẩn bị đồ cho Mạnh.");
      clearCart();
      setIsSuccess(true);
      setIsProcessing(false);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto py-32 text-center space-y-10 animate-in zoom-in duration-500">
        <div className="relative inline-block">
            <div className="w-28 h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-200">
              <CheckCircle2 size={56} strokeWidth={2.5} />
            </div>
            <div className="absolute -top-2 -right-2 text-orange-500 animate-bounce">
                <Sparkles size={32} />
            </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Thành công rồi!</h1>
          <p className="text-slate-500 font-medium px-10 leading-relaxed text-lg">
            Đơn hàng đã được xác nhận. <br /> Mạnh nhớ ra <span className="text-orange-500 font-black underline decoration-orange-200 decoration-4">
                {location === 'cong-a' ? 'Cổng A' : location === 'cong-b' ? 'Cổng B' : 'Thư viện'}
            </span> lấy đồ nhé!
          </p>
        </div>

        <Button onClick={() => router.push('/')} className="h-16 px-12 rounded-2xl font-black bg-slate-900 hover:bg-orange-500 transition-all shadow-xl hover:-translate-y-1">
          QUAY LẠI TRANG CHỦ
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <Link href="/group-order" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 font-bold text-xs uppercase tracking-[0.2em] mb-12 transition-all group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Quay lại giỏ hàng
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Thanh <br /> <span className="text-orange-500">toán</span>
          </h1>
          
          <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3">
              <MapPin size={18} className="text-orange-500" /> 01. Điểm hẹn tại HCMUTE
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'cong-a', label: 'Cổng A', desc: 'Võ Văn Ngân' },
                { id: 'cong-b', label: 'Cổng B', desc: 'Lê Quý Đôn' },
                { id: 'thu-vien', label: 'Thư viện', desc: 'Khu trung tâm' },
              ].map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setLocation(loc.id)}
                  className={`p-6 rounded-[2.5rem] border-2 text-left transition-all duration-300 ${location === loc.id ? 'border-orange-500 bg-orange-50/50 ring-4 ring-orange-500/10' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                  <p className={`font-black text-xl ${location === loc.id ? 'text-orange-600' : 'text-slate-900'}`}>{loc.label}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">{loc.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3">
              <CreditCard size={18} className="text-orange-500" /> 02. Hình thức trả tiền
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <button
                onClick={() => setPaymentMethod('cod')}
                className={`p-7 rounded-[2.5rem] border-2 flex items-center gap-5 transition-all duration-300 ${paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50/50 ring-4 ring-orange-500/10' : 'border-slate-100 bg-white'}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-slate-100 text-slate-400'}`}>
                  <Banknote size={28} />
                </div>
                <div className="text-left">
                    <span className={`block font-black text-lg leading-tight ${paymentMethod === 'cod' ? 'text-orange-600' : 'text-slate-900'}`}>Tiền mặt</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Trả khi nhận món (COD)</span>
                </div>
              </button>
              
              <button
                onClick={() => setPaymentMethod('bank')}
                className={`p-7 rounded-[2.5rem] border-2 flex items-center gap-5 transition-all duration-300 ${paymentMethod === 'bank' ? 'border-orange-500 bg-orange-50/50 ring-4 ring-orange-500/10' : 'border-slate-100 bg-white'}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${paymentMethod === 'bank' ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-slate-100 text-slate-400'}`}>
                  <CreditCard size={28} />
                </div>
                <div className="text-left">
                    <span className={`block font-black text-lg leading-tight ${paymentMethod === 'bank' ? 'text-orange-600' : 'text-slate-900'}`}>Chuyển khoản</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Quét mã QR Ngân hàng</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="h-fit lg:sticky lg:top-24">
          <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] relative overflow-visible">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-12 opacity-80">Chi tiết thanh toán</h3>
            <div className="space-y-6 mb-12">
              {items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-500 truncate max-w-[150px]">{item.name} <span className="text-slate-700 ml-1">x{item.quantity}</span></span>
                  <span className="text-white">{(item.price * item.quantity).toLocaleString()}đ</span>
                </div>
              ))}
              <div className="border-t border-white/10 pt-8 flex justify-between items-end">
                <div className="flex flex-col">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Cần thanh toán</span>
                    <span className="font-bold text-sm uppercase">Tổng cộng</span>
                </div>
                
                {/* --- BƯỚC 3: KIỂM TRA ĐIỀU KIỆN KHI HIỂN THỊ GIÁ --- */}
                <span className="text-4xl font-black text-orange-500 tabular-nums leading-none tracking-tighter">
                  {isMounted ? `${getTotalPrice().toLocaleString()}đ` : "0đ"}
                </span>
              </div>
            </div>

            <Button 
              onClick={handleOrder} 
              disabled={isProcessing}
              className="w-full h-20 rounded-3xl font-black uppercase tracking-[0.2em] bg-orange-500 hover:bg-orange-600 shadow-[0_20px_40px_rgba(249,115,22,0.3)] flex items-center justify-center gap-4 group active:scale-95 transition-all text-sm"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={24} /> ĐANG XỬ LÝ...
                </>
              ) : (
                "XÁC NHẬN ĐẶT ĐƠN"
              )}
            </Button>
            
            <p className="mt-8 text-center text-[10px] text-slate-500 font-bold uppercase tracking-tighter leading-relaxed">
              * Bằng cách nhấn đặt đơn, bạn hãy đồng ý <br /> với các điều khoản của Foodie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}