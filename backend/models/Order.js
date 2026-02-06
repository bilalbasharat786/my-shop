// backend/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: String,
  customerAddress: String,
  customerEmail: String,
  products: [
    {
      productId: String,
      name: String,
      price: String,
      imageUrl: String,
      quantity: Number
    }
  ],
  totalPrice: Number,
  status: {
    type: String,
    default: "Pending" // Shuru mein order pending rahega
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Order", orderSchema);