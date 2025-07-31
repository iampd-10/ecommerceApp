import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', searchQuery);
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
            <Link to="/products" className="hover:text-gray-300 transition-colors">
              Products
            </Link>
            <Link to="/categories" className="hover:text-gray-300 transition-colors">
              Categories
            </Link>
            <Link to="/about" className="hover:text-gray-300 transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-gray-300 transition-colors">
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

            <Link to="/cart" className="relative hover:text-gray-300 transition-colors">
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            <Link to="/account" className="hover:text-gray-300 transition-colors">
              <FaUser className="text-xl" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
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
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;