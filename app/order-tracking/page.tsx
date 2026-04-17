"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Đã thêm toast để không bị lỗi
import {
  Bike, MapPin, ChefHat, CheckCircle2, Navigation, Clock,
  Home, Phone, MessageCircle, User, ReceiptText, X, Send, PhoneCall, MicOff, PackageCheck
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

type NewType = {
  destination: string;
};

// --- MOCK GPS MAP COMPONENT ---
const FakeGPSMap = ({ destination }: NewType) => (
  <div className="relative w-full h-100 bg-slate-100 dark:bg-slate-900 rounded-[3rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-inner transition-colors duration-500">
    <div
      className="absolute inset-0 opacity-20 dark:opacity-10"
      style={{
        backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}
    />
    <svg className="absolute inset-0 w-full h-full">
      <motion.path d="M 50 350 Q 150 300 200 200 T 350 50" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="8" strokeLinecap="round" />
      <motion.path d="M 50 350 Q 150 300 200 200 T 350 50" fill="none" stroke="#f97316" strokeWidth="8" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 0.6 }} transition={{ duration: 2, ease: "easeInOut" }} />
    </svg>
    <div className="absolute left-10 bottom-10 text-center">
      <div className="w-8 h-8 bg-slate-900 dark:bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
        <ChefHat size={14} className="text-white" />
      </div>
      <p className="text-[8px] font-black uppercase mt-1 dark:text-slate-400">Shop</p>
    </div>
    <div className="absolute right-10 top-10 text-center">
      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse mx-auto">
        <MapPin size={14} className="text-white" />
      </div>
      <p className="text-[8px] font-black uppercase mt-1 text-slate-900 dark:text-slate-400">{destination}</p>
    </div>
    <motion.div
      animate={{ x: [50, 150, 210], y: [330, 280, 180] }}
      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      className="absolute z-20"
    >
      <div className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-2xl border border-orange-100 dark:border-orange-500/20 transition-colors">
        <Bike className="text-orange-500" size={20} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 animate-ping" />
      </div>
    </motion.div>
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-transparent dark:border-white/10 transition-all">
      <Navigation size={16} className="text-orange-500 animate-bounce" />
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white whitespace-nowrap">
        Shipper đang cách bạn 1.2km
      </span>
    </div>
  </div>
);

