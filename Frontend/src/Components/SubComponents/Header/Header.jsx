import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Check authentication status on component mount and when localStorage changes
  useEffect(() => {
    const updateUserStatus = () => {
      const token = localStorage.getItem("accessToken");
      const name = localStorage.getItem("userName");
      setIsLoggedIn(!!token);
      setUserName(name || "");
    };

    // Run on mount
    updateUserStatus();

    // Listen for login event
    window.addEventListener("userLoggedIn", updateUserStatus);

    // Optional: also listen for logout
    window.addEventListener("userLoggedOut", updateUserStatus);

    return () => {
      window.removeEventListener("userLoggedIn", updateUserStatus);
      window.removeEventListener("userLoggedOut", updateUserStatus);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = async () => {
    try {
      const email = localStorage.getItem("email");
      if (email) {
        await axios.post("http://localhost:8004/user/logout", { email });
      }

      // Clear all user-related data from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("fullName");
      localStorage.removeItem("userName");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("isVerified");
      localStorage.removeItem("profilePicture");
      localStorage.clear();
      window.dispatchEvent(new Event("userLoggedOut"));

      // Update state
      setIsLoggedIn(false);
      setUserName("");

      // Show success message
      toast.success("Logged out successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        className: "bg-gray-900 text-white",
      });

      // Redirect to home
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        className: "bg-gray-900 text-white",
      });
    }
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            Priyajit Debnath
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link
              to="/products"
              className="hover:text-gray-300 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="hover:text-gray-300 transition-colors"
            >
              Categories
            </Link>
            <Link to="/about" className="hover:text-gray-300 transition-colors">
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-gray-300 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="px-4 py-1 rounded-l-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-gray-700 px-3 rounded-r-md hover:bg-gray-600 transition-colors"
                >
                  <FaSearch />
                </button>
              </form>
            </div>

            <Link
              to="/cart"
              className="relative hover:text-gray-300 transition-colors"
            >
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            <div className="flex items-center space-x-2">
              {isLoggedIn ? (
                <>
                  <span className="hidden md:inline text-sm">
                    {userName ? `Hi, ${userName}` : "Hi, User"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="hover:text-gray-300 transition-colors"
                    title="Logout"
                  >
                    <FaSignOutAlt className="text-xl" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="hover:text-gray-300 transition-colors flex items-center"
                >
                  <span className="hidden md:inline mr-1">Login</span>
                  <FaUser className="text-xl" />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search - Visible only on mobile */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 rounded-l-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gray-700 px-4 rounded-r-md hover:bg-gray-600 transition-colors"
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <Link
              to="/"
              className="block py-2 hover:bg-gray-800 px-2 rounded transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block py-2 hover:bg-gray-800 px-2 rounded transition-colors"
              onClick={toggleMenu}
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="block py-2 hover:bg-gray-800 px-2 rounded transition-colors"
              onClick={toggleMenu}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="block py-2 hover:bg-gray-800 px-2 rounded transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 hover:bg-gray-800 px-2 rounded transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            {isLoggedIn ? (
              <>
                <div className="block py-2 px-2 text-gray-400">
                  {userName ? `Hi, ${userName}` : "Hi, User"}
                </div>
                <button
                  onClick={handleLogout}
                  className="block py-2 hover:bg-gray-800 px-2 rounded transition-colors text-left w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 hover:bg-gray-800 px-2 rounded transition-colors"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
