// frontend/src/components/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../url";

const Home = () => {
  const [products, setProducts] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Page load hote hi API se products mangwao
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Backend GET API call
        const response = await axios.get(`${backendUrl}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Latest Products
      </h1>

      {/* Grid Layout for Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            
           {/* Server ka address image path se pehle lagana zaroori hai */}
<img 
  src={product.imageUrl} 
  alt={product.name} 
  className="w-full h-48 object-cover"
/>

            {/* Product Details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  {product.price}
                </span>
                <Link 
                  to={`/product/${product._id}`} 
                  className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>

          </div>
        ))}

      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No products found. Please add some from Admin panel.</p>
      )}
    </div>
  );
};

export default Home;