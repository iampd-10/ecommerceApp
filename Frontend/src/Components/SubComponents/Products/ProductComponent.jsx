import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaEye, FaStar } from "react-icons/fa";

const ProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const getProductsUrl =
        import.meta.env.VITE_API_URL_GET_PRODUCTS ||
        "http://localhost:8004/product/all";
      console.log(`Fetching products from: ${getProductsUrl}`);
      try {
        const response = await axios.get(getProductsUrl);
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId) => {
  
    console.log(`Added product ${productId} to cart`);
  
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No products available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-110 hover:shadow-xl"
          >
           
            <div className="bg-gray-200 h-48 flex items-center justify-center">
              {product.images ? (
                <img
                  src={product.images}
                  alt={product.pname}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image Available</span>
              )}
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.pname}
                </h3>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                  {product.category}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.ratings)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-gray-500 text-sm ml-1">
                  ({product.ratings})
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                <span
                  className={`text-sm ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleAddToCart(product._id)}
                  disabled={product.stock <= 0}
                  className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md ${
                    product.stock > 0
                      ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                      : "bg-gray-300 cursor-not-allowed text-gray-500"
                  } transition-colors`}
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <Link
                  to={`/product/${product._id}`}
                  className="flex-1 flex items-center justify-center py-2 px-3 rounded-md bg-black hover:bg-gray-800 text-white transition-colors"
                >
                  <FaEye className="mr-2" />
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComponent;
