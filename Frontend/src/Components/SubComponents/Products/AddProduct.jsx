import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaPlusCircle,
  FaSpinner,
  FaTimes,
  FaCheck,
  FaImage,
  FaTrash,
} from "react-icons/fa";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pname: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    ratings: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.pname.trim()) newErrors.pname = "Product name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    else if (isNaN(formData.price)) newErrors.price = "Price must be a number";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (formData.stock && isNaN(formData.stock))
      newErrors.stock = "Stock must be a number";
    if (
      formData.ratings &&
      (isNaN(formData.ratings) || formData.ratings < 0 || formData.ratings > 5)
    ) {
      newErrors.ratings = "Ratings must be between 0 and 5";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG images are allowed");
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error("Image size should be less than 1MB");
      return;
    }

    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (role !== "seller") {
    toast.error("Only sellers can add products");
    return;
  }

  setIsSubmitting(true);

 
  const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  try {
    const form = new FormData();
    form.append("pname", formData.pname);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("category", capitalize(formData.category)); 
    form.append("stock", formData.stock || 0);
    form.append("ratings", formData.ratings || 0);
    form.append("image", image); 

    const response = await axios.post(
      "http://localhost:8004/product/add",
      form,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success(response.data.message);
    navigate("/products");
  } catch (error) {
    console.error(error);
    toast.error("Product creation failed");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-900 rounded-xl shadow-md overflow-hidden p-8 border border-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <p className="text-gray-400">
            Fill in the details below to list a new product
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
    
          <div>
            <label htmlFor="pname" className="block text-sm font-medium mb-1">
              Product Name *
            </label>
            <input
              type="text"
              id="pname"
              name="pname"
              value={formData.pname}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                errors.pname ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              placeholder="Enter product name"
            />
            {errors.pname && (
              <p className="text-red-500 text-xs mt-1">{errors.pname}</p>
            )}
          </div>

   
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                errors.description ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              placeholder="Enter product description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

 
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              Price (₹) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                errors.price ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
          </div>

  
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1"
            >
              Category *
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                errors.category ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              placeholder="Enter category"
            />
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>

   
          <div>
            <label htmlFor="stock" className="block text-sm font-medium mb-1">
              Stock (optional)
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                errors.stock ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              placeholder="Enter stock quantity"
            />
            {errors.stock && (
              <p className="text-red-500 text-xs mt-1">{errors.stock}</p>
            )}
          </div>

  
          <div>
            <label htmlFor="images" className="block text-sm font-medium mb-1">
              Product Images (max 1MB each)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-750">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaImage className="text-gray-400 text-2xl mb-2" />
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    JPG, PNG, JPEG (MAX. 1MB)
                  </p>
                </div>
                <input
                  id="images"
                  type="file"
                  className="hidden"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleImageChange}
                />
              </label>
            </div>


            {imagePreview && (
              <div className="mt-4 relative w-32">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="h-24 w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage} 
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            )}
          </div>

         
          <div>
            <label htmlFor="ratings" className="block text-sm font-medium mb-1">
              Ratings (0-5, optional)
            </label>
            <input
              type="number"
              id="ratings"
              name="ratings"
              value={formData.ratings}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                errors.ratings ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              placeholder="Enter rating (0-5)"
            />
            {errors.ratings && (
              <p className="text-red-500 text-xs mt-1">{errors.ratings}</p>
            )}
          </div>

 
          <div className="pt-4">
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
                  Adding Product...
                </>
              ) : (
                <>
                  <FaPlusCircle className="mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
