import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const members = [
    {
      name: 'Lê Đức Mạnh',
      mssv: '24126129',
      role: 'Leader - System Architect & Group Logic',
      description: 'Thiết kế Zustand Store, xác thực người dùng, module đặt món nhóm, validation form, lưu phiên LocalStorage.',
      github: 'https://github.com/Kiem79',
      avatar: '/images/Members/Manh.jpg',
    },
    {
      name: 'Võ Tấn Tài',
      mssv: '24126197',
      role: 'Frontend Developer (UI/UX & Static Pages)',
      description: 'Trang Giới thiệu, Liên hệ, form validation, tích hợp Google Maps, tối ưu hình ảnh, responsive.',
      github: 'https://github.com/taivo08012006-hub/project-cu-i-k-.git',
      avatar: '/images/Members/Tai.jpg',
    },
    {
      name: 'Trần Nguyễn Thảo Nguyên',
      mssv: '24126157',
      role: 'Content & Data Manager (Frontend Support)',
      description: 'Quản lý data.json, trang chi tiết sản phẩm dynamic, Dashboard lịch sử đơn hàng, gallery ảnh.',
      github: 'https://github.com/24126157-ux',
      avatar: '/images/Members/Nguyen.jpg',
    },
    {
      name: 'Nguyễn Thị Bích Nhi',
      mssv: '24126166',
      role: 'User & Order Management Developer',
      description: 'Dashboard người dùng, lịch sử đơn hàng, orderStore (Zustand), modal chi tiết, persistence.',
      github: 'https://github.com/24126166-tech',
      avatar: '/images/Members/Bich Nhi.jpg',
    },
    {
      name: 'Lê Thị Xuân Nhi',
      mssv: '24126165',
      role: 'Logic & Payment Developer',
      description: 'SearchBar gợi ý thời gian thực, cartStore, trang thanh toán, voucher GIAM20, chia tiền split bill.',
      github: 'https://github.com/sunhope28',
      avatar: '/images/Members/Xuan Nhi.jpg',
    },
    {
      name: 'Trần Thị Bích Ngọc',
      mssv: '24126154',
      role: 'UI/UX & Performance Developer',
      description: 'Component tái sử dụng (Button, Card, Skeleton), Dark Mode, Breadcrumbs, skeleton loading.',
      github: 'https://github.com/24126154-dot?tab=overview&from=2026-03-01&to=2026-03-31',
      avatar: '/images/Members/Ngoc.jpg',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-primary text-4xl md:text-5xl font-bold mb-4">
          Về Nhóm 05 - Food Ordering
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto rounded-foodie mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
         🍔✨ Chúng tôi là một nhóm sinh viên đam mê công nghệ và sáng tạo, cùng nhau xây dựng dự án đặt đồ ăn trực tuyến với khát vọng mang đến một trải nghiệm nhanh chóng – tiện lợi – hiện đại cho người dùng. 🚀

💡 Không chỉ đơn thuần là một ứng dụng đặt món, chúng tôi hướng đến việc tạo ra một nền tảng giúp bạn khám phá món ăn yêu thích, đặt hàng dễ dàng và tận hưởng trọn vẹn từng bữa ăn. 🍜💖

🔥 Với tinh thần học hỏi, đổi mới và không ngừng cải tiến, nhóm cam kết mang đến một sản phẩm thân thiện – mượt mà – đáng tin cậy.

👉 Chỉ vài cú click – món ngon đến ngay! 😋📱
        </p>
      </div>

      {/* Grid members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member, idx) => (
          <div
            key={idx}
            className="bg-white rounded-foodie border-2 border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-primary hover:z-10 overflow-hidden group"
          >
            {/* Ảnh - với overlay tối nhẹ khi hover */}
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

            {/* Nội dung - chữ rõ, không mờ */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-primary">{member.name}</h2>
              <p className="text-gray-500 text-sm mt-1">MSSV: {member.mssv}</p>
              <p className="text-gray-700 text-sm font-semibold mt-2">
                📌 {member.role}
              </p>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {member.description}
              </p>
              <div className="mt-4">
                <Link
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-foodie text-sm font-semibold hover:bg-opacity-90 transition-colors"
                >
                  🔗 GitHub
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
