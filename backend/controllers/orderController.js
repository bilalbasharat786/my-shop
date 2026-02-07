// backend/controllers/orderController.js
import Order from "../models/Order.js";

// Order Create karne ka function
export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Order failed", error });
  }
};
// SARE ORDERS LENE KE LIYE
export const getOrders = async (req, res) => {
  try {
    // .find() saare orders layega
    // .sort({ date: -1 }) ka matlab hai naya order sabse upar ayega
    const orders = await Order.find().sort({ date: -1 });
    res.send(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// 1. Order Status Update karna (Pending -> Shipped -> Delivered)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status: status }, 
      { new: true } // Ye updated order wapis bhejta hai
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

// 2. Order Delete karna
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};
// 1. User ke Orders Email se dhoondna
export const getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    // Email match karo aur naya order sabse upar (sort date -1)
    const orders = await Order.find({ customerEmail: email }).sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// 2. Order Cancel karna
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Agar Admin ne Ship kar diya ho to Cancel nahi ho sakta
    if (order.status === "Shipped" || order.status === "Delivered") {
       return res.status(400).json({ message: "Order ship ho chuka hai, ab cancel nahi ho sakta." });
    }
    // Order Delete karo
    await Order.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Order Cancelled Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Cancel failed", error });
  }
};