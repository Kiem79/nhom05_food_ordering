"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Zap, Heart, X } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const basePath = "/nhom05_food_ordering";

// Icon Github SVG bất tử - Tránh triệt để lỗi Build
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} height={size} 
    viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2.5" 
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const members = [
  {
    name: 'Lê Đức Mạnh',
    mssv: '24128129',
    role: 'Leader - System Architect & Group Logic',
    description: `Thiết kế Kiến trúc & Quản trị trạng thái: Xây dựng "bộ não" điều phối dữ liệu toàn cục bằng Zustand Store, tối ưu luồng vận hành hệ thống.
Giải pháp Đặt món nhóm (Group Order): Phát triển cấu trúc dữ liệu đa người dùng và thuật toán chia hóa đơn (Split Bill) tự động, chính xác.
Hệ thống Định danh & Bảo mật: Triển khai module Auth và kiểm soát dữ liệu chuyên nghiệp theo tiêu chuẩn TMĐT (React Hook Form / Zod).
Quản trị mã nguồn & Chất lượng UI/UX: Điều phối Git Flow, xử lý Conflict và kiểm soát tiêu chuẩn Cinematic cho toàn dự án.`,
    github: 'https://github.com/Kiem79',
    avatar: '/images/Members/Manh.jpg',
  },
  {
    name: 'Võ Tấn Tài',
    mssv: '24126197',
    role: 'Frontend Developer (UI/UX & Static Pages)',
    description: `Thiết kế và phát triển trang Giới thiệu (About), hiển thị danh sách thành viên nhóm kèm thông tin (tên, MSSV, vai trò) và liên kết GitHub cá nhân.
Xây dựng giao diện trình bày thông tin nhóm rõ ràng, trực quan, đảm bảo tính thẩm mỹ và chuyên nghiệp.
Phát triển trang Liên hệ (Contact) với form nhập liệu gồm họ tên, email và nội dung.
Triển khai kiểm tra tính hợp lệ (validation) cho form (định dạng email, không để trống trường dữ liệu).
Tích hợp Google Maps để hiển thị vị trí khu vực mục tiêu (ví dụ: xung quanh trường học).
Tối ưu trải nghiệm người dùng (UI/UX) với bố cục hợp lý, tương thích nhiều thiết bị (responsive).
Quản lý và tối ưu tài nguyên hình ảnh trong thư mục public/images/products.`,
    github: 'https://github.com/taivo08012006-hub/project-cu-i-k-.git',
    avatar: '/images/Members/Tai.jpg',
  },
  {
    name: 'Trần Nguyễn Thảo Nguyên',
    mssv: '24126157',
    role: 'Content & Data Manager (Frontend Support)',
    description: `Quản lý và tổ chức dữ liệu món ăn thông qua file data.json, đảm bảo thông tin đầy đủ (tên, giá, mô tả, calo, thành phần).
Phát triển trang chi tiết sản phẩm (Product Detail) bằng Dynamic Route, hiển thị hình ảnh, mô tả và thông số dinh dưỡng.
Xây dựng trang Dashboard cá nhân, hiển thị lịch sử đơn hàng bằng LocalStorage.
Tối ưu trải nghiệm hiển thị hình ảnh sản phẩm (gallery, click đổi ảnh chính).`,
    github: 'https://github.com/24126157-ux',
    avatar: '/images/Members/Nguyen.jpg',
  },
  {
    name: 'Nguyễn Thị Bích Nhi',
    mssv: '24126166',
    role: 'User & Order Management Developer',
    description: `Xây dựng trang Dashboard người dùng, hiển thị thông tin cá nhân (tên, avatar, tổng chi tiêu).
Phát triển trang Lịch sử đơn hàng (History), hiển thị danh sách các đơn đã đặt dưới dạng Card trực quan.
Quản lý trạng thái đơn hàng bằng orderStore (Zustand), đồng bộ dữ liệu từ hệ thống thanh toán.
Thiết kế và triển khai Modal chi tiết đơn hàng, cho phép xem danh sách món ăn trong từng đơn.
Xây dựng hệ thống lưu trữ dữ liệu (Persistence) bằng Zustand hoặc LocalStorage, đảm bảo dữ liệu không bị mất khi reload trang.
Tối ưu trải nghiệm người dùng với thống kê cá nhân hóa (tổng số đơn, món ăn yêu thích).`,
    github: 'https://github.com/24126166-tech',
    avatar: '/images/Members/Bich%20Nhi.jpg',
  },
  {
    name: 'Lê Thị Xuân Nhi',
    mssv: '24126165',
    role: 'Logic & Payment Developer',
    description: `Phát triển thanh tìm kiếm thông minh (SearchBar), hiển thị gợi ý món ăn theo thời gian thực.
Xây dựng và quản lý state giỏ hàng bằng cartStore (thêm/xóa món, tính tổng tiền).
Phát triển trang thanh toán (Checkout), xử lý nhập mã giảm giá (Voucher).
Xây dựng logic áp dụng mã giảm giá theo phần trăm (ví dụ: GIAM20).
Triển khai thuật toán chia tiền (Split Bill), tự động tính số tiền mỗi người phải trả.`,
    github: 'https://github.com/sunhope28',
    avatar: '/images/Members/Xuan%20Nhi.jpg',
  },
  {
    name: 'Trần Thị Bích Ngọc',
    mssv: '24126154',
    role: 'UI/UX & Performance Developer',
    description: `Xây dựng và tái sử dụng các component giao diện chung (Button, Card, Badge, Skeleton).
Thiết kế và triển khai giao diện Dark Mode bằng cách quản lý biến màu trong globals.css.
Phát triển hệ thống điều hướng (Breadcrumbs) giúp người dùng dễ dàng xác định vị trí trang.
Tối ưu hiệu năng tải trang với Skeleton Loading trong thời gian chờ dữ liệu.
Nâng cao trải nghiệm người dùng (UI/UX) với giao diện hiện đại, mượt mà và thân thiện.`,
    github: 'https://github.com/24126154-dot?tab=overview&from=2026-03-01&to=2026-03-31',
    avatar: '/images/Members/Ngoc.jpg',
  },
];

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  // Chỉ giữ lại mounted để tránh lỗi hydration của Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      
      <div className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-20 transition-opacity">
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <Breadcrumbs />
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-end mb-16">
          <div className="text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none"
            >
              Về Nhóm <span className="text-orange-500">05</span>
            </motion.h1>
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[9px] mt-3">
              Smart Office Meal Project — 2026
            </p>
          </div>
        </div>

        {/* --- INTRO CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 dark:bg-slate-800/50 rounded-[2.5rem] p-10 md:p-14 mb-24 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl" />
          <p className="text-base md:text-lg font-medium italic leading-relaxed text-slate-300 max-w-4xl relative z-10">
            "Chúng tôi là nhóm sinh viên đam mê công nghệ, xây dựng nền tảng đặt đồ ăn trực tuyến đem lại trải nghiệm <span className="text-orange-500 font-black uppercase tracking-tighter">Nhanh chóng – Tiện lợi – Hiện đại</span> cho dân văn phòng."
          </p>
        </motion.div>

        {/* --- GRID THÀNH VIÊN --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {members.map((member, idx) => (
            <motion.div
              key={member.mssv}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedMember(member)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-2xl hover:shadow-orange-200/50 dark:hover:shadow-orange-900/20 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-8 border border-slate-50 dark:border-slate-800 shadow-inner">
                <Image src={`${basePath}${member.avatar}`} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
              </div>
              <div className="space-y-3.5 text-left">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic leading-none group-hover:text-orange-500 transition-colors">
                  {member.name}
                </h3>
                <p className="text-orange-500 font-black uppercase tracking-widest text-xs">
                  {member.role}
                </p>
                <button className="w-full py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-black uppercase text-[10px] tracking-widest group-hover:bg-orange-500 transition-all active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none border-none">
                  XEM CHI TIẾT
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- MODAL CHI TIẾT --- */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[3.5rem] overflow-hidden shadow-3xl overflow-y-auto max-h-[90vh]"
            >
              <button onClick={() => setSelectedMember(null)} className="absolute top-8 right-8 z-10 text-slate-400 hover:text-orange-500 transition-colors">
                <X size={28} />
              </button>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative aspect-square md:aspect-auto min-h-[350px]">
                  <Image src={`${basePath}${selectedMember.avatar}`} alt={selectedMember.name} fill className="object-cover" unoptimized />
                </div>
                <div className="md:w-3/5 p-12 md:p-16 space-y-8 text-left">
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic leading-none">{selectedMember.name}</h2>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[11px] mt-4 leading-none">MSSV: {selectedMember.mssv}</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-500/5 p-6 rounded-2xl border border-orange-100 dark:border-orange-500/10">
                    <p className="text-orange-500 font-black uppercase text-xs tracking-widest mb-1.5 flex items-center gap-2">
                      <Zap size={14} fill="currentColor" /> VAI TRÒ
                    </p>
                    <p className="text-slate-900 dark:text-slate-100 font-bold italic text-base leading-snug">{selectedMember.role}</p>
                  </div>
                  <div className="space-y-3">
                     <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">MÔ TẢ CÔNG VIỆC CHI TIẾT</p>
                     <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic text-sm whitespace-pre-line">
                        {selectedMember.description}
                     </p>
                  </div>
                  <Link href={selectedMember.github} target="_blank" className="inline-flex items-center gap-3 bg-slate-900 dark:bg-slate-800 text-white px-7 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-orange-500 transition-all shadow-xl">
                    <GithubIcon size={16} /> GITHUB CÁ NHÂN
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-20 text-center border-t border-slate-50 dark:border-slate-900 relative z-10">
        <div className="inline-flex items-center gap-2.5 bg-slate-900 dark:bg-slate-800 text-white px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
          MADE WITH <Heart size={12} className="text-red-500 fill-red-500" /> BY NHOM 05
        </div>
      </footer>
    </div>
  );
}