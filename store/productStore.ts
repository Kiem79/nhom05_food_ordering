import { create } from "zustand";
import productsData from "@/lib/data/products.json";
import type { Product } from "@/types";

interface ProductState {
  products: Product[];
}

const useProductStore = create<ProductState>(() => ({
  products: productsData.products as Product[],
}));

export default useProductStore;