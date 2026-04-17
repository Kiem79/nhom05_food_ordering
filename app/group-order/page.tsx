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
  Check, Sparkles, Plus, Minus, Ticket, ChevronDown
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import productsData from "@/lib/data/products.json";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const basePath = "/nhom05_food_ordering";
const FAKE_FRIENDS = ["Xuân Nhi", "Bích Ngọc", "Thảo Nguyên", "Bích Nhi", "Đức Mạnh", "Tấn Tài", "Hoàng Huy", "Bảo Ngọc", "Gia Bảo", "Hải Yến", "Minh Thư"];

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

// Danh sách Voucher dạng sàn TMĐT
const AVAILABLE_VOUCHERS = [
  { code: "GIAM10", label: "Đơn Đầu Tiên", desc: "Giảm 10% cho đơn đầu tiên", value: 10 },
  { code: "GIAM20", label: "Tiệc Deal Hè", desc: "Giảm 20% cho mọi đơn hàng", value: 20 },
  { code: "FREESHIP", label: "Miễn Phí Vận Chuyển", desc: "Giảm tối đa 15.000đ", value: 15 }
];

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
    applyVoucher, discountPercent, discountFixed
  } = useCartStore();
  
  const { user } = useAuthStore();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showVoucherList, setShowVoucherList] = useState(false);

  // Tự động nhận diện mã đang dùng (Derived State)
  const selectedVoucher = discountPercent === 10 ? "GIAM10" : 
                          discountPercent === 20 ? "GIAM20" : 
                          discountFixed === 15000 ? "FREESHIP" : "";

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

  // Hàm xử lý chọn Voucher từ danh sách (Đã gỡ bỏ dòng gây lỗi)
  const handleSelectVoucher = (code: string) => {
    const res = applyVoucher(code);
    if (res.success) {
      setShowVoucherList(false);
      toast.success(res.message);
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
            Đặt <span className="text-orange-500">Nhóm</span>
          </h1>
          <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">
            CHỦ PHÒNG: {user?.name?.toUpperCase() || "BẠN"}   👋
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={handleCopyLink} className={`flex items-center gap-2 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border shadow-sm ${copied ?
            'bg-green-50 dark:bg-green-500/10 text-green-600 border-green-200' : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 hover:bg-slate-50'}`}>
            {copied ? <Check size={16} /> : <LinkIcon size={16} />} {copied ? "Đã copy link" : "Mời bạn bè"}
          </button>
          <button onClick={handleSimulateFriend} className="flex items-center gap-2 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 px-6 py-4 rounded-2xl text-[10px] font-black uppercase hover:bg-orange-100 transition-all border border-orange-200">
            <Sparkles size={16} /> Bạn Bè Thêm Món
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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
                          {item.restaurantId && RESTAURANT_MAP[item.restaurantId as number]
                            ? RESTAURANT_MAP[item.restaurantId as number]
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
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center font-black text-slate-900 dark:text-white text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.owner, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-orange-500 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all">
                          <Plus size={14} />
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

        {/* CỘT PHẢI: TỔNG KẾT VÀ VOUCHER MỚI */}
        <div className="relative">
          <div className="bg-slate-900 dark:bg-slate-900/80 backdrop-blur-md text-white rounded-[4rem] p-12 shadow-2xl sticky top-28 overflow-hidden border-4 border-white/5 dark:border-slate-800 transition-colors h-fit">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-10 text-orange-500">Tổng kết</h3>
            <div className="space-y-5 mb-10">
              <div className="flex justify-between text-slate-500 dark:text-slate-400 font-black uppercase text-[10px] tracking-widest">
                <span>Tạm tính</span> <span>{getSubTotal().toLocaleString()}đ</span>
              </div>

              {/* VOUCHER DROPDOWN STYLE - CẬP NHẬT MỚI */}
              <div className="relative">
                <button 
                  type="button"
                  onClick={() => setShowVoucherList(!showVoucherList)}
                  className="w-full flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Ticket size={18} className="text-orange-500" />
                    <span className="text-[10px] font-black uppercase text-slate-300">
                      {selectedVoucher || "Chọn mã giảm giá"}
                    </span>
                  </div>
                  <ChevronDown size={16} className={`text-slate-500 transition-transform duration-300 ${showVoucherList ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showVoucherList && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-3 bg-slate-800 border border-white/10 rounded-3xl p-4 z-50 shadow-2xl space-y-3"
                    >
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2">Voucher cho nhóm</p>
                      {AVAILABLE_VOUCHERS.map((v) => (
                        <div key={v.code} className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-transparent hover:border-orange-500/30 transition-all">
                          <div className="text-left">
                            <p className="text-[11px] font-black text-orange-500 italic leading-none">{v.label}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">{v.desc}</p>
                          </div>
                          <button onClick={() => handleSelectVoucher(v.code)} className="bg-orange-500 text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-500/20">
                            ÁP MÃ
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* HỘP 1: HIỂN THỊ TIẾT KIỆM THEO PHẦN TRĂM (%) */}
              {discountPercent > 0 && (
                <div className="flex justify-between items-center text-green-400 text-[10px] font-black tracking-widest bg-green-500/10 p-4 rounded-2xl border border-green-500/20">
                  <div className="flex items-center gap-2"><Sparkles size={14} /> TIẾT KIỆM (-{discountPercent}%)</div>
                  <span>-{getDiscountAmount().toLocaleString()}đ</span>
                </div>
              )}

              {/* HỘP 2: HIỂN THỊ DÀNH RIÊNG CHO MIỄN PHÍ SHIP */}
              {discountFixed > 0 && (
                <div className="flex justify-between items-center text-blue-400 text-[10px] font-black tracking-widest bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
                  <div className="flex items-center gap-2"><Sparkles size={14} /> MIỄN PHÍ VẬN CHUYỂN</div>
                  <span>-{discountFixed.toLocaleString()}đ</span>
                </div>
              )}
            </div>

            <div className="mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Tổng đơn nhóm</span>
              <div className="text-6xl font-black italic text-white mt-4 tabular-nums">
                {getFinalTotal().toLocaleString()}<span className="text-xl text-orange-500 ml-2">đ</span>
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