// backend/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js"; // Routes import kiye
import orderRoutes from "./routes/orderRoutes.js"; // <-- Ye Import kiya
import path from "path";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// --- YE NAYI LINE ADD KARO ---
// Iska matlab: Agar koi URL '/uploads' se shuru ho, to use 'uploads' folder mein dhoondo
app.use('/uploads', express.static('uploads'));
// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/myshop")
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((err) => console.log("MongoDB Connection Error:", err));

// Routes Use karna
// Iska matlab: koi bhi URL jo "/api" se shuru hoga, wo productRoutes ma jayega
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// Server Start
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});