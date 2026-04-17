"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Gavel, UserPlus, ShoppingBag, Users2, 
  Wallet, Truck, AlertTriangle, History, 
  ArrowRight, Check, ShieldCheck, Sparkles, LucideIcon,
  HelpCircle
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface TermSection {
  id: string;
  number: string;
  title: string;
  icon: LucideIcon;
  content: string;
  highlights?: string[];
  subPoints?: { text: string }[];
  accentColor: string;
}

const termsData: TermSection[] = [
  {
    id: "intro",
    number: "01",
    title: "Giới thiệu chung",
    icon: Gavel,
    accentColor: "from-blue-600 to-cyan-500",
    content: `Foodie được xây dựng như một nền tảng kết nối giữa người dùng, nhà hàng và đơn vị giao hàng. Khi bạn sử dụng dịch vụ, bạn đang tham gia vào một hệ sinh thái có nhiều bên cùng phối hợp để hoàn thành một đơn hàng trọn vẹn. Điều khoản này giúp bạn hiểu rõ cách hệ thống vận hành và những nguyên tắc cơ bản khi sử dụng.

    Việc sử dụng Foodie đồng nghĩa với việc bạn đồng ý với các quy định được nêu trong tài liệu này. Đây không phải là những điều khoản mang tính “ràng buộc cứng nhắc”, mà là các nguyên tắc cần thiết để đảm bảo trải nghiệm công bằng và ổn định cho tất cả người dùng.

    Trong quá trình sử dụng, nếu có bất kỳ điểm nào chưa rõ, bạn hoàn toàn có thể liên hệ để được giải thích cụ thể. Foodie luôn hướng đến việc minh bạch, thay vì để người dùng phải “tự hiểu”.`
  },
  {
    id: "account",
    number: "02",
    title: "Tài khoản người dùng",
    icon: UserPlus,
    accentColor: "from-purple-600 to-pink-500",
    content: `Để sử dụng đầy đủ tính năng, bạn cần tạo tài khoản và cung cấp một số thông tin cơ bản. Những thông tin này giúp hệ thống nhận diện bạn, xử lý đơn hàng chính xác và hỗ trợ khi có vấn đề phát sinh.

    Việc giữ an toàn tài khoản là trách nhiệm trực tiếp của bạn. Điều này bao gồm việc không chia sẻ mật khẩu, không sử dụng tài khoản của người khác và đảm bảo thông tin luôn được cập nhật đúng thực tế.

    Trong trường hợp có dấu hiệu bất thường, hệ thống có thể tạm thời hạn chế hoặc khóa tài khoản để bảo vệ bạn và các bên liên quan.`,
    highlights: ["Trách nhiệm của bạn:"],
    subPoints: [
      { text: "Cung cấp thông tin chính xác khi đăng ký" },
      { text: "Bảo mật tài khoản và mật khẩu" },
      { text: "Không sử dụng tài khoản cho mục đích gian lận" },
      { text: "Cập nhật thông tin khi có thay đổi" }
    ]
  },
  {
    id: "orders",
    number: "03",
    title: "Đặt món & xử lý đơn hàng",
    icon: ShoppingBag,
    accentColor: "from-orange-600 to-yellow-500",
    content: `Khi bạn đặt món trên Foodie, hệ thống sẽ ghi nhận thông tin và chuyển đến nhà hàng để xử lý. Đây là một quy trình liên kết giữa nhiều bên, nên độ chính xác của thông tin bạn cung cấp đóng vai trò rất quan trọng.

    Một đơn hàng chỉ được xem là hoàn tất khi nhà hàng xác nhận và bắt đầu chuẩn bị món. Trong khoảng thời gian trước đó, bạn vẫn có thể chỉnh sửa hoặc hủy tùy theo trạng thái đơn.

    Foodie đóng vai trò nền tảng trung gian, nên việc chế biến và chất lượng món ăn thuộc trách nhiệm của nhà hàng. Tuy nhiên, hệ thống vẫn hỗ trợ tiếp nhận phản hồi và xử lý nếu có vấn đề.`,
    highlights: ["Một số nguyên tắc cần lưu ý:"],
    subPoints: [
      { text: "Mỗi đơn hàng chỉ áp dụng cho một nhà hàng" },
      { text: "Thông tin địa chỉ và liên hệ phải chính xác" },
      { text: "Thời gian giao hàng có thể thay đổi tùy điều kiện thực tế" },
      { text: "Đơn đã xác nhận có thể không hủy được" }
    ]
  },
  {
    id: "group",
    number: "04",
    title: "Đặt món nhóm",
    icon: Users2,
    accentColor: "from-green-600 to-emerald-500",
    content: `Tính năng đặt món nhóm cho phép nhiều người cùng tham gia vào một đơn hàng chung. Điều này giúp tiết kiệm chi phí giao hàng và đơn giản hóa việc chia bill.

    Khi tạo đơn nhóm, bạn trở thành “chủ phòng” và có quyền quản lý đơn hàng. Những người tham gia có thể thêm món, nhưng việc thanh toán và xác nhận cuối cùng vẫn cần được thực hiện rõ ràng để tránh nhầm lẫn.

    Hệ thống được thiết kế để minh bạch hóa từng phần: ai chọn món gì, giá bao nhiêu, tổng đơn ra sao. Điều này giúp hạn chế tranh cãi trong quá trình sử dụng.`,
    highlights: ["Cách vận hành cơ bản:"],
    subPoints: [
      { text: "Chủ phòng tạo đơn và chia sẻ link" },
      { text: "Thành viên tham gia thêm món vào giỏ chung" },
      { text: "Mỗi món được gắn với người đặt" },
      { text: "Thanh toán (Chủ phòng trả toàn bộ hoặc QR động)" }
    ]
  },
  {
    id: "payment",
    number: "05",
    title: "Thanh toán & chi phí",
    icon: Wallet,
    accentColor: "from-rose-600 to-red-500",
    content: `Thanh toán là bước cuối cùng để hoàn tất đơn hàng. Foodie hỗ trợ nhiều phương thức nhằm phù hợp với nhu cầu khác nhau của người dùng.

    Tùy vào lựa chọn của bạn, việc thanh toán có thể diễn ra trước hoặc sau khi nhận hàng. Với các giao dịch online, hệ thống sẽ chuyển qua đối tác thanh toán để đảm bảo an toàn.

    Mọi chi phí đều được hiển thị rõ ràng trước khi xác nhận, bao gồm giá món, phí giao hàng và các khoản giảm giá nếu có.`,
    highlights: ["Bạn cần lưu ý:"],
    subPoints: [
      { text: "Kiểm tra kỹ thông tin trước khi thanh toán" },
      { text: "Đảm bảo phương thức thanh toán hợp lệ" },
      { text: "Không chia sẻ thông tin thanh toán với bên thứ ba" },
      { text: "Các khoản phí hiển thị minh bạch trước xác nhận" }
    ]
  },
  {
    id: "delivery",
    number: "06",
    title: "Giao hàng",
    icon: Truck,
    accentColor: "from-indigo-600 to-blue-700",
    content: `Quá trình giao hàng được thực hiện bởi các đơn vị vận chuyển đối tác. Foodie đóng vai trò kết nối và theo dõi để đảm bảo đơn hàng được giao đúng người, đúng thời điểm.

    Thời gian giao hàng có thể thay đổi tùy vào khoảng cách, tình trạng đơn và thời điểm đặt. Những yếu tố như thời tiết, giờ cao điểm hoặc sự cố ngoài ý muốn đều có thể ảnh hưởng.

    Trong quá trình giao, tài xế có thể liên hệ trực tiếp để xác nhận vị trí hoặc hỗ trợ nhận hàng nhanh hơn.`,
    highlights: ["Một số điểm cần lưu ý:"],
    subPoints: [
      { text: "Luôn giữ điện thoại sẵn sàng khi chờ đơn" },
      { text: "Cung cấp địa chỉ rõ ràng, dễ tìm" },
      { text: "Kiểm tra đơn hàng khi nhận" },
      { text: "Phản hồi ngay nếu có sai sót" }
    ]
  },
  {
    id: "restrictions",
    number: "07",
    title: "Quy định sử dụng & hạn chế",
    icon: AlertTriangle,
    accentColor: "from-yellow-500 to-amber-500",
    content: `Để đảm bảo môi trường sử dụng lành mạnh, Foodie đặt ra một số quy định cơ bản. Những quy định này nhằm bảo vệ quyền lợi chung, không nhắm vào bất kỳ cá nhân nào.

    Các hành vi gian lận, lạm dụng hệ thống hoặc gây ảnh hưởng đến người khác đều có thể dẫn đến việc hạn chế tài khoản. Việc này được thực hiện có kiểm soát và dựa trên dữ liệu cụ thể.

    Foodie không can thiệp vào trải nghiệm của bạn nếu không cần thiết, nhưng sẽ hành động khi có dấu hiệu vi phạm rõ ràng.`,
    highlights: ["Các hành vi không được phép:"],
    subPoints: [
      { text: "Đặt đơn giả, không nhận hàng" },
      { text: "Lạm dụng mã giảm giá" },
      { text: "Sử dụng thông tin sai lệch" },
      { text: "Gây ảnh hưởng đến hệ thống hoặc người dùng khác" }
    ]
  },
  {
    id: "updates",
    number: "08",
    title: "Thay đổi & cập nhật dịch vụ",
    icon: History,
    accentColor: "from-slate-700 to-slate-900",
    content: `Dịch vụ của Foodie có thể thay đổi theo thời gian để phù hợp hơn với nhu cầu thực tế. Điều này bao gồm việc cập nhật tính năng, điều chỉnh quy trình hoặc cải thiện trải nghiệm.

    Những thay đổi quan trọng sẽ được thông báo rõ ràng để bạn nắm được. Việc tiếp tục sử dụng dịch vụ sau khi cập nhật được hiểu là bạn đồng ý với các điều chỉnh đó.

    Mục tiêu của việc cập nhật là giúp hệ thống hoạt động tốt hơn, không phải làm phức tạp trải nghiệm.`
  }
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500 pb-20 overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="relative pt-24 pb-36 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10 mask-[radial-gradient(ellipse_at_center,white,transparent)]">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Breadcrumbs />
          <div className="mt-12 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-2xl"
            >
              <ShieldCheck className="text-orange-500" size={18} />
              <span className="text-white font-black uppercase italic tracking-widest text-[10px]">Legal Framework 2026</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative overflow-visible pr-10" // pr-10 ngăn italic bị khuất chữ
            >
              <h1 className="text-7xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-[1.1] pb-4 pr-12 inline-block">
                ĐIỀU KHOẢN <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-yellow-400 to-orange-500 pr-10">DỊCH VỤ</span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl text-slate-400 font-bold text-lg md:text-xl italic leading-relaxed"
            >
              Vui lòng đọc kỹ các quy tắc vận hành của hệ thống Foodie để đảm bảo quyền lợi và trải nghiệm của bạn trong suốt quá trình sử dụng dịch vụ.
            </motion.p>
          </div>
        </div>

        <div className="absolute right-[-5%] bottom-[-10%] w-100 h-100 bg-orange-500/20 rounded-full blur-[100px] animate-pulse" />
      </header>

      {/* --- CARD LAYOUT --- */}
      <section className="max-w-5xl mx-auto px-6 -mt-20 relative z-20 space-y-12">
        {termsData.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left Side: Indicator */}
              <div className={`lg:w-20 bg-linear-to-b ${item.accentColor} flex lg:flex-col items-center justify-center p-5 lg:p-0`}>
                <span className="text-white font-black text-2xl italic lg:-rotate-90 whitespace-nowrap tracking-tighter opacity-40 uppercase">
                  Section {item.number}
                </span>
              </div>

              {/* Content Side */}
              <div className="flex-1 p-8 md:p-14">
                <div className="flex items-center gap-6 mb-8">
                  <div className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon size={32} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
                    {item.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  {item.content.split('\n\n').map((p, i) => (
                    <p key={i} className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed font-medium">
                      {p.trim()}
                    </p>
                  ))}
                </div>

                {item.subPoints && (
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.highlights && (
                      <div className="md:col-span-2 mb-2">
                         <span className="px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-500 text-[10px] font-black uppercase tracking-widest border border-orange-500/20">
                            {item.highlights[0]}
                         </span>
                      </div>
                    )}
                    {item.subPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                        <div className="mt-1 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                          <Check size={12} className="text-white" strokeWidth={4} />
                        </div>
                        <span className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-200 italic leading-snug">
                          {point.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* --- CTA SECTION --- */}
      <footer className="max-w-6xl mx-auto px-6 mt-32">
        <div className="relative bg-slate-900 dark:bg-slate-900 border border-white/5 rounded-[4rem] p-12 md:p-24 text-center space-y-10 overflow-hidden shadow-2xl">
          
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="inline-block"
            >
              <Sparkles className="text-orange-500 mx-auto" size={48} />
            </motion.div>
            
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
              BẠN ĐÃ NẮM RÕ <br />
              <span className="text-orange-500">ĐIỀU KHOẢN?</span>
            </h2>
            <p className="max-w-xl mx-auto text-slate-400 font-bold italic text-lg md:text-xl leading-relaxed">
              Sẵn sàng gia nhập đội ngũ đặt món thông minh nhất dành cho văn phòng?
            </p>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
            <Link 
              href="/" 
              className="group flex items-center gap-3 bg-orange-500 text-white px-12 py-6 rounded-full font-black uppercase italic tracking-widest text-base transition-all hover:scale-105 hover:bg-orange-600 shadow-xl shadow-orange-500/30"
            >
              Đồng ý & Tiếp tục <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link 
              href="/contact" 
              className="group flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-6 rounded-full font-black uppercase italic tracking-widest text-base transition-all hover:bg-white/10"
            >
              Bạn còn thắc mắc? <HelpCircle size={20} className="text-orange-500 group-hover:rotate-12 transition-transform" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}