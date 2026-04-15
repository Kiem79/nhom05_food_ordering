"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { QrCode, X, MapPin, Building2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Link from "next/link";

const HCMC_DISTRICTS = [
  { id: 'q_td', label: 'Quận Thủ Đức', fee: 15000 },
  { id: 'q1', label: 'Quận 1', fee: 35000 },
  { id: 'q3', label: 'Quận 3', fee: 30000 },
  { id: 'q7', label: 'Quận 7', fee: 40000 },
  { id: 'q_bt', label: 'Bình Thạnh', fee: 20000 },
];

export default function CheckoutPage() {
  const { items, clearCart, getFinalTotal, discountPercent, shippingFee, setShippingFee } = useCartStore();
  const { user } = useAuthStore();
  const router = useRouter();
  
  const [payingMember, setPayingMember] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState(HCMC_DISTRICTS[0].id);
  const [detailedAddress, setDetailedAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dist = HCMC_DISTRICTS.find(d => d.id === selectedDistrict);
    if (dist) setShippingFee(dist.fee);
  }, [selectedDistrict, setShippingFee]);

  const owners = Array.from(new Set(items.map(item => item.owner))).filter(Boolean) as string[];
  const shipPerPerson = owners.length > 0 ? shippingFee / owners.length : 0;

  const calculateUserSubtotal = (name: string) => {
    return items.filter(i => i.owner === name).reduce((sum, i) => sum + (i.price * i.quantity), 0);
  };

  const calculateUserTotal = (ownerName: string) => {
    const subtotal = calculateUserSubtotal(ownerName);
    const userDiscount = (subtotal * discountPercent) / 100;
    return subtotal - userDiscount + shipPerPerson;
  };

  // --- LOGIC XỬ LÝ CHỐT ĐƠN VÀ CHUYỂN TRANG ---
  const handleFinalOrder = () => {
    if (!detailedAddress.trim()) {
      toast.error("Vui lòng nhập địa chỉ nhận đồ!");
      return;
    }

    setIsProcessing(true);
    const loadingId = toast.loading("Đang chốt đơn nhóm...");

    // Giả lập thời gian xử lý server
    setTimeout(() => {
      // 1. Lưu đơn hàng vào history (nếu cần giống logic code mới)
      const newOrder = {
        id: `FOODIE-${Date.now()}`,
        address: detailedAddress,
        district: HCMC_DISTRICTS.find(d => d.id === selectedDistrict)?.label,
        total: getFinalTotal() + shippingFee,
        items: [...items]
      };
      
      const existingOrders = JSON.parse(localStorage.getItem("foodie_orders") || "[]");
      localStorage.setItem("foodie_orders", JSON.stringify([...existingOrders, newOrder]));

      // 2. Xóa giỏ hàng
      clearCart();
      toast.dismiss(loadingId);
      toast.success("Đặt hàng thành công!");

      // 3. CHUYỂN TRANG: Qua trang theo dõi đơn hàng
      router.push("/order-tracking"); 
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto py-12 px-6 font-sans grid grid-cols-1 lg:grid-cols-3 gap-12 text-slate-900 dark:text-white">
        <div className="lg:col-span-2 space-y-12">
          <Link href="/group-order" className="text-slate-400 dark:text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 hover:text-orange-500 transition-colors">
            <ArrowLeft size={16} /> Quay lại giỏ hàng nhóm
          </Link>

          <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none text-slate-900 dark:text-white">
            Thanh toán <br/><span className="text-orange-500">Từng người</span>
          </h1>

          <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] flex items-center gap-3">
              <MapPin size={18} className="text-orange-500" /> 01. Địa chỉ nhận hàng (TP.HCM)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600" size={20} />
                <select 
                  value={selectedDistrict} 
                  onChange={(e) => setSelectedDistrict(e.target.value)} 
                  className="w-full h-16 pl-14 pr-6 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl font-black outline-none focus:border-orange-500 appearance-none shadow-sm cursor-pointer dark:text-white"
                >
                  {HCMC_DISTRICTS.map(d => <option key={d.id} value={d.id} className="dark:bg-slate-900">{d.label} - Ship: {d.fee.toLocaleString()}đ</option>)}
                </select>
              </div>
              <input 
                value={detailedAddress} 
                onChange={(e) => setDetailedAddress(e.target.value)} 
                placeholder="Số nhà, tên đường..." 
                className="w-full h-16 px-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl font-black outline-none focus:border-orange-500 shadow-sm dark:text-white" 
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">
              02. Chi tiết tiền từng người ({owners.length})
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {owners.map(name => (
                <div 
                  key={name} 
                  className={`p-6 bg-white dark:bg-slate-900 border-2 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6 transition-all ${
                    payingMember === name 
                    ? 'border-orange-500 ring-4 ring-orange-500/10' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-500 font-black text-2xl uppercase italic shadow-inner">{name[0]}</div>
                    <div className="flex flex-col">
                      <p className="font-black text-slate-900 dark:text-white uppercase italic text-xl tracking-tight">{name === "Host" ? `Bạn (${user?.name})` : name}</p>
                      <div className="flex flex-col gap-0.5 mt-1">
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
                          Tiền món (sau giảm): <span className="text-slate-900 dark:text-slate-200 ml-1">{(calculateUserSubtotal(name) * (1 - discountPercent/100)).toLocaleString()}đ</span>
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
                          Ship chia đều: <span className="text-orange-500 ml-1">+{Math.round(shipPerPerson).toLocaleString()}đ</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setPayingMember(name)} 
                    className="flex items-center gap-3 bg-slate-900 dark:bg-orange-500 text-white px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 dark:hover:bg-white dark:hover:text-slate-900 transition-all shadow-lg active:scale-95"
                  >
                    <QrCode size={18} /> Quét mã trả tiền
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-[#111827] dark:bg-slate-900/90 text-white p-10 rounded-[3rem] sticky top-28 shadow-2xl min-h-[500px] flex flex-col items-center justify-between text-center border border-white/5 overflow-hidden backdrop-blur-sm">
            {payingMember ? (
              <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 font-black uppercase tracking-widest text-[10px]">Cổng thanh toán cá nhân</span>
                  <button onClick={() => setPayingMember(null)} className="text-slate-500 hover:text-white transition-colors"><X size={20}/></button>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-black italic uppercase tracking-tighter">{payingMember}</p>
                  <p className="text-4xl font-black text-orange-500 tabular-nums">{Math.round(calculateUserTotal(payingMember)).toLocaleString()}đ</p>
                </div>
                <div className="bg-white p-6 rounded-[2.5rem] inline-block border-8 border-white shadow-2xl">
                  <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FoodiePay_${payingMember}_${calculateUserTotal(payingMember)}`} alt="QR" width={200} height={200} className="w-44 h-44" />
                </div>
                <button onClick={() => { toast.success(`${payingMember} đã hoàn tất!`); setPayingMember(null); }} className="w-full py-4 bg-white/10 hover:bg-green-500 text-green-500 hover:text-white rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all">Xác nhận đã trả tiền</button>
              </div>
            ) : (
              <div className="space-y-6 my-auto">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto shadow-inner"><QrCode size={32} className="text-slate-600" /></div>
                <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] px-10 leading-relaxed">Chọn một thành viên trong danh sách để hiển thị mã QR thanh toán cá nhân</p>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-white/10 w-full text-left space-y-4 font-bold text-sm">
              <div className="flex justify-between text-slate-400">
                <span className="uppercase text-[9px] tracking-widest">Phí ship khu vực</span>
                <span className="text-white">+{shippingFee.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-white border-t border-white/5 pt-4">
                <span className="text-slate-400 uppercase text-[10px] tracking-widest font-black">Tổng đơn nhóm</span>
                <span className="text-orange-500 text-2xl font-black italic">{(getFinalTotal() + shippingFee).toLocaleString()}đ</span>
              </div>
              <button 
                onClick={handleFinalOrder} 
                disabled={isProcessing || items.length === 0}
                className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-orange-500/20 active:scale-95"
              >
                {isProcessing ? "Đang xử lý..." : "XÁC NHẬN CHỐT ĐƠN"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}