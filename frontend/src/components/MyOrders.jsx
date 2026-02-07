// frontend/src/components/MyOrders.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Login user ka data lene ke liye

const MyOrders = () => {
  const { user } = useAuth(); // Logged in user nikala
  const [orders, setOrders] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Orders lanay ka function
  const fetchOrders = async () => {
    if (!user?.email) return; // Agar user login nahi hai to ruk jao

    try {
      const response = await axios.post(`${backendUrl}/api/my-orders`, { 
        email: user.email 
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Auto-Refresh Logic (Polling)
  useEffect(() => {
    // 1. Page khulte hi orders lao
    fetchOrders();

    // 2. Har 3 second baad dubara check karo (Taake Admin ka update foran dikhe)
    const interval = setInterval(() => {
      fetchOrders();
    }, 3000);

    // 3. Jab page band ho to interval khatam karo
    return () => clearInterval(interval);
  }, [user]); // Jab user change ho to dubara chalao

  // Order Cancel Logic
  const handleCancel = async (id) => {
    if(!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.delete(`${backendUrl}/api/order/cancel/${id}`);
      alert("Order Cancelled!");
      fetchOrders(); // List foran update karo
    } catch (error) {
      alert(error.response?.data?.message || "Error cancelling order");
    }
  };

  if (!user) return <div className="text-center mt-10">Please Login to view orders.</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border shadow-md rounded-lg p-6 relative">
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                 <span className={`px-3 py-1 rounded-full text-sm font-bold 
                  ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : ''}
                  ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                `}>
                  {order.status}
                </span>
              </div>

              {/* Order Info */}
              <div className="mb-4">
                <p className="text-gray-500 text-sm">Order ID: {order._id}</p>
                <p className="text-gray-500 text-sm">Date: {new Date(order.date).toLocaleString()}</p>
                <p className="text-gray-800 font-semibold mt-1">Address: {order.customerAddress}</p>
              </div>

              {/* Products List */}
              <ul className="divide-y">
                {order.products.map((item, index) => (
                  <li key={index} className="flex items-center gap-4 py-3">
                     <img src={`${item.imageUrl}`} alt="" className="w-12 h-12 rounded object-cover border"/>
                     <div>
                       <p className="font-semibold">{item.name}</p>
                       <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                     </div>
                  </li>
                ))}
              </ul>

              {/* Footer: Total & Cancel Button */}
              <div className="flex justify-between items-center pt-4 border-t mt-2">
                <span className="text-xl font-bold text-blue-600">Total: ${order.totalPrice}</span>
                
                {/* Cancel Button sirf tab dikhega agar status Pending hai */}
                {order.status === 'Pending' && (
                    <button 
                      onClick={() => handleCancel(order._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm transition"
                    >
                      Cancel Order
                    </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;