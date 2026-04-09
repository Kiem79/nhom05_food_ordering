"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const registerSchema = z.object({
  name: z.string().min(2, "Tên quá ngắn"),
  email: z.string().email("Email sai định dạng"),
  password: z.string().min(6, "Tối thiểu 6 ký tự"),
});

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onRegister = (data: any) => {
    login({ name: data.name, email: data.email });
    // POPUP HIỆN RA THEO Ý MẠNH
    alert(`🎉 CHÚC MỪNG ${data.name.toUpperCase()}!\nĐăng ký thành công. Chào mừng bạn đến với Foodie!`);
    // MOVE VỀ TRANG ĐẶT MÓN ĂN
    router.push("/products");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-4">
      <form onSubmit={handleSubmit(onRegister)} className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md space-y-6 border border-white">
        <h1 className="text-3xl font-black text-center text-slate-800 uppercase tracking-tighter italic">📝 Tạo tài khoản</h1>
        
        <div className="space-y-1">
          <label className="text-sm font-black text-slate-700 ml-1 uppercase">Họ và tên</label>
          <input {...register("name")} placeholder="Tên của bạn..." className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#F97316] font-bold text-slate-900" />
          {errors.name && <p className="text-red-500 text-xs font-bold ml-2 italic">{(errors.name as any).message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-black text-slate-700 ml-1 uppercase">Email</label>
          <input {...register("email")} placeholder="email@gmail.com" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#F97316] font-bold text-slate-900" />
          {errors.email && <p className="text-red-500 text-xs font-bold ml-2 italic">{(errors.email as any).message}</p>}
        </div>

        <div className="space-y-1 relative">
          <label className="text-sm font-black text-slate-700 ml-1 uppercase">Mật khẩu</label>
          <div className="relative">
            <input 
              {...register("password")} 
              type={showPass ? "text" : "password"} 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#F97316] font-bold pr-16 text-slate-900" 
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 p-2 uppercase">
              {showPass ? "ẨN" : "HIỆN"}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs font-bold ml-2 italic">{(errors.password as any).message}</p>}
        </div>

        <button type="submit" className="w-full bg-[#F97316] text-white py-4 rounded-2xl font-black text-xl shadow-xl shadow-orange-200 hover:bg-orange-600 active:scale-95 transition-all">
          ĐĂNG KÝ NGAY
        </button>
      </form>
    </div>
  );
}