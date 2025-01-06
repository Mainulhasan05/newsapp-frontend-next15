"use client";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { fetchProfile } from "@/store/features/auth/authSlice";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.dismiss(); // Dismiss any existing toasts

    try {
      const response = await axiosInstance.post("/api/auth/login", formData);
      const accessToken = response.data?.data?.accessToken;
      Cookies.set("access_token", accessToken, {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });

      toast.success("Login successful! Redirecting...");
      await dispatch(fetchProfile());
      router.push("/dashboard/profile");
    } catch (err) {
      toast.error("Invalid email or password");
      console.error("Login failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-2"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg p-2"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-red-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
