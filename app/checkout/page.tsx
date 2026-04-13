"use client";

/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { 
  CheckCircle2, ArrowLeft, Loader2, Sparkles, Bike, User, QrCode, CreditCard, X, MapPin, Building2
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Link from "next/link";

// 1. DANH SÁCH QUẬN HUYỆN & PHÍ SHIP
const HCMC_DISTRICTS = [
  { id: 'q_td', label: 'Quận Thủ Đức', fee: 15000 },
  { id: 'q1', label: 'Quận 1', fee: 35000 },
  { id: 'q3', label: 'Quận 3', fee: 30000 },
  { id: 'q7', label: 'Quận 7', fee: 40000 },
  { id: 'q_bt', label: 'Bình Thạnh', fee: 20000 },
  { id: 'q9', label: 'Quận 9', fee: 25000 },
];

export default function CheckoutPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { items, clearCart, getFinalTotal, discountPercent, shippingFee, setShippingFee } = useCartStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [payingMember, setPayingMember] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState(HCMC_DISTRICTS[0].id);
  const [detailedAddress, setDetailedAddress] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Cập nhật phí ship vào Store khi đổi Quận
  useEffect(() => {
    if (mounted) {
      const dist = HCMC_DISTRICTS.find(d => d.id === selectedDistrict);
      if (dist) setShippingFee(dist.fee);
    }
  }, [selectedDistrict, setShippingFee, mounted]);

  // --- LOGIC CHIA TIỀN ĐỘNG ---
  const owners = Array.from(new Set(items.map(item => item.owner))).filter(Boolean) as string[];
  const shipPerPerson = owners.length > 0 ? shippingFee / owners.length : 0;

  const calculateUserTotal = (ownerName: string) => {
    const userItems = items.filter(i => i.owner === ownerName);
    const userSubtotal = userItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const userDiscount = (userSubtotal * discountPercent) / 100;
    return userSubtotal - userDiscount + shipPerPerson;
  };

  const handleFinalOrder = () => {
    if (!detailedAddress.trim()) {
      toast.error("Vui lòng nhập địa chỉ cụ thể!");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      toast.success("Đã xác nhận thanh toán nhóm thành công!");
      clearCart();
      setIsSuccess(true);
      setIsProcessing(false);
    }, 2000);
  };

  if (!mounted) return null;

  // --- MÀN HÌNH ĐẶT HÀNG THÀNH CÔNG ---
  if (isSuccess) {
    const selectedLoc = HCMC_DISTRICTS.find(d => d.id === selectedDistrict);
    return (
      <div className="max-w-xl mx-auto py-32 text-center space-y-10 animate-in zoom-in duration-500 font-sans">
        <div className="relative inline-block">
          <div className="w-28 h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-100/50">
            <CheckCircle2 size={56} strokeWidth={2.5} />
          </div>
          <div className="absolute -top-2 -right-2 text-orange-500 animate-bounce">
            <Sparkles size={32} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-tight text-slate-900">
            ĐẶT HÀNG <span className="text-orange-500">XONG!</span>
          </h1>
          <p className="text-slate-500 font-medium px-10 leading-relaxed text-lg">
            Đơn hàng của nhóm đang được giao đến: <br />
            <span className="text-slate-900 font-black underline decoration-orange-500 decoration-2 uppercase">
               {detailedAddress}, {selectedLoc?.label}, TPHCM
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <button 
            onClick={() => router.push('/order-tracking')} 
            className="w-72 h-16 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-[0_20px_40px_rgba(249,115,22,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <Bike size={20} /> Theo dõi đơn hàng
          </button>

          <button 
            onClick={() => router.push('/')} 
            className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] hover:text-slate-900 transition-colors"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 font-sans grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-12 text-slate-900">
        <Link href="/group-order" className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 hover:text-orange-500 transition-colors">
          <ArrowLeft size={16} /> Quay lại giỏ hàng nhóm
        </Link>
        
        <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">Thanh toán <br/><span className="text-orange-500">Từng người</span></h1>

        {/* 01. ĐỊA CHỈ GIAO HÀNG */}
        <div className="space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3">
            <MapPin size={18} className="text-orange-500" /> 01. Địa chỉ nhận hàng (TP.HCM)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <select 
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full h-16 pl-14 pr-6 bg-white border-2 border-slate-100 rounded-3xl font-black outline-none focus:border-orange-500 appearance-none shadow-sm cursor-pointer"
              >
                {HCMC_DISTRICTS.map(d => (
                  <option key={d.id} value={d.id}>{d.label} - Ship: {d.fee.toLocaleString()}đ</option>
                ))}
              </select>
            </div>
            <input 
              type="text"
              value={detailedAddress}
              onChange={(e) => setDetailedAddress(e.target.value)}
              placeholder="Số nhà, tên đường..."
              className="w-full h-16 px-8 bg-white border-2 border-slate-100 rounded-3xl font-black outline-none focus:border-orange-500 shadow-sm"
            />
          </div>
        </div>

        {/* 02. DANH SÁCH THÀNH VIÊN */}
        <div className="space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3">
            <User size={18} className="text-orange-500" /> 02. Danh sách thành viên ({owners.length})
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {owners.map(name => (
              <motion.div 
                layout
                key={name} 
                className={`p-6 bg-white border-2 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6 transition-all ${payingMember === name ? 'border-orange-500 ring-4 ring-orange-500/10' : 'border-slate-100 hover:border-slate-200 shadow-sm'}`}
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-black text-xl shadow-inner uppercase">
                    {name ? name[0] : "?"}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 uppercase italic tracking-tight text-lg">
                      {name === "Host" ? `Bạn (${user?.name || "Host"})` : name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      Phần trả (đã cộng ship): <span className="text-orange-500 text-sm ml-1">{Math.round(calculateUserTotal(name)).toLocaleString()}đ</span>
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => { setPayingMember(name); toast.info(`Đang tạo QR cho ${name}...`); }}
                  className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-lg active:scale-95"
                >
                  <QrCode size={18} /> Quét mã trả tiền
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* PANEL QUÉT MÃ BÊN PHẢI */}
      <div className="relative">
        <div className="bg-[#111827] text-white p-10 rounded-[3rem] sticky top-28 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] min-h-150 flex flex-col items-center justify-between text-center border border-white/5 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <AnimatePresence mode="wait">
            {payingMember ? (
              <motion.div 
                key="qr" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-8 w-full"
              >
                <div className="flex justify-between items-center mb-4">
                    <span className="text-orange-500 font-black uppercase tracking-widest text-[10px]">Cổng thanh toán riêng</span>
                    <button onClick={() => setPayingMember(null)} className="text-slate-500 hover:text-white"><X size={20}/></button>
                </div>
                <div className="space-y-2">
                    <p className="text-2xl font-black italic uppercase tracking-tighter">{payingMember}</p>
                    <p className="text-4xl font-black text-orange-500 tabular-nums">{Math.round(calculateUserTotal(payingMember)).toLocaleString()}đ</p>
                </div>
                <div className="bg-white p-6 rounded-[2.5rem] inline-block shadow-2xl border-8 border-white overflow-hidden">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FoodiePay_${payingMember}_${calculateUserTotal(payingMember)}`} 
                    alt={`Mã QR thanh toán của ${payingMember}`} 
                    className="w-48 h-48"
                  />
                </div>
                <button 
                  onClick={() => { toast.success(`${payingMember} đã hoàn tất trả tiền!`); setPayingMember(null); }} 
                  className="w-full py-4 bg-white/10 hover:bg-green-500 hover:text-white text-green-500 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all"
                >
                  Xác nhận đã trả tiền
                </button>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto"><CreditCard size={32} className="text-slate-600" /></div>
                <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] px-10">Chọn thành viên để quét mã QR thanh toán cá nhân</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 pt-8 border-t border-white/10 w-full relative z-10 text-left space-y-4 font-bold text-sm">
            <div className="flex justify-between text-slate-400">
              <span>PHÍ SHIP ({HCMC_DISTRICTS.find(d=>d.id===selectedDistrict)?.label})</span>
              <span className="text-white">+{shippingFee.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-white border-t border-white/5 pt-4">
              <span className="text-slate-400">TỔNG ĐƠN (CÓ SHIP)</span>
              <span className="text-orange-500 text-xl font-black">{(getFinalTotal() + shippingFee).toLocaleString()}đ</span>
            </div>
            <button 
              onClick={handleFinalOrder}
              disabled={isProcessing || items.length === 0}
              className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-orange-500/20 flex items-center justify-center gap-3 active:scale-95"
            >
              {isProcessing ? <Loader2 className="animate-spin" size={20} /> : "Xác nhận chốt đơn"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}