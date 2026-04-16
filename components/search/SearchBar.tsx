"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";

// Lấy dữ liệu trực tiếp từ file JSON theo yêu cầu của Nhi
import productsData from "@/lib/data/products.json";
import { Product } from "@/types"; 

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const products = productsData.products as Product[];

  // Đóng dropdown khi click ra ngoài [cite: 16, 17, 18]
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Xử lý tìm kiếm logic cũ [cite: 26, 27, 30, 31]
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim().length > 0) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.category.some(cat => cat.toLowerCase().includes(value.toLowerCase()))
      );
      setResults(filtered.slice(0, 5)); // Hiển thị tối đa 5 kết quả [cite: 33]
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
      <div className="relative w-full max-w-md hidden md:block z-50" ref={searchRef}>
        <div className="relative group">
          <input
            type="text"
            placeholder="Bạn muốn ăn gì hôm nay?..."
            value={query}
            onChange={handleSearch}
            onFocus={() => query.trim().length > 0 && setIsOpen(true)}
            className="w-full bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl pl-10 pr-10 py-2 text-xs font-medium outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors w-4 h-4" />

          {query && (
            <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown Gợi Ý */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-slate-200/50 dark:shadow-black/50 transition-all">
            {results.length > 0 ? (
              <div className="flex flex-col">
                <div className="px-4 py-2 bg-slate-50/80 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Gợi ý cho bạn
                </div>
                {results.map((product) => (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 hover:bg-orange-50/50 dark:hover:bg-orange-500/10 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0 group"
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={product.images[0] || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-orange-600 dark:group-hover:text-orange-500">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black text-orange-500 bg-orange-100 dark:bg-orange-500/20 px-1.5 py-0.5 rounded uppercase">
                          {product.category[0]}
                        </span>
                        <span className="text-xs font-black text-slate-600 dark:text-slate-400">
                          {product.price.toLocaleString("vi-VN")}đ
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-slate-500 dark:text-slate-400 flex flex-col items-center">
                <Search className="w-6 h-6 text-slate-200 dark:text-slate-700 mb-2" />
                <p className="text-xs font-medium">Không tìm thấy món ăn nào!</p>
              </div>
            )}
          </div>
        )}
      </div>
  );
}