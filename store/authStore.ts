import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  name?: string;
  role?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoading: false,
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "foodie-auth-storage", // Key lưu trong Local Storage
    }
  )
);

export default useAuthStore;