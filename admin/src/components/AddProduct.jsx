// admin/src/components/AddProduct.jsx
import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/add-product", product);
      if (response.data) {
        alert("Product Successfully Added!");
        setProduct({ name: "", price: "", description: "", imageUrl: "" });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error: Product upload nahi hua.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-xl mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New Product
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Product Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Product Name</label>
          <input 
            type="text" 
            name="name" 
            placeholder="Enter product name" 
            value={product.name} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input 
            type="text" 
            name="price" 
            placeholder="e.g. $20" 
            value={product.price} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea 
            name="description" 
            placeholder="Enter product details..." 
            value={product.description} 
            onChange={handleChange} 
            required 
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Image URL</label>
          <input 
            type="text" 
            name="imageUrl" 
            placeholder="Paste image link here" 
            value={product.imageUrl} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Add Product
        </button>

      </form>
    </div>
  );
};

export default AddProduct;