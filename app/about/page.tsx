'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';

// Dữ liệu thành viên đầy đủ (6 người)
const members = [
  {
    name: 'Lê Đức Mạnh',
    mssv: '24126129',
    role: 'Leader - System Architect & Group Logic',
    description: `Thiết kế và xây dựng hệ thống quản lý trạng thái (Zustand Store), đóng vai trò “bộ não” cho giỏ hàng.
Phát triển cấu trúc dữ liệu cho giỏ hàng, bổ sung trường addedBy để xác định người thêm món, phục vụ chức năng đặt món nhóm.
Xây dựng module xác thực người dùng (Authentication) với form Đăng nhập/Đăng ký sử dụng react-hook-form kết hợp zod để kiểm tra dữ liệu.
Triển khai validation cho form (định dạng email, độ dài mật khẩu) và tính năng hiển thị/ẩn mật khẩu.
Lưu trữ trạng thái đăng nhập bằng LocalStorage, đảm bảo duy trì phiên người dùng.
Phát triển tính năng nâng cao “Đặt món nhóm” (Group Order), hiển thị danh sách người dùng và tự động tính toán tổng tiền chia theo từng người.`,
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
    role: 'User & Order Management Developer (Frontend + State Management)',
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
    role: 'Logic & Payment Developer (Frontend + State Management)',
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
    role: 'UI/UX & Performance Developer (Frontend UI Specialist)',
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
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  // Dark mode initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // Animation hiện dần các card
  useEffect(() => {
    const timeouts = members.map((_, index) => {
      return setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 150);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* BACKGROUND XỊN XÒ - BLOB & PARTICLE */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob shapes */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Particle nhẹ */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-500 rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Nút Dark Mode */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300"
            aria-label="Chuyển đổi sáng/tối"
          >
            {isDark ? <Sun size={24} className="text-yellow-500" /> : <Moon size={24} className="text-gray-700" />}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-primary text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Về Nhóm 05 - Food Ordering
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
          <div className="bg-white/30 dark:bg-black/20 backdrop-blur-sm p-4 rounded-2xl max-w-3xl mx-auto">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              🍔✨ Chúng tôi là một nhóm sinh viên đam mê công nghệ và sáng tạo, cùng nhau xây dựng dự án đặt đồ ăn trực tuyến với khát vọng mang đến một trải nghiệm nhanh chóng – tiện lợi – hiện đại cho người dùng. 
              🚀💡 Không chỉ đơn thuần là một ứng dụng đặt món, chúng tôi hướng đến việc tạo ra một nền tảng giúp bạn khám phá món ăn yêu thích, đặt hàng dễ dàng và tận hưởng trọn vẹn từng bữa ăn. 🍜💖
              🔥 Với tinh thần học hỏi, đổi mới và không ngừng cải tiến, nhóm cam kết mang đến một sản phẩm thân thiện – mượt mà – đáng tin cậy.
              👉 Chỉ vài cú click – món ngon đến ngay! 😋📱
            </p>
          </div>
        </div>

        {/* Grid thành viên */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, idx) => (
            <div
              key={idx}
              onClick={() => openModal(member)}
              className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-[2rem] border-2 border-orange-400/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-orange-500 hover:z-20 overflow-hidden group cursor-pointer
                ${visibleCards.includes(idx) ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: `${idx * 0.15}s`, animationFillMode: 'forwards' }}
            >
              <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-primary">{member.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">MSSV: {member.mssv}</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold mt-2">📌 {member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 line-clamp-3">{member.description}</p>
                <div className="mt-4">
                  <span className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 hover:scale-105">
                    🔍 Xem chi tiết
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal chi tiết */}
      {isModalOpen && selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 flex justify-end p-3 border-b dark:border-gray-700">
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-500 transition-colors text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-6 p-6">
              <div className="md:w-2/5 flex justify-center">
                <div className="relative w-64 h-64 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-3/5 space-y-4">
                <h2 className="text-2xl font-bold text-primary">{selectedMember.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">MSSV: {selectedMember.mssv}</p>
                <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-xl">
                  <p className="text-primary font-semibold">🎯 Vai trò:</p>
                  <p className="text-gray-700 dark:text-gray-300">{selectedMember.role}</p>
                </div>
                <div>
                  <p className="text-primary font-semibold">📝 Mô tả công việc:</p>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line mt-1 text-sm leading-relaxed">
                    {selectedMember.description}
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href={selectedMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 hover:scale-105"
                  >
                    🔗 GitHub cá nhân
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fadeUp 0.5s ease-out forwards;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}
