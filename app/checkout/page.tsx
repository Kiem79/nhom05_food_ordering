"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { QrCode, X, MapPin, Building2, ArrowLeft, Loader2, MessageSquare } from "lucide-react"; 
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const HCMC_DISTRICTS = [
  { id: 'q1', label: 'Quận 1', fee: 35000 },
  { id: 'q3', label: 'Quận 3', fee: 30000 },
  { id: 'q4', label: 'Quận 4', fee: 30000 },
  { id: 'q5', label: 'Quận 5', fee: 28000 },
  { id: 'q6', label: 'Quận 6', fee: 30000 },
  { id: 'q7', label: 'Quận 7', fee: 40000 },
  { id: 'q8', label: 'Quận 8', fee: 35000 },
  { id: 'q10', label: 'Quận 10', fee: 28000 },
  { id: 'q11', label: 'Quận 11', fee: 28000 },
  { id: 'q12', label: 'Quận 12', fee: 35000 },
  { id: 'q_td', label: 'Thủ Đức', fee: 15000 },
  { id: 'binh_thanh', label: 'Bình Thạnh', fee: 20000 },
  { id: 'tan_binh', label: 'Tân Bình', fee: 25000 },
  { id: 'tan_phu', label: 'Tân Phú', fee: 28000 },
  { id: 'phu_nhuan', label: 'Phú Nhuận', fee: 22000 },
  { id: 'go_vap', label: 'Gò Vấp', fee: 30000 },
  { id: 'binh_tan', label: 'Bình Tân', fee: 35000 },
  { id: 'hoc_mon', label: 'Hóc Môn', fee: 40000 },
  { id: 'cu_chi', label: 'Củ Chi', fee: 50000 },
  { id: 'binh_chanh', label: 'Bình Chánh', fee: 40000 },
  { id: 'nha_be', label: 'Nhà Bè', fee: 45000 },
  { id: 'can_gio', label: 'Cần Giờ', fee: 70000 },
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
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    const dist = HCMC_DISTRICTS.find(d => d.id === selectedDistrict);
    if (dist) setShippingFee(dist.fee);
    return () => cancelAnimationFrame(frame);
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

  const handleFinalOrder = () => {
    if (!detailedAddress.trim()) {
      toast.error("Vui lòng nhập địa chỉ nhận đồ!");
      return;
    }
    setIsProcessing(true);
    const loadingId = toast.loading("Đang chốt đơn nhóm...");
    setTimeout(() => {
      const newOrder = {
        id: `FOODIE-${Date.now()}`,
        address: detailedAddress,
        district: HCMC_DISTRICTS.find(d => d.id === selectedDistrict)?.label,
        total: getFinalTotal() + shippingFee,
        items: items.map(item => ({
          ...item,
          note: item.note || "" 
        }))
      };
      const existingOrders = JSON.parse(localStorage.getItem("foodie_orders") || "[]");
      localStorage.setItem("foodie_orders", JSON.stringify([...existingOrders, newOrder]));
      
      clearCart();
      toast.dismiss(loadingId);
      toast.success("Đặt hàng thành công!");
      
      router.push("/order-success");
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto py-12 px-6 font-sans grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <Breadcrumbs />
          <Link href="/group-order" className="text-slate-400 font-black uppercase text-[10px] flex items-center gap-2 hover:text-orange-500 transition-colors">
            <ArrowLeft size={16} /> Quay lại giỏ hàng nhóm
          </Link>
          
          <h1 className="text-6xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
            Thanh toán <br/><span className="text-orange-500">Từng người</span>
          </h1>

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
                  className="w-full h-16 pl-14 pr-6 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl font-black outline-none focus:border-orange-500 appearance-none dark:text-white"
                >
                  {HCMC_DISTRICTS.map(d => <option key={d.id} value={d.id}>{d.label} - Ship: {d.fee.toLocaleString()}đ</option>)}
                </select>
              </div>
              <input
                value={detailedAddress}
                onChange={(e) => setDetailedAddress(e.target.value)}
                placeholder="Số nhà, tên đường..."
                className="w-full h-16 px-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl font-black outline-none focus:border-orange-500 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">
              02. Chi tiết tiền từng người ({owners.length})
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {owners.map(name => (
                <div key={name} className={`p-6 bg-white dark:bg-slate-900 border-2 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all ${payingMember === name ? 'border-orange-500 ring-4 ring-orange-500/10' : 'border-slate-100 dark:border-slate-800 shadow-sm'}`}>
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-500 font-black text-2xl uppercase italic shrink-0">{name[0]}</div>
                    <div className="flex flex-col">
                      <p className="font-black text-slate-900 dark:text-white uppercase italic text-xl">{name === "Host" ? `Bạn (${user?.name})` : name}</p>
                      
                      <div className="mt-2 space-y-1">
                        {items.filter(i => i.owner === name).map((item, idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                              {item.name} <span className="text-slate-400 italic">x{item.quantity}</span>
                            </span>
                            {item.note && (
                              <span className="flex items-center gap-1 text-[10px] text-orange-500 italic font-medium ml-2">
                                <MessageSquare size={10} /> {item.note}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col mt-3 pt-3 border-t border-slate-50 dark:border-slate-800">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                          Tiền món (sau giảm): <span className="text-slate-900 dark:text-slate-200 ml-1">{(calculateUserSubtotal(name) * (1 - discountPercent/100)).toLocaleString()}đ</span>
                        </p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                          Ship chia đều: <span className="text-orange-500 ml-1">+{Math.round(shipPerPerson).toLocaleString()}đ</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setPayingMember(name)} className="flex items-center gap-3 bg-slate-900 dark:bg-orange-500 text-white px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 dark:hover:bg-white dark:hover:text-slate-900 transition-all shadow-lg shrink-0">
                    <QrCode size={18} /> Quét mã trả tiền
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-[#111827] dark:bg-slate-900/90 text-white p-10 rounded-[3rem] sticky top-28 shadow-2xl min-h-125 flex flex-col items-center justify-between text-center border border-white/5 backdrop-blur-sm">
            {payingMember ? (
              <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 font-black uppercase text-[10px]">Cổng thanh toán cá nhân</span>
                  <button onClick={() => setPayingMember(null)} className="text-slate-500 hover:text-white"><X size={20}/></button>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-black italic uppercase">{payingMember}</p>
                  <p className="text-4xl font-black text-orange-500">{Math.round(calculateUserTotal(payingMember)).toLocaleString()}đ</p>
                </div>
                <div className="bg-white p-6 rounded-[2.5rem] inline-block border-8 border-white shadow-2xl">
                  <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FoodiePay_${payingMember}_${Math.round(calculateUserTotal(payingMember))}`} alt="QR" width={200} height={200} className="w-44 h-44" />
                </div>
                <button onClick={() => { toast.success(`${payingMember} đã hoàn tất!`); setPayingMember(null); }} className="w-full py-4 bg-white/10 hover:bg-green-500 text-green-500 hover:text-white rounded-2xl font-black uppercase text-[10px] transition-all">Xác nhận đã trả tiền</button>
              </div>
            ) : (
              <div className="space-y-6 my-auto text-slate-500">
                <QrCode size={48} className="mx-auto opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] px-10">Chọn một thành viên để hiển thị mã QR thanh toán cá nhân</p>
              </div>
            )}
            <div className="mt-12 pt-8 border-t border-white/10 w-full text-left space-y-4">
              <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase">
                <span>Tổng đơn nhóm</span>
                <span className="text-orange-500 text-2xl italic">{(getFinalTotal() + shippingFee).toLocaleString()}đ</span>
              </div>
              <button
                onClick={handleFinalOrder}
                disabled={isProcessing || items.length === 0}
                className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-orange-500/20"
              >
                {isProcessing ? <Loader2 className="animate-spin mx-auto" size={22} /> : "XÁC NHẬN CHỐT ĐƠN"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}