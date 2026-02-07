// frontend/src/components/Checkout.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Redirect karne ke liye

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: ""
  });

  // Total Price Calculate karna
  const totalPrice = cart.reduce((total, item) => {
    const priceNumber = parseFloat(item.price.replace("$", ""));
    return total + priceNumber;
  }, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Order Data jo backend par jayega
    const orderData = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerAddress: formData.address,
      products: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        quantity: 1 // Abhi ke liye quantity 1 fix rakhi hai
      })),
      totalPrice: totalPrice
    };

    try {
      const response = await axios.post(`${baseUrl}/api/orders`, orderData);
      if (response.status === 201) {
        alert("Order Placed Successfully!");
        clearCart(); // Cart khali karo
        navigate("/"); // Wapis Home page par bhej do
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (cart.length === 0) {
    return <div className="text-center mt-20 text-xl">Cart is Empty!</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input type="text" name="name" required onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email Address</label>
          <input type="email" name="email" required onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Shipping Address</label>
          <textarea name="address" required onChange={handleChange} rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        {/* Total Price Summary */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount:</span>
            <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition">
          Place Order
        </button>

      </form>
    </div>
  );
};

export default Checkout;