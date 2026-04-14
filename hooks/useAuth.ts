import useAuthStore from "@/store/authStore"; 

export const useAuth = () => {
  // Lấy các giá trị thực sự có trong store
  const { user, login, logout, isLoading: loading } = useAuthStore();

  // Tự tạo biến kiểm tra đăng nhập: nếu user tồn tại là true, ngược lại false
  const isLoggedIn = !!user; 

  return {
    user,
    loading,
    isLoggedIn,
    login,
    logout,
  };
};