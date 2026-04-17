"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, Lock, Database, Eye, Share2, 
  UserCheck, Clock, RefreshCcw, Mail, Phone, 
  ArrowRight, ChevronRight, Hash, 
  Server, Globe, Smartphone, CreditCard,
  LucideIcon, CheckCircle2, ShieldAlert,
  ShieldEllipsis, KeyRound, ScanEye, UserSearch, Sparkles
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface PolicySection {
  id: string;
  title: string;
  icon: LucideIcon;
  content: string;
  bullets?: { label: string; detail: string; icon: LucideIcon }[];
  list?: string[];
  contactInfo?: {
    email: string;
    hotline: string;
    time: string;
  };
}

const policyData: PolicySection[] = [
  {
    id: "intro",
    title: "Giới thiệu chung",
    icon: ShieldCheck,
    content: `Foodie hoạt động như một nền tảng trung gian giữa người dùng, nhà hàng và đơn vị giao hàng. Điều đó có nghĩa là trong quá trình sử dụng, sẽ có những thông tin cá nhân cần được xử lý để đảm bảo dịch vụ vận hành đúng và đủ. Việc bảo mật thông tin không chỉ là yếu tố kỹ thuật mà còn là cam kết về sự tôn trọng đối với người dùng.

    Khi bạn tạo tài khoản, đặt món hoặc tham gia vào đơn hàng nhóm, bạn đang tin tưởng giao cho hệ thống một phần dữ liệu cá nhân của mình. Foodie hiểu điều đó và xây dựng toàn bộ hệ thống dựa trên nguyên tắc: chỉ thu thập những gì thực sự cần thiết và luôn có trách nhiệm trong việc bảo vệ.

    Chính sách này được xây dựng để giải thích rõ ràng cách chúng tôi xử lý dữ liệu, theo cách dễ hiểu và thực tế nhất. Bạn không cần phải đọc theo kiểu “điều khoản pháp lý”, mà chỉ cần nắm được: thông tin của bạn được dùng để phục vụ bạn, không phải để khai thác một cách tùy tiện.`
  },
  {
    id: "collect",
    title: "Thông tin thu thập",
    icon: Database,
    content: `Trong quá trình sử dụng Foodie, một số thông tin sẽ được ghi nhận để đảm bảo trải nghiệm của bạn diễn ra liền mạch. Những thông tin này không được thu thập một cách ngẫu nhiên, mà gắn trực tiếp với từng hành động bạn thực hiện trên hệ thống.

    Ví dụ, khi bạn đặt món, hệ thống cần biết bạn là ai, địa chỉ ở đâu và liên hệ bằng cách nào. Khi bạn tham gia đặt nhóm, hệ thống cần ghi nhận bạn đã chọn món gì để phục vụ việc chia bill. Những dữ liệu này giúp mọi thứ diễn ra chính xác và tránh sai sót trong quá trình xử lý đơn hàng.

    Bên cạnh đó, một số thông tin kỹ thuật cũng được ghi nhận để cải thiện trải nghiệm, như tốc độ tải trang, lỗi phát sinh hoặc cách bạn tương tác với ứng dụng. Những dữ liệu này không nhằm theo dõi cá nhân mà để giúp hệ thống hoạt động ổn định hơn theo thời gian.`,
    bullets: [
      { label: "Thông tin cá nhân", detail: "họ tên, số điện thoại, email", icon: UserCheck },
      { label: "Thông tin giao hàng", detail: "địa chỉ, ghi chú", icon: Globe },
      { label: "Dữ liệu sử dụng", detail: "lịch sử đơn, hành vi chọn món", icon: Clock },
      { label: "Thông tin kỹ thuật", detail: "thiết bị, IP, trình duyệt", icon: Smartphone },
      { label: "Thanh toán", detail: "xử lý qua đối tác, không lưu thông tin nhạy cảm", icon: CreditCard }
    ]
  },
  {
    id: "purpose",
    title: "Mục đích sử dụng",
    icon: Eye,
    content: `Mỗi dữ liệu bạn cung cấp đều gắn với một mục đích cụ thể trong hệ thống. Foodie không thu thập thông tin “cho có”, mà sử dụng trực tiếp để phục vụ quá trình đặt món và trải nghiệm của bạn.

    Chẳng hạn, địa chỉ giúp đơn hàng được giao đúng nơi, số điện thoại giúp tài xế liên hệ khi cần, còn lịch sử đơn hàng giúp bạn đặt lại nhanh hơn vào những lần sau. Những chi tiết này có thể nhỏ, nhưng khi kết hợp lại, chúng tạo nên một trải nghiệm mượt mà và ít sai sót.

    Ngoài việc phục vụ trực tiếp, dữ liệu cũng giúp Foodie hiểu người dùng tốt hơn. Khi biết bạn thường chọn món gì, hệ thống có thể đề xuất phù hợp hơn, giảm thời gian tìm kiếm. Điều này không mang tính “theo dõi”, mà là cách tối ưu hóa trải nghiệm cá nhân hóa.`,
    list: [
      "Xử lý đơn hàng và giao nhận",
      "Xác nhận và bảo mật thanh toán",
      "Hiển thị trạng thái đơn theo thời gian thực",
      "Hỗ trợ khi có sự cố",
      "Cá nhân hóa nội dung và gợi ý món ăn"
    ]
  },
  {
    id: "share",
    title: "Chia sẻ thông tin",
    icon: Share2,
    content: `Để một đơn hàng hoàn thành, Foodie cần phối hợp với nhiều bên khác nhau. Điều đó có nghĩa là trong quá trình sử dụng, một phần thông tin sẽ được chia sẻ, nhưng luôn trong phạm vi cần thiết và có kiểm soát.

    Ví dụ, nhà hàng cần biết món bạn đặt và yêu cầu kèm theo để chuẩn bị đúng. Đơn vị giao hàng cần địa chỉ và số điện thoại để giao đúng người. Những dữ liệu này không thể thiếu nếu muốn dịch vụ hoạt động trơn tru.

    Foodie đặt ra nguyên tắc rất rõ: không chia sẻ thông tin ngoài mục đích phục vụ đơn hàng. Các đối tác cũng phải tuân thủ tiêu chuẩn bảo mật tương ứng và không được sử dụng dữ liệu cho mục đích riêng.`,
    list: [
      "Nhà hàng (xử lý món ăn)",
      "Đơn vị giao hàng (thực hiện giao nhận)",
      "Đối tác thanh toán (xử lý giao dịch)"
    ]
  },
  {
    id: "security",
    title: "Bảo mật thông tin",
    icon: Lock,
    content: `Việc bảo mật không chỉ nằm ở một lớp hệ thống, mà là nhiều lớp kết hợp lại. Foodie xây dựng cơ chế bảo mật từ phía người dùng cho đến hạ tầng kỹ thuật phía sau.

    Khi bạn đăng nhập hoặc thực hiện thanh toán, dữ liệu sẽ được mã hóa để tránh bị truy cập trái phép. Bên trong hệ thống, quyền truy cập cũng được giới hạn, không phải ai cũng có thể xem dữ liệu của bạn.

    Dù vậy, môi trường internet luôn tồn tại rủi ro nhất định. Điều Foodie làm là giảm thiểu tối đa khả năng xảy ra sự cố và phản ứng nhanh nếu có vấn đề phát sinh, thay vì hứa hẹn một mức an toàn tuyệt đối không thực tế.`,
    list: [
      "Mã hóa dữ liệu quan trọng",
      "Kiểm soát quyền truy cập nội bộ",
      "Theo dõi hành vi bất thường",
      "Sao lưu và phục hồi dữ liệu"
    ]
  },
  {
    id: "rights",
    title: "Quyền của người dùng",
    icon: UserCheck,
    content: `Foodie không giữ dữ liệu của bạn theo kiểu “một chiều”. Bạn luôn có quyền truy cập, chỉnh sửa hoặc yêu cầu xử lý thông tin của mình bất kỳ lúc nào.

    Trong thực tế, nhu cầu của người dùng có thể thay đổi: bạn đổi số điện thoại, chuyển địa chỉ, hoặc đơn giản là không muốn nhận thông báo nữa. Hệ thống được thiết kế để bạn có thể chủ động thực hiện những thay đổi này.

    Trong trường hợp bạn muốn dừng sử dụng dịch vụ, bạn cũng có thể yêu cầu xóa tài khoản. Foodie sẽ xử lý theo quy trình, đảm bảo dữ liệu được xóa hoặc ẩn danh đúng cách.`,
    list: [
      "Xem và cập nhật thông tin cá nhân",
      "Yêu cầu xóa tài khoản",
      "Tắt thông báo marketing",
      "Liên hệ để kiểm tra dữ liệu"
    ]
  },
  {
    id: "storage",
    title: "Lưu trữ dữ liệu",
    icon: Server,
    content: `Không phải mọi dữ liệu đều được giữ mãi mãi. Foodie chỉ lưu trữ thông tin trong khoảng thời gian cần thiết để phục vụ mục đích vận hành và tuân thủ quy định.

    Ví dụ, lịch sử đơn hàng có thể được giữ lại để bạn tra cứu hoặc xử lý khiếu nại. Trong khi đó, những dữ liệu không còn giá trị sử dụng sẽ được loại bỏ hoặc chuyển sang dạng ẩn danh.

    Việc lưu trữ được thực hiện có kiểm soát, đảm bảo không tồn tại dữ liệu “thừa” gây rủi ro cho người dùng.`
  },
  {
    id: "updates",
    title: "Cập nhật chính sách",
    icon: RefreshCcw,
    content: `Dịch vụ thay đổi theo thời gian, và chính sách cũng cần cập nhật để phản ánh đúng cách hệ thống hoạt động. Điều này có thể đến từ việc nâng cấp tính năng hoặc yêu cầu từ pháp lý.

    Foodie không thay đổi chính sách một cách âm thầm. Khi có điều chỉnh quan trọng, bạn sẽ được thông báo rõ ràng để nắm và quyết định có tiếp tục sử dụng dịch vụ hay không.

    Việc cập nhật này nhằm đảm bảo tính minh bạch, không phải để làm phức tạp thêm trải nghiệm của bạn.`
  },
  {
    id: "contact",
    title: "Thông tin liên hệ",
    icon: Mail,
    content: `Trong quá trình sử dụng, nếu bạn có bất kỳ thắc mắc nào liên quan đến dữ liệu cá nhân hoặc bảo mật, bạn hoàn toàn có thể liên hệ trực tiếp với Foodie. 

    Đội ngũ hỗ trợ sẽ tiếp nhận và xử lý theo từng trường hợp cụ thể, không trả lời chung chung. Mục tiêu là giúp bạn hiểu rõ vấn đề và có hướng giải quyết rõ ràng.`,
    contactInfo: {
      email: "support@foodie.vn",
      hotline: "1900 1234",
      time: "08:00 – 22:00 mỗi ngày"
    }
  }
];

