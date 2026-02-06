// admin/src/components/AddProduct.jsx
import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  // Text fields ke liye state
  const [textData, setTextData] = useState({
    name: "",
    price: "",
    description: "",
  });
  // Image file ke liye alag state
  const [imageFile, setImageFile] = useState(null);

  // Text inputs handle karna
  const handleChange = (e) => {
    setTextData({ ...textData, [e.target.name]: e.target.value });
  };

  // File input handle karna
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Pehli file select karo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // File upload karne ke liye FormData banana zaroori hai
    const formData = new FormData();
    formData.append("name", textData.name);
    formData.append("price", textData.price);
    formData.append("description", textData.description);
    // Note: yahan "image" wahi naam hai jo backend route ma use kiya tha
    formData.append("image", imageFile); 

    try {
      // Axios khud hi samajh jayega ke ye multipart/form-data hai
      const response = await axios.post("http://localhost:5000/api/add-product", formData);
      if (response.data) {
        alert("Product Successfully Added!");
        // Form reset
        setTextData({ name: "", price: "", description: "" });
        setImageFile(null);
        // File input ko clear karne ka desi tareeqa
        document.getElementById("fileInput").value = "";
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error: Product upload nahi hua.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-xl mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload New Product
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        
        {/* Product Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Product Name</label>
          <input type="text" name="name" value={textData.name} onChange={handleChange} required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input type="text" name="price" value={textData.price} onChange={handleChange} required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea name="description" value={textData.description} onChange={handleChange} required rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        {/* --- FILE INPUT (Naya Change) --- */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Product Image (Upload from Computer)</label>
          <input 
            id="fileInput"
            type="file" 
            accept="image/*" // Sirf images allow karo
            onChange={handleFileChange} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md">
          Upload Product
        </button>

      </form>
    </div>
  );
};

export default AddProduct;