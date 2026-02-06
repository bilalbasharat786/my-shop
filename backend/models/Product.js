// backend/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    description: String,
    imageUrl: String
});

export default mongoose.model("Product", productSchema);