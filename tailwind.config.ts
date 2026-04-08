import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Màu cam chủ đạo Mạnh chốt
        primary: "#F97316",    
        // Màu đen tối cho text/nền
        secondary: "#18181B",  
        // Màu xanh cho nút xác nhận
        accent: "#22C55E",     
      },
      borderRadius: {
        // Bo góc đặc trưng cho app đồ ăn
        'foodie': '1.5rem',    
      }
    },
  },
  plugins: [],
};
export default config;