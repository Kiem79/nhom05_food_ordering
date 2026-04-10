import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

export const Button = ({ children, isLoading, variant = "primary", className, ...props }: ButtonProps) => {
  const variants = {
    primary: "bg-orange-500 text-white shadow-orange-200 hover:bg-orange-600",
    secondary: "bg-slate-100 text-slate-500 hover:bg-slate-200",
    danger: "bg-red-100 text-red-600 hover:bg-red-200",
  };

  return (
    <button
      disabled={isLoading || props.disabled}
      className={`relative py-4 px-6 rounded-2xl font-black uppercase transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 shadow-xl ${variants[variant]} ${className}`}
      {...props}
    >
      <span className={isLoading ? "opacity-0" : "opacity-100"}>{children}</span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
};