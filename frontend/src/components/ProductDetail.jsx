// frontend/src/components/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Link back button ke liye
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams(); // URL se ID nikalne ke liye
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="container mx-auto p-6 mt-10">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Products
      </Link>
      
      <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 flex flex-col md:flex-row">
        
        {/* Left Side: Image */}
        <div className="md:w-1/2">
          <img 
            src={`http://localhost:5000/${product.imageUrl}`} 
            alt={product.name} 
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Right Side: Details */}
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {product.description}
          </p>
          <div className="text-3xl font-bold text-blue-600 mb-6">
            {product.price}
          </div>
        {/* Button par click function lagaya */}
          <button 
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition w-full md:w-auto"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;