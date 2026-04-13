"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Lock, Mail, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import useAuthStore from "@/store/authStore";

const registerSchema = z.object({
  name: z.string().min(2, "Tên quá ngắn bạn ơi"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp bạn ơi",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    
    // Giả lập tạo tài khoản (Lưu thẳng vào Zustand)
    setTimeout(() => {
      try {
        const newUser = { 
          email: data.email, 
          name: data.name,
          role: "MEMBER" 
        };
        
        login(newUser); // Đăng ký xong cho đăng nhập luôn
        toast.success("TẠO TÀI KHOẢN THÀNH CÔNG!", {
          description: "Chào mừng bạn gia nhập hội ăn ngon!",
        });
        
        router.push("/products");
      } catch (error) {
        toast.error("Lỗi đăng ký!");
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50/50 p-6 font-sans">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-orange-100 w-full max-w-md space-y-6 border border-white"
      >
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">
            🍔 Join <span className="text-orange-500">Foodie</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Create account for Group Order
          </p>
        </div>

        {/* Họ và Tên */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 ml-4 uppercase tracking-widest">Họ và Tên</label>
          <div className="relative">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input
              {...register("name")}
              placeholder="Mạnh Leader"
              className={`w-full h-16 pl-14 pr-6 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold ${errors.name ? "border-red-200" : "focus:border-orange-500 border-slate-50"}`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-[10px] font-bold ml-4 italic">{(errors.name as any).message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 ml-4 uppercase tracking-widest">Email</label>
          <div className="relative">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input
              {...register("email")}
              placeholder="manh@foodie.com"
              className={`w-full h-16 pl-14 pr-6 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold ${errors.email ? "border-red-200" : "focus:border-orange-500 border-slate-50"}`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-[10px] font-bold ml-4 italic">{(errors.email as any).message}</p>}
        </div>

        {/* Mật khẩu */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 ml-4 uppercase tracking-widest">Mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full h-16 pl-14 pr-16 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold ${errors.password ? "border-red-200" : "focus:border-orange-500 border-slate-50"}`}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-[10px] font-bold ml-4 italic">{(errors.password as any).message}</p>}
        </div>

        {/* Xác nhận Mật khẩu */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 ml-4 uppercase tracking-widest">Xác nhận mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className={`w-full h-16 pl-14 pr-6 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold ${errors.confirmPassword ? "border-red-200" : "focus:border-orange-500 border-slate-50"}`}
            />
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-[10px] font-bold ml-4 italic">{(errors.confirmPassword as any).message}</p>}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full h-18 bg-slate-900 text-white rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-orange-500 active:scale-95 transition-all flex items-center justify-center gap-2 group"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : (
            <>TẠO TÀI KHOẢN <ArrowRight className="group-hover:translate-x-2 transition-transform" /></>
          )}
        </button>

        <div className="text-center pt-4">
          <Link href="/auth/login" className="text-xs font-bold text-slate-400 hover:text-slate-600">
            Đã có tài khoản? <span className="text-orange-500 underline underline-offset-4 decoration-2 font-black uppercase">Đăng nhập ngay</span>
          </Link>
        </div>
      </form>
    </div>
  );
}