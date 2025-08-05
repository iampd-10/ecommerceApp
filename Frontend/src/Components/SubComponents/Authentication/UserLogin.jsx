import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaSpinner,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error(
        <div className="flex items-center">
          <FaTimes className="text-red-500 mr-2" />
          Email and password are required
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          className: "bg-gray-900 text-white",
        }
      );
      return;
    }

    setIsSubmitting(true);

try {
  const response = await axios.post(
    "http://localhost:8004/user/login",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  const userData = response.data;

  if (userData?.accessToken && userData?.refreshToken && userData?.user?.data) {
    const user = userData.user.data;

    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("refreshToken", userData.refreshToken);
    localStorage.setItem("fullName", user.fullName);
    localStorage.setItem("userName", user.userName);
    localStorage.setItem("email", user.email);
    localStorage.setItem("role", user.role);
    localStorage.setItem("isVerified", user.isVerified);
    localStorage.setItem("profilePicture", user.profilePicture || "");
    window.dispatchEvent(new Event("userLoggedIn"));

    // Toast & Redirect
    toast.success(
      <div className="flex items-center">
        <FaCheck className="text-green-500 mr-2" />
        {userData.message}
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        className: "bg-gray-900 text-white",
      }
    );

    setTimeout(() => {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }, 1500);
  } else {
    console.error("Missing token or user data in response:", userData);
  }
} catch (error) {
  let errorMessage = "Login failed. Please try again.";

  if (error.response) {
    switch (error.response.status) {
      case 400:
        errorMessage =
          error.response.data.message || "Email and password are required";
        break;
      case 401:
        errorMessage = error.response.data.message || "Invalid password";
        break;
      case 403:
        errorMessage =
          error.response.data.message ||
          "Please verify your email before logging in";
        break;
      case 404:
        errorMessage = error.response.data.message || "User not found";
        break;
      case 500:
        errorMessage = error.response.data.message || "Error logging in";
        break;
      default:
        errorMessage = error.response.data.message || "Login failed";
    }
  }

  toast.error(
    <div className="flex items-center">
      <FaTimes className="text-red-500 mr-2" />
      {errorMessage}
    </div>,
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      className: "bg-gray-900 text-white",
    }
  );
} finally {
  setIsSubmitting(false);
}
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <ToastContainer />

      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 flex items-center"
            >
              <FaEnvelope className="mr-2" /> Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="your@email.com"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 flex items-center"
            >
              <FaLock className="mr-2" /> Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-yellow-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium ${
              isSubmitting
                ? "bg-yellow-700"
                : "bg-yellow-500 hover:bg-yellow-600"
            } text-black transition-colors flex items-center justify-center`}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              <>
                <FaSignInAlt className="mr-2" />
                Login
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
