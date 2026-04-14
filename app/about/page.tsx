'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Dữ liệu thành viên (đầy đủ thông tin chi tiết)
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
    avatar: '/images/Members/Bich Nhi.jpg',
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
    avatar: '/images/Members/Xuan Nhi.jpg',
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

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // chặn cuộn nền
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-primary text-4xl md:text-5xl font-bold mb-4">
          Về Nhóm 05 - Food Ordering
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto rounded-foodie mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
        🍔✨ Chúng tôi là một nhóm sinh viên đam mê công nghệ và sáng tạo, cùng nhau xây dựng dự án đặt đồ ăn trực tuyến với khát vọng mang đến một trải nghiệm nhanh chóng – tiện lợi – hiện đại cho người dùng. 
        🚀💡 Không chỉ đơn thuần là một ứng dụng đặt món, chúng tôi hướng đến việc tạo ra một nền tảng giúp bạn khám phá món ăn yêu thích, đặt hàng dễ dàng và tận hưởng trọn vẹn từng bữa ăn. 🍜💖
        🔥 Với tinh thần học hỏi, đổi mới và không ngừng cải tiến, nhóm cam kết mang đến một sản phẩm thân thiện – mượt mà – đáng tin cậy.
        👉 Chỉ vài cú click – món ngon đến ngay! 😋📱 
        </p>
      </div>

      {/* Grid members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member, idx) => (
          <div
            key={idx}
            onClick={() => openModal(member)}
            className="bg-white rounded-foodie border-2 border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-primary hover:z-10 overflow-hidden group cursor-pointer"
          >
            {/* Ảnh */}
            <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            {/* Nội dung */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-primary">{member.name}</h2>
              <p className="text-gray-500 text-sm mt-1">MSSV: {member.mssv}</p>
              <p className="text-gray-700 text-sm font-semibold mt-2">📌 {member.role}</p>
              <p className="text-gray-600 text-sm mt-3 line-clamp-3">{member.description}</p>
              <div className="mt-4">
                <span className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-foodie text-sm font-semibold hover:bg-opacity-90 transition-colors">
                  🔍 Xem chi tiết
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal chi tiết */}
      {isModalOpen && selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nút đóng */}
            <div className="sticky top-0 bg-white z-10 flex justify-end p-3 border-b">
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-500 transition-colors text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Nội dung modal: 2 cột */}
            <div className="flex flex-col md:flex-row gap-6 p-6">
              {/* Cột trái: ảnh */}
              <div className="md:w-2/5 flex justify-center">
                <div className="relative w-64 h-64 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>
              {/* Cột phải: thông tin chi tiết */}
              <div className="md:w-3/5 space-y-4">
                <h2 className="text-2xl font-bold text-primary">{selectedMember.name}</h2>
                <p className="text-gray-500">MSSV: {selectedMember.mssv}</p>
                <div className="bg-orange-50 p-3 rounded-foodie">
                  <p className="text-primary font-semibold">🎯 Vai trò:</p>
                  <p className="text-gray-700">{selectedMember.role}</p>
                </div>
                <div>
                  <p className="text-primary font-semibold">📝 Mô tả công việc:</p>
                  <p className="text-gray-700 whitespace-pre-line mt-1 text-sm leading-relaxed">
                    {selectedMember.description}
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href={selectedMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-foodie text-sm font-semibold hover:bg-opacity-90 transition"
                  >
                    🔗 GitHub cá nhân
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
