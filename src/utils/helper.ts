import { toast } from "react-toastify";

export const getToken = () => localStorage.getItem("token");
export const setToken = (token: string) => localStorage.setItem("token", token);
export const removeToken = () => localStorage.removeItem("token");

export const handleError = (error: any) => {
  const msg =
    error?.data?.message ||
    error?.error ||
    error?.message ||
    "Something went wrong.";
  toast.error(msg);
};

