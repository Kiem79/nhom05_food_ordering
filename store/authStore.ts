import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  name?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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