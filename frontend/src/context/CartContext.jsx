// frontend/src/context/CartContext.jsx
import { createContext, useState, useContext } from "react";

// Context create kiya
const CartContext = createContext();

// Provider banaya jo poori app ko data dega
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Product add karne ka function
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert("Item Cart mein add ho gaya!");
  };

  // Product remove karne ka function (future ke liye)
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook taake asani se use kar sakein
export const useCart = () => useContext(CartContext);