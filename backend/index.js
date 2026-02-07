// backend/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js"; // Routes import kiye
import orderRoutes from "./routes/orderRoutes.js"; // <-- Ye Import kiya
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config(); // <-- Ye sabse upar hona chahiy


const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// --- YE NAYI LINE ADD KARO ---
// Iska matlab: Agar koi URL '/uploads' se shuru ho, to use 'uploads' folder mein dhoondo
app.use('/uploads', express.static('uploads'));
// Database Connection
mongoose.connect(process.env.MONGO_URI) // <-- Ab ye .env se ayega
    .then(() => console.log("MongoDB Atlas Connected!"))
    .catch((err) => console.log("DB Error:", err));

// Routes Use karna
// Iska matlab: koi bhi URL jo "/api" se shuru hoga, wo productRoutes ma jayega
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api/auth", authRoutes);

// Server Start
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});