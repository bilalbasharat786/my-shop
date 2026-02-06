// frontend/src/App.jsx
import { Routes, Route, Link } from "react-router-dom"; // Link import kiya
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import { useCart } from "./context/CartContext"; // Cart hook import kiya
import Cart from "./components/Cart";

function App() {
  const { cart } = useCart(); // Cart ka data nikala

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 cursor-pointer">
            My E-Shop
          </Link>
          
          <Link to="/cart" className="text-gray-600 hover:text-blue-600 font-medium relative">
            Cart 
            {/* Agar cart mein item hai to badge dikhao */}
            {cart.length > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* Cart page ka route hum baad mein banayenge */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
      
    </div>
  );
}

export default App;
