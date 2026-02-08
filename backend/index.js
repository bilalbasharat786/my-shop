// backend/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Routes Import
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Atlas Connected!"))
    .catch((err) => console.log("DB Error:", err));

// --- API ROUTES ---
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api/auth", authRoutes); // Note: Maine yahan /auth add kiya hai jaisa humne pehle fix kiya tha

// --- YE HAI WO MISSING CODE (ROOT ROUTE) ---
// Jab koi tumhari website ka main link kholega to ye message ayega
app.get("/", (req, res) => {
    res.send("Server is Running! 🚀 Welcome to My E-Shop Backend");
});

// Server Start (Vercel ke liye Port dynamic hona chahiye)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});