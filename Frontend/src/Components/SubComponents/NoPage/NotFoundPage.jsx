import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaShoppingBag } from 'react-icons/fa';
import { RiEmotionSadLine } from 'react-icons/ri';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
      {/* Illustration & Message */}
      <div className="max-w-md mx-auto">
        <div className="relative mb-8">
          {/* Sad face icon with animation */}
          <RiEmotionSadLine className="text-6xl text-yellow-500 mx-auto animate-bounce" />
          
          {/* Broken link illustration */}
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">🔗</span>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
          <br />
          Let's get you back on track!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Link
          to="/"
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <FaHome /> Go to Home
        </Link>
        
        <Link
          to="/products"
          className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <FaShoppingBag /> Browse Products
        </Link>
        
        <Link
          to="/search"
          className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200"
        >
          <FaSearch /> Search Store
        </Link>
      </div>

      {/* Additional Help */}
      <div className="bg-white p-6 rounded-xl shadow-sm max-w-md w-full border border-gray-100">
        <h3 className="font-medium text-gray-800 mb-3">Need Help?</h3>
        <p className="text-gray-600 mb-4">
          Contact our support team or visit our <Link to="/faq" className="text-yellow-500 hover:underline">FAQ page</Link>.
        </p>
        <Link
          to="/contact"
          className="inline-block text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
        >
          Contact Support →
        </Link>
      </div>

      {/* Funny 404 Message */}
      <p className="mt-8 text-sm text-gray-500">
        Even the best shoppers get lost sometimes. 🛒
      </p>
    </div>
  );
}

export default NotFoundPage;