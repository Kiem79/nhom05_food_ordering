"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 
import productsData from "@/lib/data/products.json";
import { Product } from "@/types";

const BASE_PATH = "/nhom05_food_ordering";

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false); 
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const products = productsData.products as Product[];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim().length > 0) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.category.some(cat => cat.toLowerCase().includes(value.toLowerCase()))
      );
      setResults(filtered.slice(0, 5));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative flex items-center z-50" ref={searchRef}>
      <div className="relative flex items-center justify-end">
        <motion.div
          initial={false}
          animate={{ width: isExpanded ? "280px" : "40px" }}
          className="flex items-center h-10 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all"
        >
          {/* Nút kính lúp để kích hoạt */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-10 h-10 flex items-center justify-center shrink-0 text-slate-500 hover:text-orange-500 transition-colors"
          >
            <Search size={18} />
          </button>

          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm món ăn..."
            value={query}
            onChange={handleSearch}
            className={`bg-transparent border-none text-xs font-medium outline-none text-slate-900 dark:text-white w-full pr-4 ${
              isExpanded ? "opacity-100" : "opacity-0 invisible"
            } transition-opacity duration-300`}
          />
          {query && isExpanded && (
            <button
              onClick={() => setQuery("")}
              className="px-3 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 w-[320px] mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            {results.length > 0 ? (
              <div className="flex flex-col">
                <div className="px-4 py-2 bg-slate-50/80 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Gợi ý món ngon
                </div>
                {results.map((product) => (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    onClick={() => {
                      setIsOpen(false);
                      setIsExpanded(false);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-orange-50/50 dark:hover:bg-orange-500/10 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0 group"
                  >
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={product.images[0] ? `${BASE_PATH}${product.images[0]}` : `${BASE_PATH}/placeholder.png`}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[13px] text-slate-900 dark:text-white truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] font-black text-orange-500">
                        {product.price.toLocaleString()}đ
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-slate-500 text-xs italic">
                Không tìm thấy món &quot;{query}&quot;
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}