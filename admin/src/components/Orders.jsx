// admin/src/components/Orders.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../url";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Orders load karna
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Status Change Handle karna
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${backendUrl}/api/order/${id}`, { status: newStatus });
      fetchOrders(); // List refresh karo taake naya status dikhe
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  // Delete Handle karna
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${backendUrl}/api/order/${id}`);
        fetchOrders(); // List refresh karo
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Order Management</h2>
      
      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white border border-gray-200 shadow-md rounded-lg p-6 relative">
            
            {/* Delete Button (Top Right) */}
            <button 
              onClick={() => handleDelete(order._id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold"
            >
              ✕ Delete
            </button>

            {/* Header Info */}
            <div className="mb-4 pr-10">
              <h3 className="text-xl font-bold text-blue-600">{order.customerName}</h3>
              <p className="text-gray-600 text-sm">{order.customerAddress}</p>
              
              <div className="flex items-center gap-4 mt-2">
                <span className="font-bold text-green-600">Total: ${order.totalPrice}</span>
                
                {/* Status Dropdown */}
                <select 
                  value={order.status} 
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={`border rounded px-2 py-1 text-sm font-semibold cursor-pointer outline-none
                    ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : ''}
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                  `}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Products List (Image ke sath) */}
            <ul className="space-y-2 border-t pt-4">
              {order.products.map((item, index) => (
                <li key={index} className="flex items-center gap-4 bg-gray-50 p-2 rounded">
                   <img 
                    src={`${backendUrl}${item.imageUrl}`} 
                    alt={item.name} 
                    className="w-10 h-10 object-cover rounded border"
                  />
                  <span className="text-gray-800 text-sm">{item.name}</span>
                  <span className="text-gray-600 text-xs ml-auto">Qty: {item.quantity}</span>
                </li>
              ))}
            </ul>

          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;