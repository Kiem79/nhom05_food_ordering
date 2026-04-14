'use client';

import { useState, useEffect } from 'react';
import { Mail, User, MessageSquare, Send, MapPin, Phone, Clock, Sun, Moon } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Trigger animation khi component mount
    setTimeout(() => setIsVisible(true), 100);
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
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* BACKGROUND XỊN XÒ - BLOB & PARTICLE */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob shapes */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Particle nhẹ */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-orange-500 rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 12 + 6}s`,
                animationDelay: `${Math.random() * 6}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Nút Dark Mode */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Chuyển đổi chế độ sáng tối"
          >
            {isDark ? <Sun size={24} className="text-yellow-500" /> : <Moon size={24} className="text-gray-700" />}
          </button>
        </div>

        {/* Header với hiệu ứng xuất hiện */}
        <div className={`text-center mb-12 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 inline-block drop-shadow-lg">
            Liên Hệ Với Chúng Tôi
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mt-4 rounded-full animate-pulse"></div>
          <p className="text-gray-700 dark:text-gray-200 mt-6 max-w-2xl mx-auto bg-white/30 dark:bg-black/20 backdrop-blur-sm p-4 rounded-2xl">
            Chúng tôi luôn sẵn sàng lắng nghe bạn. Hãy để lại lời nhắn, đội ngũ Foodie sẽ phản hồi trong vòng 24h.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* FORM LIÊN HỆ - nâng cấp */}
          <div className={`transform transition-all duration-700 delay-100 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] overflow-hidden border border-white/50 dark:border-gray-700/50">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Send size={20} className="group-hover:rotate-12 transition-transform" />
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
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
          </div>

          {/* BẢN ĐỒ & THÔNG TIN - nâng cấp */}
          <div className={`space-y-6 transform transition-all duration-700 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            {/* Card bản đồ */}
            <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] overflow-hidden border border-white/50 dark:border-gray-700/50">
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
                    className="rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  ></iframe>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm flex items-center gap-2">
                  <MapPin size={16} className="text-orange-500" />
                  📍 Khu vực Thành phố Thủ Đức, TP. Hồ Chí Minh
                </p>
              </div>
            </div>

            {/* Card thông tin khác */}
            <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] p-6 border border-white/50 dark:border-gray-700/50">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                <Phone size={18} className="text-orange-500 group-hover:rotate-12 transition-transform" />
                Thông tin khác
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:translate-x-1 transition-transform">
                  <Phone size={16} className="text-orange-500" /> 
                  <span>Hotline: <strong className="text-orange-600 dark:text-orange-400">1900 1234</strong></span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:translate-x-1 transition-transform">
                  <Mail size={16} className="text-orange-500" /> 
                  <span>Email: <strong className="text-orange-600 dark:text-orange-400">support@foodie.com</strong></span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:translate-x-1 transition-transform">
                  <Clock size={16} className="text-orange-500" /> 
                  <span>Thời gian làm việc: 8:00 - 21:00 (T2-CN)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS animations */}
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
          100% { transform: translateY(-120px) translateX(30px); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}
