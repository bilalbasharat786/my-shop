// admin/src/components/Orders.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Page load hote hi orders mangwao
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Customer Orders</h2>
      
      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white border border-gray-200 shadow-md rounded-lg p-6">
            
            {/* Order Header: Customer Info */}
            <div className="flex justify-between items-start border-b pb-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-blue-600">{order.customerName}</h3>
                <p className="text-gray-600 text-sm">Email: {order.customerEmail}</p>
                <p className="text-gray-600 text-sm">Address: {order.customerAddress}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                    Date: {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-lg font-bold text-green-600 mt-1">
                  Total: ${order.totalPrice}
                </p>
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-2">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Products List */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Ordered Items:</h4>
              <ul className="space-y-2">
                {order.products.map((item, index) => (
                  <li key={index} className="flex justify-between bg-gray-50 p-2 rounded">
                    {/* Image Show karne ka code */}
      <img 
        src={`http://localhost:5000/${item.imageUrl}`} 
        alt={item.name} 
        className="w-12 h-12 object-cover rounded border border-gray-300"
      />
                    <span className="text-gray-800">{item.name}</span>
                    <span className="text-gray-600 font-medium">Qty: {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-gray-500">No orders found yet.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;