export default function PrivacyPolicyPage() {
  const [selectedId, setSelectedId] = useState("intro");
  const activeSection = policyData.find(s => s.id === selectedId) || policyData[0];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="relative pt-24 pb-40 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10 mask-[radial-gradient(ellipse_at_center,white,transparent)]">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs />
          <div className="mt-16 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2 rounded-2xl"
            >
              <ShieldAlert className="text-orange-500" size={16} />
              <span className="text-white font-black uppercase italic tracking-widest text-[10px]">Security Protocol 2026</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative overflow-visible"
            >
              <h1 className="text-7xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-[1.2] pb-4 pr-12 inline-block">
                CHÍNH SÁCH <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-yellow-400 to-orange-500 pr-10">BẢO MẬT</span>
              </h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-4xl text-slate-400 font-bold text-lg md:text-xl italic leading-relaxed space-y-4"
            >
              <p className="flex items-center gap-3 text-orange-500 mb-4">
                <Clock size={20} /> Cập nhật lần cuối: 17/04/2026
              </p>
              <p>Chào mừng bạn đến với Trung tâm Bảo mật của Foodie. Chúng tôi hiểu rằng dữ liệu cá nhân là tài sản quý giá nhất của bạn.</p>
              <p>Chính sách này được thiết kế để minh bạch hóa mọi quy trình thu thập, xử lý và bảo vệ thông tin, giúp bạn an tâm tuyệt đối khi trải nghiệm dịch vụ đặt món tại hệ thống của chúng tôi.</p>
            </motion.div>
          </div>
        </div>

        <div className="absolute right-[-10%] bottom-[-10%] w-125 h-125 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
      </header>

      {/* MAIN LAYOUT */}
      <section className="max-w-7xl mx-auto px-6 py-24 -mt-16 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT: STICKY SIDEBAR NAVIGATION */}
          <aside className="lg:w-87.5 shrink-0">
            <div className="sticky top-28 space-y-2 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 px-4">Mục lục văn bản</p>
              {policyData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 group ${
                    selectedId === item.id 
                    ? "bg-slate-900 dark:bg-orange-600 text-white shadow-xl translate-x-3" 
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={18} className={selectedId === item.id ? "text-orange-500" : "group-hover:text-orange-500"} />
                    <span className="font-black text-sm uppercase italic tracking-tight">{item.title}</span>
                  </div>
                  <ChevronRight size={14} className={selectedId === item.id ? "opacity-100" : "opacity-0"} />
                </button>
              ))}
            </div>
          </aside>

          {/* RIGHT: DYNAMIC CONTENT BOX */}
          <main className="flex-1 min-h-175">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-slate-800 p-10 md:p-16 shadow-2xl shadow-slate-200/50 dark:shadow-none"
              >
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 bg-orange-500/10 rounded-3xl flex items-center justify-center text-orange-500">
                    <activeSection.icon size={32} />
                  </div>
                  <div className="h-px flex-1 bg-linear-to-r from-orange-500/50 to-transparent"></div>
                  <Hash className="text-slate-100 dark:text-slate-800" size={60} />
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-10 leading-tight">
                  {activeSection.title}
                </h2>

                <div className="space-y-8">
                  {activeSection.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-slate-600 dark:text-slate-300 text-xl leading-relaxed font-medium">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>

                {/* LOGIC HIỂN THỊ CÁC THÀNH PHẦN ĐẶC BIỆT THEO ID */}
                {selectedId === "purpose" && activeSection.list && (
                  <div className="mt-12 space-y-4">
                    {activeSection.list.map((item, i) => (
                      <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-orange-500 transition-all group">
                        <div className="relative">
                          <ScanEye className="text-orange-500 group-hover:rotate-90 transition-transform duration-500" size={24} />
                          <div className="absolute inset-0 bg-orange-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        </div>
                        <span className="text-slate-800 dark:text-slate-200 font-black uppercase italic tracking-wider text-sm md:text-lg">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {selectedId === "share" && activeSection.list && (
                  <div className="mt-12 grid grid-cols-1 gap-3">
                    {activeSection.list.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-900 text-white hover:bg-orange-600 transition-colors shadow-xl group">
                        <div className="flex items-center gap-4">
                          <ShieldEllipsis size={24} className="text-orange-500 group-hover:text-white" />
                          <span className="font-bold uppercase tracking-tight italic text-lg">{item}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-125 transition-transform">
                          <CheckCircle2 size={16} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedId === "security" && activeSection.list && (
                  <div className="mt-12 space-y-3">
                    {activeSection.list.map((item, i) => (
                      <div key={i} className="relative overflow-hidden group p-1 bg-linear-to-r from-slate-200 to-transparent dark:from-slate-800 rounded-2xl">
                        <div className="bg-white dark:bg-slate-950 p-6 rounded-[calc(1rem-1px)] flex items-center gap-5 group-hover:translate-x-2 transition-transform">
                          <KeyRound className="text-orange-500 -rotate-45 group-hover:rotate-0 transition-transform" size={24} />
                          <span className="text-slate-900 dark:text-white font-black uppercase italic text-lg">
                            {item}
                          </span>
                        </div>
                        <div className="absolute right-0 top-0 h-full w-1 bg-orange-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedId === "rights" && activeSection.list && (
                  <div className="mt-12 grid md:grid-cols-2 gap-4">
                    {activeSection.list.map((item, i) => (
                      <div key={i} className="p-8 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 hover:bg-orange-500/5 hover:border-orange-500 transition-all text-center group">
                        <UserSearch className="mx-auto mb-4 text-slate-300 group-hover:text-orange-500 transition-colors" size={32} />
                        <span className="block text-slate-800 dark:text-slate-100 font-black uppercase italic tracking-tighter leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {selectedId === "collect" && activeSection.bullets && (
                  <div className="grid md:grid-cols-2 gap-4 mt-12">
                    {activeSection.bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-5 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 group hover:border-orange-500/50 transition-colors">
                        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl text-orange-500 shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all">
                          <b.icon size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{b.label}</p>
                          <p className="text-slate-900 dark:text-white font-bold uppercase italic">{b.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeSection.contactInfo && (
                  <div className="mt-12 grid gap-4">
                    <ContactRow icon={Mail} label="Email hỗ trợ" value={activeSection.contactInfo.email} href={`mailto:${activeSection.contactInfo.email}`} />
                    <ContactRow icon={Phone} label="Hotline" value={activeSection.contactInfo.hotline} href={`tel:${activeSection.contactInfo.hotline.replace(/\s/g, '')}`} />
                    <div className="flex items-center gap-6 p-8 rounded-3xl bg-slate-900 text-white">
                      <Clock className="text-orange-500" size={28} />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Thời gian làm việc</p>
                        <p className="text-xl font-black italic uppercase tracking-tight">{activeSection.contactInfo.time}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <footer className="max-w-7xl mx-auto px-6 mb-24">
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
              DỮ LIỆU CỦA BẠN <br />
              <span className="text-orange-500">LUÔN AN TOÀN</span>
            </h2>
            <p className="max-w-2xl mx-auto text-slate-400 font-bold italic text-lg md:text-xl leading-relaxed">
              Foodie cam kết không ngừng nâng cấp hệ thống bảo mật để bảo vệ quyền lợi của bạn. Nếu có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với đội ngũ hỗ trợ kỹ thuật của chúng tôi.
            </p>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
            <Link 
              href="/contact" 
              className="group flex items-center gap-3 bg-orange-500 text-white px-12 py-6 rounded-full font-black uppercase italic tracking-widest text-base transition-all hover:scale-105 hover:bg-orange-600 shadow-xl shadow-orange-500/30"
            >
              Liên hệ bảo mật <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
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

function ContactRow({ icon: Icon, label, value, href }: { icon: LucideIcon, label: string, value: string, href: string }) {
  return (
    <a href={href} className="flex items-center justify-between p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 hover:border-orange-500/50 transition-all group">
      <div className="flex items-center gap-6">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl text-orange-500 shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all">
          <Icon size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{label}</p>
          <p className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">{value}</p>
        </div>
      </div>
      <ArrowRight className="text-slate-300 group-hover:text-orange-500 transition-all group-hover:translate-x-2" size={24} />
    </a>
  );
}