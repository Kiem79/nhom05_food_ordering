"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    login({ name: data.email.split("@")[0], email: data.email });
    alert("✅ Đăng nhập thành công! Đang vào thực đơn...");
    router.push("/products");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md space-y-6 border border-white">
        <div className="text-center">
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">🍔 Foodie Login</h1>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-black text-slate-700 ml-1 uppercase">Email</label>
          <input {...register("email")} placeholder="example@gmail.com" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#F97316] font-bold text-slate-900" />
          {errors.email && <p className="text-red-500 text-xs font-bold ml-2 italic">{(errors.email as any).message}</p>}
        </div>

        <div className="space-y-1.5 relative">
          <label className="text-sm font-black text-slate-700 ml-1 uppercase">Mật khẩu</label>
          <div className="relative">
            <input 
              {...register("password")} 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#F97316] font-bold pr-16 text-slate-900" 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 hover:text-[#F97316] p-2"
            >
              {showPassword ? "ẨN" : "HIỆN"}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs font-bold ml-2 italic">{(errors.password as any).message}</p>}
        </div>

        <button type="submit" className="w-full bg-[#F97316] text-white py-4 rounded-2xl font-black text-xl shadow-xl shadow-orange-200 hover:bg-orange-600 active:scale-95 transition-all">
          VÀO ĐẶT MÓN
        </button>

        <div className="text-center pt-2">
          <Link href="/auth/register" className="text-sm font-bold text-slate-400">
            Chưa có tài khoản? <span className="text-[#F97316] underline underline-offset-4 decoration-2 font-black">ĐĂNG KÝ NGAY</span>
          </Link>
        </div>
      </form>
    </div>
  );
}