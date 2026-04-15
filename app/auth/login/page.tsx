"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// Đã bổ sung import motion ở đây
import { motion } from "framer-motion"; 
import { Loader2, Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import useAuthStore from "@/store/authStore";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ bạn ơi"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Logic giả lập đăng nhập
      if (data.email === "ldmanh79@gmail.com" && data.password === "123456") {
        const mockUser = { 
          email: data.email, 
          name: "Mạnh", 
          role: "ADMIN" 
        };
        login(mockUser);
        toast.success("ĐĂNG NHẬP THÀNH CÔNG!", {
          description: "Chào mừng bạn quay trở lại với Foodie.",
        });
        router.push("/restaurants");
      } else {
        toast.error("Sai tài khoản hoặc mật khẩu rồi!");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-orange-50/30 dark:bg-slate-950 p-6 font-sans transition-colors duration-500">
    {/* Thêm Background Decor mờ phía sau cho đồng bộ với các trang khác */}
    <div className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-20 transition-opacity">
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-[100px]" />
    </div>

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[3.5rem] shadow-2xl shadow-orange-100/50 dark:shadow-none w-full max-w-md space-y-8 border border-white dark:border-slate-800 relative z-10"
    >
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic flex items-center justify-center gap-2">
          <span className="grayscale-[0.5] dark:grayscale-0">🍔</span> Foodie <span className="text-orange-500">Login</span>
        </h1>
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
          Welcome back!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* EMAIL INPUT */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 ml-4 uppercase tracking-widest">Email</label>
          <div className="relative">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={20} />
            <input
              {...register("email")}
              placeholder="email@vidu.com"
              className={`w-full h-16 pl-14 pr-6 bg-slate-50 dark:bg-slate-800/50 border-2 rounded-2xl outline-none transition-all font-bold dark:text-white ${
                errors.email 
                ? "border-red-200 dark:border-red-900/50" 
                : "focus:border-orange-500 border-slate-50 dark:border-slate-800"
              }`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-[10px] font-bold ml-4 italic">{(errors.email as any).message}</p>}
        </div>

        {/* PASSWORD INPUT */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 ml-4 uppercase tracking-widest">Mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={20} />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full h-16 pl-14 pr-16 bg-slate-50 dark:bg-slate-800/50 border-2 rounded-2xl outline-none transition-all font-bold dark:text-white ${
                errors.password 
                ? "border-red-200 dark:border-red-900/50" 
                : "focus:border-orange-500 border-slate-50 dark:border-slate-800"
              }`}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-[10px] font-bold ml-4 italic">{(errors.password as any).message}</p>}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          disabled={isLoading}
          type="submit"
          className="w-full h-20 bg-orange-500 text-white rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 active:scale-95 transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : (
            <>VÀO ĐẶT MÓN NGAY <ArrowRight className="group-hover:translate-x-2 transition-transform" /></>
          )}
        </button>
      </form>

      <div className="text-center pt-4">
        <Link href="/auth/register" className="text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          Chưa có tài khoản? <span className="text-orange-500 underline underline-offset-4 decoration-2 font-black uppercase ml-1">Đăng ký ngay</span>
        </Link>
      </div>
    </motion.div>
  </div>
  );
}