"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image"; // 1. Import Image xịn của Next.js
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import { 
  Trash2, Receipt, ArrowRight, Plus, Minus, 
  Ticket, Sparkles, Link as LinkIcon, Check
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FakeProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

const FAKE_FRIENDS: string[] = ["Hoàng Huy", "Bảo Ngọc", "Gia Bảo", "Hải Yến", "Minh Thư"];
const FAKE_FOODS: FakeProduct[] = [
  { id: "sim1", name: "Trà Đào Cam Sả", price: 35000, image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=500" },
  { id: "sim2", name: "Gà Rán KFC", price: 35000, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500" },
  { id: "sim3", name: "Cơm Tấm Sườn Bì", price: 45000, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500" }
];

export default function GroupOrderPage() {
  const { 
    items, removeItem, addItem, updateQuantity, 
    getSubTotal, getDiscountAmount, getFinalTotal, 
    applyVoucher, discountPercent 
  } = useCartStore();
  
  const { user } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [voucherInput, setVoucherInput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    const fakeInviteLink = `${currentUrl}/${Math.random().toString(36).substring(7)}`;
    navigator.clipboard.writeText(fakeInviteLink);
    setCopied(true);
    toast.success("Đã copy link mời nhóm! Gửi cho bạn bè ngay nhé.");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateRealtime = () => {
    const randomFriendName = FAKE_FRIENDS[Math.floor(Math.random() * FAKE_FRIENDS.length)];
    const randomFood = FAKE_FOODS[Math.floor(Math.random() * FAKE_FOODS.length)];
    addItem(randomFood, randomFriendName);
    toast.success(`${randomFriendName} vừa thêm món ${randomFood.name}!`, {
      icon: <Sparkles className="text-orange-500" />
    });
  };

  const handleApplyVoucher = () => {
    if (!voucherInput.trim()) return;
    const res = applyVoucher(voucherInput);
    if (res.success) {
      toast.success(res.message);
      setVoucherInput("");
    } else {
      toast.error(res.message);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans relative">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
            <h1 className="text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
            Order <span className="text-orange-500">Group</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] pt-2">
                Chào mừng trở lại, Host {user.name}! 👋
            </p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleCopyLink}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border shadow-sm ${copied ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50'}`}
          >
            {copied ? <Check size={16} /> : <LinkIcon size={16} />} 
            {copied ? "Đã copy link" : "Mời bạn bè tham gia"}
          </button>

          <button onClick={handleSimulateRealtime} className="flex items-center gap-2 bg-orange-50 text-orange-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-100 transition-all border border-orange-200 active:scale-95">
            <Sparkles size={16} /> Demo Bạn Bè Thêm Món
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white rounded-[3.5rem] p-10 border border-slate-50 shadow-2xl shadow-slate-100/50">
            <h3 className="text-xl font-black text-slate-900 uppercase italic mb-10 flex items-center gap-3 border-b border-slate-50 pb-6">
              <Receipt className="text-orange-500" /> Bill Chi Tiết
            </h3>
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <p className="text-center py-10 text-slate-400 font-medium italic">Giỏ hàng nhóm đang đợi mọi người chọn món...</p>
                ) : (
                  items.map((item) => (
                    <motion.div layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} key={`${item.id}-${item.owner}`} className="flex items-center gap-8 group">
                      {/* 2. THAY THẾ Ở ĐÂY */}
                      <div className="relative w-24 h-24 shrink-0">
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          fill
                          className="rounded-3xl object-cover shadow-lg"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-slate-900 text-xl tracking-tight uppercase leading-none">{item.name}</h4>
                        <p className="text-orange-500 font-black italic text-lg mt-1">{item.price.toLocaleString()}đ</p>
                        <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">
                          Người đặt: <span className="text-blue-500 font-black">
                            {item.owner === "Host" ? `BẠN (${user.name?.toUpperCase()})` : item.owner.toUpperCase()}
                          </span>
                        </p>
                        <div className="flex items-center gap-3 bg-slate-50 w-fit p-1 rounded-xl mt-3 border border-slate-200">
                          <button onClick={() => updateQuantity(item.id, item.owner, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-white rounded-lg transition-all"><Minus size={16}/></button>
                          <span className="w-6 text-center font-black text-slate-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.owner, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-orange-500 hover:bg-orange-100 rounded-lg transition-all"><Plus size={16}/></button>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id, item.owner)} className="w-12 h-12 flex items-center justify-center text-slate-200 hover:text-red-500 transition-all"><Trash2 size={22} /></button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-[#111827] text-white rounded-[3rem] p-10 shadow-2xl sticky top-28 border border-white/5">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-8 text-orange-500">Tổng kết</h3>
            
            <div className="space-y-4 mb-8 max-h-62.5 overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={`${item.id}-${item.owner}`} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-[11px] font-black uppercase leading-tight truncate w-40">{item.name}</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">x{item.quantity} • {item.owner}</p>
                  </div>
                  <p className="text-sm font-black italic text-orange-500 shrink-0">{(item.price * item.quantity).toLocaleString()}đ</p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 space-y-4 mb-8">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                <span>TỔNG TIỀN MÓN</span>
                <span className="text-white">{getSubTotal().toLocaleString()}đ</span>
              </div>

              <div className="flex gap-2 bg-[#1F2937] p-1.5 rounded-2xl border border-white/5 focus-within:border-orange-500/50 transition-all">
                <input
                  type="text" value={voucherInput} onChange={(e) => setVoucherInput(e.target.value)}
                  placeholder="MÃ GIẢM GIÁ..."
                  className="flex-1 bg-transparent px-4 text-[10px] font-black text-white outline-none uppercase placeholder:text-slate-600"
                />
                <button onClick={handleApplyVoucher} className="px-4 py-2 bg-orange-500 text-white font-black text-[9px] rounded-xl hover:bg-orange-600 transition-all uppercase">ÁP DỤNG</button>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between items-center text-[#3B82F6] text-[10px] font-black tracking-widest bg-[#3B82F6]/5 p-3 rounded-xl border border-[#3B82F6]/10 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <Ticket size={14} /> VOUCHER (-{discountPercent}%)
                  </div>
                  <span>-{getDiscountAmount().toLocaleString()}đ</span>
                </div>
              )}
            </div>

            <div className="mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">TỔNG CỘNG ĐƠN</span>
              <div className="text-[3.5rem] font-black italic text-white mt-1 leading-none tracking-tighter tabular-nums">
                {getFinalTotal().toLocaleString()}<span className="text-2xl text-orange-500 ml-1">đ</span>
              </div>
              <p className="text-[9px] text-slate-500 mt-3 font-medium italic">* Phí vận chuyển sẽ được tính dựa trên địa chỉ giao hàng tại bước tiếp theo.</p>
            </div>

            <button 
              onClick={() => router.push("/checkout")}
              disabled={items.length === 0}
              className="w-full py-5 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95 group"
            >
              TIẾN HÀNH THANH TOÁN <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}