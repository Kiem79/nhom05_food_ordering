'use client';

import { useState, useEffect } from 'react';
import { Mail, User, MessageSquare, Send, MapPin, Phone, Clock, Sun, Moon } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Kiểm tra theme đã lưu hoặc theo hệ thống
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
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

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };
    if (!formData.name.trim()) {
      newErrors.name = 'Họ tên không được để trống';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ (ví dụ: ten@example.com)';
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Nội dung không được để trống';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Gửi liên hệ:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Nút toggle Dark Mode */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none"
            aria-label="Chuyển đổi chế độ sáng tối"
          >
            {isDark ? (
              <Sun size={24} className="text-yellow-500" />
            ) : (
              <Moon size={24} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Tiêu đề */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 inline-block">
            Liên Hệ Với Chúng Tôi
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mt-4 rounded-full animate-pulse"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe bạn. Hãy để lại lời nhắn, đội ngũ Foodie sẽ phản hồi trong vòng 24h.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FORM LIÊN HỆ */}
          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-white/50 dark:border-gray-700/50">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Send size={20} />
                Gửi tin nhắn
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <div className="transform transition-all duration-300 focus-within:scale-105">
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2 flex items-center gap-2">
                  <User size={18} className="text-orange-500" />
                  Họ tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl px-5 py-3 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-300 shadow-sm"
                  placeholder="Nguyễn Văn A"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1 animate-shake">{errors.name}</p>}
              </div>

              <div className="transform transition-all duration-300 focus-within:scale-105">
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2 flex items-center gap-2">
                  <Mail size={18} className="text-orange-500" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl px-5 py-3 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-300 shadow-sm"
                  placeholder="example@domain.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 animate-shake">{errors.email}</p>}
              </div>

              <div className="transform transition-all duration-300 focus-within:scale-105">
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2 flex items-center gap-2">
                  <MessageSquare size={18} className="text-orange-500" />
                  Nội dung
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl px-5 py-3 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-300 shadow-sm resize-none"
                  placeholder="Nhập câu hỏi hoặc góp ý của bạn..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1 animate-shake">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send size={18} />
                    Gửi liên hệ
                  </>
                )}
              </button>

              {submitted && (
                <div className="mt-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 p-4 rounded-2xl text-center animate-fadeInUp">
                  ✓ Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất.
                </div>
              )}
            </form>
          </div>

          {/* BẢN ĐỒ & THÔNG TIN */}
          <div className="space-y-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-white/50 dark:border-gray-700/50">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin size={20} />
                  Vị trí của chúng tôi
                </h2>
              </div>
              <div className="p-6">
                <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-inner">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2984.78379972327!2d106.76933817355302!3d10.85063765782353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1svi!2s!4v1776072370662!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bản đồ Thành phố Thủ Đức"
                    className="rounded-2xl transition-transform duration-500 hover:scale-105"
                  ></iframe>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm flex items-center gap-2">
                  <MapPin size={16} className="text-orange-500" />
                  📍 Khu vực Thành phố Thủ Đức, TP. Hồ Chí Minh
                </p>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-500 border border-white/50 dark:border-gray-700/50">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                <Phone size={18} className="text-orange-500" />
                Thông tin khác
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Phone size={16} /> <span>Hotline: <strong className="text-orange-600 dark:text-orange-400">1900 1234</strong></span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Mail size={16} /> <span>Email: <strong className="text-orange-600 dark:text-orange-400">support@foodie.com</strong></span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Clock size={16} /> <span>Thời gian làm việc: 8:00 - 21:00 (T2-CN)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
