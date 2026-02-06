// frontend/src/context/CartContext.jsx
import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert("Item Cart mein add ho gaya!");
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  // NAYA FUNCTION: Cart khali karne ke liye
  const clearCart = () => {
    setCart([]);
  };

  return (
    // clearCart ko yahan value mein add kiya
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);