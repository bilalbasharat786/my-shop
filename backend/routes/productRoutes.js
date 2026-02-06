// backend/routes/productRoutes.js
import express from "express";
import { addProduct, getProducts , getProductById} from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Define routes
// Yahan change hai: 'upload.single("image")' add kiya.
// "image" wo naam hai jo hum frontend form mein use karenge.
router.post("/add-product", upload.single("image"), addProduct);
router.get("/products", getProducts);

// --- NAYA ROUTE ---
// :id ka matlab hai ke yahan product ki unique ID ayegi
router.get("/product/:id", getProductById);

export default router;