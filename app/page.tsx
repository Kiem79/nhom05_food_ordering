import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Star, Clock, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="py-10 space-y-20">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Đặt món ăn nhóm <span className="text-orange-600">Tiết kiệm & Vui vẻ</span>
          </h1>
          <p className="text-lg text-slate-600">
            Nền tảng gộp đơn hàng đầu cho sinh viên HCMUTE. Đặt cùng nhau, giao một chỗ, nhận ưu đãi lớn!
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700" asChild>
              <Link href="/products">Khám phá ngay <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/group-order">Mở phòng đặt nhóm</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000" alt="Food Hero" className="rounded-3xl shadow-2xl" />
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { icon: <Clock className="w-10 h-10 mx-auto text-orange-600" />, title: "Giao hàng nhanh", desc: "Chỉ trong 15-30 phút" },
          { icon: <Star className="w-10 h-10 mx-auto text-orange-600" />, title: "Chất lượng 5 sao", desc: "Từ các đối tác uy tín" },
          { icon: <ShieldCheck className="w-10 h-10 mx-auto text-orange-600" />, title: "Thanh toán an toàn", desc: "Bảo mật thông tin 100%" },
        ].map((f, i) => (
          <div key={i} className="p-8 bg-white rounded-2xl border hover:shadow-lg transition-shadow">
            {f.icon}
            <h3 className="text-xl font-bold mt-4">{f.title}</h3>
            <p className="text-slate-500 mt-2">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}