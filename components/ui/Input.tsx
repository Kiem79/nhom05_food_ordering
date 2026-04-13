import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => (
    <div className="space-y-1.5 w-full">
      <label className="text-sm font-black text-slate-700 ml-1 uppercase tracking-tighter">
        {label}
      </label>
      <input
        ref={ref}
        {...props}
        className={`w-full p-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold text-slate-900 
          ${error ? "border-red-400 focus:border-red-500" : "border-slate-100 focus:border-orange-500"}`}
      />
      {error && <p className="text-red-500 text-xs font-bold ml-2 italic">{error}</p>}
    </div>
  )
);

Input.displayName = "Input";