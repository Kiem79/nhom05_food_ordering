// components/layout/footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-orange-500">Foodie</h3>
          <p className="text-slate-400 text-sm">Hệ thống đặt món ăn nhóm dành cho sinh viên HCMUTE.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Liên kết</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/products">Thực đơn</Link></li>
            <li><Link href="/about">Thành viên</Link></li>
            <li><Link href="/contact">Liên hệ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Liên hệ</h4>
          <p className="text-sm text-slate-400">Số 1 Võ Văn Ngân, Thủ Đức, TP.HCM</p>
          <p className="text-sm text-slate-400">Email: nhom05@hcmute.edu.vn</p>
        </div>
      </div>
      <div className="text-center mt-10 pt-8 border-t border-slate-800 text-slate-500 text-xs">
        © 2026 Nhóm 05 - Đồ án Thiết kế Web. All rights reserved.
      </div>
    </footer>
  );
}