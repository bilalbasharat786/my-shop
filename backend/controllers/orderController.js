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