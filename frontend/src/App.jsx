// frontend/src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";   // <-- Import
import Signup from "./components/Signup"; // <-- Import
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext"; // <-- Import
import MyOrders from "./components/MyOrders";

function App() {
  const { cart } = useCart();
  const { user, logout } = useAuth(); // User status nikala

  return (
    <div className="min-h-screen bg-gray-100">
      
      <nav className="bg-white shadow-md p-4 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">My E-Shop</Link>
          <div className="flex gap-4 items-center">
            {/* Agar User Login hai to "My Orders" dikhao */}
            {user && (
              <Link to="/my-orders" className="text-gray-600 hover:text-blue-600 font-medium">
                My Orders
              </Link>
            )}
          <div className="flex gap-4 items-center">
            <Link to="/cart" className="relative text-gray-600 hover:text-blue-600 font-medium">
              Cart {cart.length > 0 && <span className="ml-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{cart.length}</span>}
            </Link>

            {/* Login/Logout Logic */}
            {user ? (
              <>
                <span className="font-bold text-gray-700">Hi, {user.name}</span>
                <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                <Link to="/signup" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Sign Up</Link>
              </>
            )}
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />   {/* <-- Route */}
        <Route path="/signup" element={<Signup />} /> {/* <-- Route */}
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
      
    </div>
  );
}

export default App;
