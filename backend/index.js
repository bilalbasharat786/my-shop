// backend/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js"; // Routes import kiye

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/myshop")
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((err) => console.log("MongoDB Connection Error:", err));

// Routes Use karna
// Iska matlab: koi bhi URL jo "/api" se shuru hoga, wo productRoutes ma jayega
app.use("/api", productRoutes);

// Server Start
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});