export default function OrderTrackingPage() {
  const [mounted, setMounted] = useState(false);
  const [deliveryDistrict, setDeliveryDistrict] = useState("VĂN PHÒNG");
  const [orderId, setOrderId] = useState("FOODIE-12345");
  const router = useRouter();

  // State cho Chat và Call
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: 'driver', text: 'Chào bạn, mình đang chờ quán làm món nhé. Khoảng 15p nữa mình giao tới ạ!' }
  ]);

  useEffect(() => {
    setMounted(true);
    const savedOrders = JSON.parse(localStorage.getItem("foodie_orders") || "[]");
    if (savedOrders.length > 0) {
      const latestOrder = savedOrders[savedOrders.length - 1];
      if (latestOrder.district) setDeliveryDistrict(latestOrder.district);
      if (latestOrder.id) setOrderId(latestOrder.id);
    }
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Thêm tin nhắn của mình
    setChatHistory(prev => [...prev, { sender: 'me', text: chatMessage }]);
    setChatMessage("");
    
    // Trả lời tự động của Shipper sau 1.5s
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'driver', text: 'Dạ vâng ạ, bạn đợi mình chút nhé!' }]);
    }, 1500);
  };

  // Hàm xử lý XÁC NHẬN NHẬN HÀNG
  const handleConfirmReceipt = () => {
    toast.success("Xác nhận thành công! Chúc team ăn ngon miệng nhé 😋");
    
    // Đợi 2 giây cho khách đọc thông báo rồi tự động hất về Trang chủ
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans bg-transparent dark:bg-slate-950 transition-colors duration-500 min-h-screen relative overflow-hidden">
      <div className="mb-8 flex justify-between items-end">
        <Breadcrumbs />
        <Link href="/" className="hidden md:flex items-center gap-2 text-slate-400 hover:text-orange-500 font-black uppercase text-[10px] tracking-widest transition-colors group">
          Về trang chủ
          <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
            <Home size={14} />
          </div>
        </Link>
      </div>
      
      <div className="mb-12">
        <h1 className="text-6xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
          Tracking <span className="text-orange-500">Order</span>
        </h1>
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] italic">
            Đơn hàng đang trên đường tới {deliveryDistrict.toLowerCase()}
          </p>
          <span className="px-3 py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-500 text-[9px] font-black rounded-lg uppercase tracking-widest border border-orange-200/50 flex items-center gap-1">
            <ReceiptText size={12}/> Mã ĐH: {orderId}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <FakeGPSMap destination={deliveryDistrict} />
        
        <div className="space-y-6">
          {/* CARD 1: THÔNG TIN TÀI XẾ */}
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-50 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
                <User size={32} />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg uppercase italic text-slate-900 dark:text-white">Trần Văn Hùng</span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Honda Wave • 59X1-123.45</span>
                <span className="text-[10px] text-orange-500 font-black tracking-widest uppercase mt-1"> ⭐  4.9 (1.2k chuyến)</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsChatOpen(true)}
                className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-all active:scale-95"
              >
                <MessageCircle size={20} />
              </button>
              <button
                onClick={() => setIsCalling(true)}
                className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-orange-500 flex items-center justify-center transition-all shadow-lg shadow-slate-900/20 active:scale-95"
              >
                <Phone size={20} />
              </button>
            </div>
          </div>

          {/* CARD 2: TIẾN ĐỘ ĐƠN HÀNG */}
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-50 dark:border-slate-800 shadow-2xl shadow-slate-100/50 dark:shadow-none transition-colors">
            <div className="flex justify-between items-end mb-10 pb-6 border-b border-slate-50 dark:border-slate-800">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic flex items-center gap-3">
                <Clock className="text-orange-500" /> Tiến độ
              </h3>
              <div className="text-right">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Dự kiến giao hàng</p>
                <p className="text-2xl font-black text-orange-500 italic">15 - 20<span className="text-sm ml-1 text-slate-900 dark:text-white">phút</span></p>
              </div>
            </div>
            <div className="space-y-10 relative pl-2">
              <div className="absolute left-8 top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800" />
              {[
                { label: "Đã nhận đơn", icon: <CheckCircle2 size={18}/>, done: true, time: "10:15 AM" },
                { label: "Đang chuẩn bị món", icon: <ChefHat size={18}/>, done: true, time: "10:20 AM" },
                { label: "Đang giao hàng", icon: <Bike size={18}/>, done: true, time: "10:35 AM" },
                { label: "Đã đến nơi", icon: <MapPin size={18}/>, done: false, time: "--:--" },
              ].map((s, i) => (
                <div key={i} className={`flex items-center gap-6 relative z-10 transition-all duration-500 ${s.done ? "opacity-100" : "opacity-30 dark:opacity-20"}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform ${s.done ? "bg-orange-500 text-white scale-110" : "bg-white dark:bg-slate-800 text-slate-300 dark:text-slate-600"}`}>
                    {s.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black uppercase italic text-sm tracking-tight text-slate-900 dark:text-white">
                      {s.label}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest">{s.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NÚT XÁC NHẬN NHẬN HÀNG (Chuẩn style Shopee) */}
          <button 
            onClick={handleConfirmReceipt}
            className="w-full h-16 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-black uppercase tracking-widest text-[13px] transition-all active:scale-95 shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3 mt-8 border border-orange-400/50"
          >
            <PackageCheck size={22} /> ĐÃ NHẬN ĐƯỢC HÀNG
          </button>
        </div>
      </div>

      {/* ======================= OVERLAYS ======================= */}

      {/* 1. KHUNG CHAT MINI */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-87.5 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 z-50 flex flex-col overflow-hidden"
          >
            {/* Header Chat */}
            <div className="bg-orange-500 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><User size={20}/></div>
                <div>
                  <h4 className="font-black uppercase text-sm leading-tight">Trần Văn Hùng</h4>
                  <span className="text-[10px] font-bold opacity-80 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div> Đang trực tuyến
                  </span>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>
            {/* Khung tin nhắn */}
            <div className="h-64 p-4 overflow-y-auto flex flex-col gap-3 bg-slate-50 dark:bg-slate-950/50">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`max-w-[80%] p-3 rounded-2xl text-sm font-medium ${msg.sender === 'me' ?
                  'bg-orange-500 text-white self-end rounded-br-sm' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white self-start rounded-bl-sm shadow-sm border border-slate-100 dark:border-slate-700'}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            {/* Chỗ nhập tin nhắn */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full px-4 text-sm outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white"
              />
              <button type="submit" className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shrink-0">
                <Send size={16} className="-ml-0.5 mt-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MÀN HÌNH GỌI ĐIỆN GIẢ LẬP */}
      <AnimatePresence>
        {isCalling && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-100 flex items-center justify-center"
          >
            <div className="flex flex-col items-center text-white">
              {/* Vòng tròn lan tỏa mờ ảo */}
              <div className="relative flex justify-center items-center mb-8">
                <div className="absolute w-40 h-40 bg-orange-500/20 rounded-full animate-ping"></div>
                <div className="absolute w-32 h-32 bg-orange-500/40 rounded-full animate-pulse"></div>
                <div className="relative w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl z-10">
                  <User size={48} className="text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-black uppercase italic mb-2 tracking-tighter">Trần Văn Hùng</h2>
              <p className="text-slate-400 font-medium tracking-widest text-sm mb-12 animate-pulse">Đang gọi điện...</p>
              <div className="flex gap-8">
                <button className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <MicOff size={24} />
                </button>
                {/* Nút Tắt Máy */}
                <button
                  onClick={() => setIsCalling(false)}
                  className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
                >
                  <PhoneCall size={24} className="rotate-135" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}