"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  Trash2, Receipt, ArrowRight, ShoppingBag, 
  Lock, LogIn, AlertCircle, Store, Link as LinkIcon, 
  Check, Sparkles, Plus, Minus, Ticket 
} from "lucide-react";

import { useCartStore } from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import productsData from "@/lib/data/products.json";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const basePath = "/nhom05_food_ordering";
const FAKE_FRIENDS = ["Xuân Nhi","Bích Ngọc","Thảo Nguyên","Bích Nhi","Đức Mạnh","Tấn Tài","Hoàng Huy", "Bảo Ngọc", "Gia Bảo", "Hải Yến", "Minh Thư"];

const RESTAURANT_MAP: Record<number, string> = {
  1: "Cơm tấm Cô Ba",
  2: "Bún Phở Ba Miền",
  3: "Bếp Bánh Ngọc Thảo",
  4: "Ellen's Healthy Kitchen", 
  5: "Bunkr - Fast Food",
  6: "Hot N' Grilled Saigon",
  7: "1997 Drinks",
  8: "Tiệm Chay An Nhiên",
};

type ProductType = {
  id: string | number;
  name: string;
  price: number;
  restaurantId?: number | string;
  images?: string[];
  [key: string]: unknown;
};

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


  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    const fakeInviteLink = `${currentUrl}/${Math.random().toString(36).substring(7)}`;
    navigator.clipboard.writeText(fakeInviteLink);
    setCopied(true);
    toast.success("Đã copy link mời nhóm!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateFriend = () => {
    const randomFriend = FAKE_FRIENDS[Math.floor(Math.random() * FAKE_FRIENDS.length)];

    let currentResId = 1;
    if (items.length > 0 && items[0].restaurantId) {
      currentResId = Number(items[0].restaurantId);
    } else {
      const resIds = [1, 2, 3, 4, 5, 6, 7, 8];
      currentResId = resIds[Math.floor(Math.random() * resIds.length)];
    }

    const menuOfRestaurant = (productsData.products as ProductType[]).filter(
      (p) => Number(p.restaurantId) === currentResId
    );
    const validMenu = menuOfRestaurant.length > 0 ? menuOfRestaurant : productsData.products;

    const randomProduct = validMenu[Math.floor(Math.random() * validMenu.length)];
    
    addItem(randomProduct, randomFriend);
    
    toast.success(`${randomFriend} vừa thêm món ${randomProduct.name}!`, {
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

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Vui lòng chọn món trước khi thanh toán!");
      return;
    }
    toast.info("Đang chuyển đến trang thanh toán...", {
      icon: " 🚀 ",
      style: { borderRadius: '20px', fontWeight: 'bold' }
    });
    setTimeout(() => {
      router.push("/checkout");
    }, 800);
  };

  const getImgSrc = (src: string | undefined) => {
    const url = src || "/placeholder-food.png";
    return url.startsWith('http') ? url : `${basePath}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  if (!mounted) return null;

  if (!user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-6 bg-transparent dark:bg-slate-950 transition-colors duration-500">
        <div className="mb-8"><Breadcrumbs /></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 text-center shadow-2xl border border-slate-50 dark:border-slate-800 space-y-8"
        >
          <div className="w-24 h-24 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center mx-auto">
            <Lock size={40} className="text-orange-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Dừng khoảng 2s!</h2>
            <p className="text-slate-400 dark:text-slate-500 font-medium text-xs">Vui lòng đăng nhập để sử dụng tính năng Đặt Nhóm.</p>
          </div>
          <Link href="/auth/login" className="w-full h-18 bg-slate-900 dark:bg-orange-500 text-white rounded-2xl font-black uppercase flex items-center justify-center gap-3 hover:bg-orange-500 transition-all shadow-xl active:scale-95">
            ĐĂNG NHẬP NGAY <LogIn size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8 px-6 bg-transparent dark:bg-slate-950 transition-colors duration-500">
        <div className="mb-12"><Breadcrumbs /></div>
        <div className="w-40 h-40 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center relative shadow-inner">
          <ShoppingBag size={64} className="text-slate-200 dark:text-slate-800" />
          <AlertCircle className="absolute top-8 right-8 text-orange-500 animate-pulse" />
        </div>
        <div className="text-center space-y-2">
           <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Giỏ nhóm đang trống!</h2>
           <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px]">Đang đợi Leader {user?.name || "bạn"} chọn món...</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/restaurants" className="bg-slate-900 dark:bg-orange-500 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-2xl active:scale-95 text-center">
              ĐI CHỌN QUÁN
            </Link>
            <button onClick={handleSimulateFriend} className="bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-100 transition-all border border-orange-200">
              DEMO BẠN BÈ ĐẶT
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 font-sans bg-slate-50/10 dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      <div className="mb-8"><Breadcrumbs /></div>
      <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
              Order <span className="text-orange-500">Group</span>
            </h1>
            <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">
              CHỦ PHÒNG: {user?.name?.toUpperCase() || "BẠN"} 👋
            </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={handleCopyLink} className={`flex items-center gap-2 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border shadow-sm ${copied ? 'bg-green-50 dark:bg-green-500/10 text-green-600 border-green-200' : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 hover:bg-slate-50'}`}>
            {copied ? <Check size={16} /> : <LinkIcon size={16} />} {copied ? "Đã copy link" : "Mời bạn bè"}
          </button>
          <button onClick={handleSimulateFriend} className="flex items-center gap-2 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 px-6 py-4 rounded-2xl text-[10px] font-black uppercase hover:bg-orange-100 transition-all border border-orange-200">
            <Sparkles size={16} /> Bạn Bè Thêm Món
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* CỘT TRÁI: DANH SÁCH MÓN ĂN */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-10 md:p-14 shadow-2xl border border-slate-50 dark:border-slate-800 relative overflow-hidden transition-colors">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic mb-12 flex items-center gap-4 border-b border-slate-50 dark:border-slate-800 pb-8">
              <Receipt className="text-orange-500" size={28} /> Bill Chi Tiết Nhóm
            </h3>
            
            <div className="space-y-10">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    key={`${item.id}-${item.owner}`} className="flex items-center gap-8 group"
                  >
                    <div className="relative w-28 h-28 rounded-[2rem] overflow-hidden shadow-xl shrink-0 border-4 border-slate-50 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                        <Image src={getImgSrc(item.images?.[0])} alt={item.name} fill sizes="112px" className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1">
                      
                      <div className="flex items-center gap-2 text-orange-500 mb-2">
                        <Store size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {item.restaurantId && RESTAURANT_MAP[item.restaurantId] 
                            ? RESTAURANT_MAP[item.restaurantId] 
                            : "Foodie Partner"}
                        </span>
                      </div>
                      
                      <h4 className="font-black text-slate-900 dark:text-white text-2xl tracking-tight uppercase leading-none italic">{item.name}</h4>
                      
                      <div className="flex items-center gap-4 mt-3">
                        <p className="text-orange-500 font-black italic text-xl">{item.price.toLocaleString()}đ</p>
                        
                        <span className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] font-black rounded-lg uppercase">
                          {item.owner === "Host" ? "Bạn" : item.owner}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 w-fit p-1 rounded-xl mt-4 border border-slate-100 dark:border-slate-700">
                        <button onClick={() => updateQuantity(item.id, item.owner, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all">
                          <Minus size={14}/>
                        </button>
                        <span className="w-6 text-center font-black text-slate-900 dark:text-white text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.owner, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-orange-500 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all">
                          <Plus size={14}/>
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id, item.owner)} className="w-14 h-14 flex items-center justify-center text-slate-200 dark:text-slate-700 hover:text-red-500 rounded-2xl transition-all">
                      <Trash2 size={24} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: TỔNG KẾT */}
        <div className="relative">
          <div className="bg-slate-900 dark:bg-slate-900/80 backdrop-blur-md text-white rounded-[4rem] p-12 shadow-2xl sticky top-28 overflow-hidden border-4 border-white/5 dark:border-slate-800 transition-colors h-fit">
            
            <div>
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-10 text-orange-500">Tổng kết</h3>
              <div className="space-y-5 mb-10">
                <div className="flex justify-between text-slate-500 dark:text-slate-400 font-black uppercase text-[10px] tracking-widest">
                  <span>Tạm tính</span> <span>{getSubTotal().toLocaleString()}đ</span>
                </div>
                <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5 focus-within:border-orange-500/50 transition-all">
                  <input type="text" value={voucherInput} onChange={(e) => setVoucherInput(e.target.value)}
                    placeholder="MÃ GIẢM GIÁ..." className="flex-1 bg-transparent px-4 text-[10px] font-black text-white outline-none uppercase placeholder:text-slate-700"
                  />
                  <button onClick={handleApplyVoucher} className="px-4 py-2 bg-orange-500 text-white font-black text-[9px] rounded-xl hover:bg-orange-600 transition-all uppercase">ÁP DỤNG</button>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between items-center text-green-400 text-[10px] font-black tracking-widest bg-green-500/5 p-3 rounded-xl border border-green-500/10">
                    <div className="flex items-center gap-2"><Ticket size={14} /> VOUCHER (-{discountPercent}%)</div>
                    <span>-{getDiscountAmount().toLocaleString()}đ</span>
                  </div>
                )}
              </div>
              
              <div className="mb-10">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Tổng đơn nhóm</span>
                <div className="text-6xl font-black italic text-white mt-4 tabular-nums">{getFinalTotal().toLocaleString()}<span className="text-xl text-orange-500 ml-2">đ</span></div>
              </div>
            </div>
            
            <button onClick={handleCheckout} className="w-full h-16 px-2 pl-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all flex items-center justify-between shadow-xl shadow-orange-500/20 active:scale-95 group mt-8 border border-orange-400/50">
              <span className="flex-1 text-center font-black text-[13px] uppercase tracking-wider drop-shadow-sm whitespace-nowrap pr-2">
                TIẾN HÀNH THANH TOÁN
              </span>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-orange-500 transition-colors">
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}