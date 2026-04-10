"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">F</div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">foodie.</span>
            </Link>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Nền tảng đặt món ăn nhóm hàng đầu dành cho sinh viên. Tiết kiệm hơn, vui vẻ hơn.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Khám phá</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><Link href="/products" className="hover:text-orange-500 transition-colors">Thực đơn</Link></li>
              <li><Link href="/group-order" className="hover:text-orange-500 transition-colors">Đặt món nhóm</Link></li>
              <li><Link href="/about" className="hover:text-orange-200">Về chúng tôi</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Hỗ trợ</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Trung tâm trợ giúp</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Điều khoản dịch vụ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Kết nối</h4>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-orange-500 hover:bg-orange-50 cursor-pointer transition-all">FB</div>
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-orange-500 hover:bg-orange-50 cursor-pointer transition-all">IG</div>
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-orange-500 hover:bg-orange-50 cursor-pointer transition-all">YT</div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-50 text-center">
          <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
            © 2026 Foodie Project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;