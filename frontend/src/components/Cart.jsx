// frontend/src/components/Cart.jsx
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  

  // Total Price calculate karne ka formula
  const totalPrice = cart.reduce((total, item) => {
    // Price string hai (e.g., "$29"), usme se "$" hata kar number banaya
    const priceNumber = parseFloat(item.price.replace("$", "")); 
    return total + priceNumber;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Go back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {cart.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 border-b border-gray-200">
            
            {/* Image & Name */}
            <div className="flex items-center gap-4">
              <img 
                src={item.imageUrl}
                alt={item.name} 
                className="w-16 h-16 object-cover rounded-md" 
              />
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500">{item.price}</p>
              </div>
            </div>

            {/* Remove Button */}
            <button 
              onClick={() => removeFromCart(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}

        {/* Total Price Section */}
        <div className="p-6 bg-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold">Total:</h2>
          <span className="text-2xl font-bold text-blue-600">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-6 text-right">
        <Link to="/checkout" className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-700 transition inline-block">
  Proceed to Checkout
</Link>
      </div>

    </div>
  );
};

export default Cart;