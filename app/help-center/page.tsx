"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ChevronDown, 
  Search, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  Truck, 
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const faqData = [
  {
    id: "orders",
    title: "Đặt món & đơn hàng",
    icon: ShoppingBag,
    questions: [
      {
        q: "Làm thế nào để đặt món?",
        a: "Để đặt món trên Foodie, bạn chỉ cần thực hiện các bước sau:\n- Truy cập vào mục Thực đơn\n- Lựa chọn món ăn yêu thích\n- Nhấn Thêm vào giỏ hàng\n- Kiểm tra lại đơn hàng và chọn Thanh toán"
      },
      {
        q: "Tôi có thể đặt món từ nhiều nhà hàng trong cùng một đơn không?",
        a: "Hiện tại, mỗi đơn hàng chỉ hỗ trợ đặt từ một nhà hàng duy nhất nhằm đảm bảo chất lượng món ăn và thời gian giao hàng tối ưu."
      },
      {
        q: "Làm thế nào để theo dõi đơn hàng?",
        a: "Sau khi đặt món thành công, bạn có thể:\n- Theo dõi trạng thái đơn tại mục Lịch sử đơn hàng\n- Nhận thông báo cập nhật theo thời gian thực từ hệ thống"
      }
    ]
  },
  {
    id: "group",
    title: "Đặt món nhóm",
    icon: Users,
    questions: [
      {
        q: "Đặt món nhóm là gì?",
        a: "Đặt món nhóm là tính năng cho phép nhiều người cùng tham gia vào một đơn hàng chung.\nLợi ích bao gồm:\n- Tiết kiệm chi phí giao hàng\n- Dễ dàng quản lý và chia hóa đơn"
      },
      {
        q: "Làm thế nào để tạo đơn nhóm?",
        a: "Bạn có thể tạo đơn nhóm theo các bước sau:\n1. Truy cập vào mục Đặt món nhóm\n2. Chọn món đầu tiên (bạn sẽ là chủ phòng)\n3. Nhấn Mời bạn bè\n4. Chia sẻ liên kết để mọi người cùng tham gia"
      },
      {
        q: "Bạn bè của tôi thêm món như thế nào?",
        a: "Người tham gia chỉ cần:\n- Truy cập vào liên kết mời\n- Lựa chọn món và thêm vào giỏ hàng\nMỗi món ăn sẽ được hiển thị kèm tên người đặt để thuận tiện cho việc chia bill."
      },
      {
        q: "Ai sẽ thực hiện thanh toán?",
        a: "Người tạo đơn (chủ phòng) sẽ là người thực hiện thanh toán cho toàn bộ đơn hàng.\nNgoài ra, hệ thống cũng hỗ trợ tùy chọn thanh toán linh hoạt: mỗi thành viên trong nhóm có thể tự thanh toán phần của mình thông qua mã QR động."
      }
    ]
  },
  {
    id: "payment",
    title: "Thanh toán & mã giảm giá",
    icon: CreditCard,
    questions: [
      {
        q: "Các phương thức thanh toán được hỗ trợ",
        a: "Foodie hiện hỗ trợ các hình thức thanh toán sau:\n- Thanh toán khi nhận hàng (COD)\n- Thanh toán trực tuyến"
      },
      {
        q: "Cách sử dụng mã giảm giá",
        a: "Để áp dụng mã ưu đãi:\n1. Nhập mã vào ô Voucher\n2. Nhấn Áp dụng\nHệ thống sẽ tự động cập nhật giá trị giảm trừ"
      },
      {
        q: "Vì sao mã giảm giá không hoạt động?",
        a: "Một số nguyên nhân phổ biến gồm:\n- Mã đã hết hạn sử dụng\n- Mã không áp dụng cho nhà hàng hiện tại\n- Đơn hàng chưa đạt giá trị tối thiểu"
      }
    ]
  },
  {
    id: "delivery",
    title: "Giao hàng",
    icon: Truck,
    questions: [
      {
        q: "Thời gian giao hàng dự kiến",
        a: "Thời gian giao hàng thường dao động từ 20–45 phút, tùy thuộc vào:\n- Khoảng cách giao hàng\n- Nhà hàng\n- Thời điểm đặt (giờ cao điểm hoặc thấp điểm)"
      },
      {
        q: "Tôi có thể hủy đơn hàng không?",
        a: "Bạn có thể hủy đơn hàng trong trường hợp:\n- Đơn hàng chưa được nhà hàng xác nhận\nSau khi đơn đã được xác nhận, việc hủy có thể không khả dụng."
      }
    ]
  }
];

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredFaq = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500 pb-20 overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="relative pt-24 pb-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10 mask-[radial-gradient(ellipse_at_center,white,transparent)]">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Breadcrumbs />
          <div className="mt-12 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2 rounded-2xl"
            >
              <ShieldCheck className="text-orange-500" size={16} />
              <span className="text-white font-black uppercase italic tracking-widest text-[10px]">Support System 2026</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative overflow-visible"
            >
              <h1 className="text-7xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-[1.2] pb-4 pr-12 inline-block">
                TRUNG TÂM <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-yellow-400 to-orange-500 pr-10">TRỢ GIÚP</span>
              </h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-3xl text-slate-400 font-bold text-lg md:text-xl italic leading-relaxed space-y-4"
            >
              <p>Chào mừng bạn đến với Trung tâm Trợ giúp của Foodie.</p>
              <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn trong toàn bộ quá trình sử dụng dịch vụ, từ đặt món cá nhân, đặt món theo nhóm, thanh toán cho đến theo dõi đơn hàng.</p>
              <p>Nếu bạn gặp bất kỳ khó khăn nào, vui lòng tham khảo các nội dung bên dưới hoặc liên hệ trực tiếp với chúng tôi để được hỗ trợ nhanh chóng và hiệu quả.</p>
            </motion.div>
          </div>
        </div>

        <div className="absolute right-[-5%] bottom-[-10%] w-75 h-75 bg-orange-500/15 rounded-full blur-[80px] animate-pulse" />
      </header>

      {/* SEARCH BAR */}
      <section className="max-w-4xl mx-auto px-6 -mt-10 relative z-30">
        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
          </div>
          <input 
            type="text"
            placeholder="Tìm kiếm vấn đề bạn gặp phải..."
            className="w-full pl-14 pr-6 py-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all text-slate-900 dark:text-white"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-16">
          {filteredFaq.length > 0 ? (
            filteredFaq.map((category) => (
              <div key={category.id} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500 dark:bg-orange-500/10 rounded-2xl text-white dark:text-orange-500 shadow-lg shadow-orange-500/20">
                    <category.icon size={28} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                    {category.title}
                  </h2>
                </div>

                <div className="grid gap-4">
                  {category.questions.map((item, qIdx) => {
                    const uniqueId = `${category.id}-${qIdx}`;
                    const isOpen = openId === uniqueId;

                    return (
                      <div 
                        key={uniqueId}
                        className={`group border rounded-[2rem] transition-all duration-300 ${
                          isOpen 
                          ? "bg-white dark:bg-slate-900 border-orange-500 shadow-xl shadow-orange-500/10" 
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-orange-500"
                        }`}
                      >
                        <button 
                          onClick={() => setOpenId(isOpen ? null : uniqueId)}
                          className="w-full flex items-center justify-between p-7 text-left"
                        >
                          <span className={`text-lg font-bold transition-colors ${isOpen ? "text-orange-500" : "text-slate-800 dark:text-slate-200"}`}>
                            {item.q}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            className={`p-2 rounded-xl transition-colors ${isOpen ? "bg-orange-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}
                          >
                            <ChevronDown size={20} />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-7 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-line border-t border-slate-50 dark:border-slate-800 mt-2">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <HelpCircle size={64} className="mx-auto text-slate-200 dark:text-slate-800 mb-4" />
              <p className="text-slate-500 text-xl font-bold">Không tìm thấy kết quả phù hợp.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <footer className="max-w-6xl mx-auto px-6 mt-12">
        <div className="relative bg-slate-900 dark:bg-slate-900 border border-white/5 rounded-[4rem] p-12 md:p-20 text-center space-y-10 overflow-hidden shadow-2xl">
          
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="inline-block"
            >
              <Sparkles className="text-orange-500 mx-auto" size={48} />
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
              VẪN CẦN <br />
              <span className="text-orange-500">GIÚP ĐỠ?</span>
            </h2>
            <p className="max-w-xl mx-auto text-slate-400 font-bold italic text-lg md:text-xl leading-relaxed">
               Nếu bạn cần thêm sự hỗ trợ, vui lòng liên hệ trực tiếp với chúng tôi. Chúng tôi luôn sẵn sàng đồng hành và mang đến cho bạn trải nghiệm tốt nhất.
            </p>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
            <Link 
              href="/contact" 
              className="group flex items-center gap-3 bg-orange-500 text-white px-12 py-6 rounded-full font-black uppercase italic tracking-widest text-base transition-all hover:scale-105 hover:bg-orange-600 shadow-xl shadow-orange-500/30"
            >
              Liên hệ ngay <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link 
              href="/" 
              className="group flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-6 rounded-full font-black uppercase italic tracking-widest text-base transition-all hover:bg-white/10"
            >
              Về trang chủ <ArrowRight size={20} className="text-orange-500 group-hover:rotate-12 transition-transform" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}