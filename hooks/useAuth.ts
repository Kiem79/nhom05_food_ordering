import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const { user, isLoggedIn, login, logout } = useAuthStore();

  return {
    user,
    isLoggedIn,
    login,
    logout,
  };
};