// backend/routes/orderRoutes.js
import express from "express";
import { createOrder,getOrders,updateOrderStatus,deleteOrder,getOrdersByEmail,cancelOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/orders", createOrder); // POST request par order banega
router.get("/orders", getOrders);
router.post("/my-orders", getOrdersByEmail);   // Email bhejo -> Orders lo
router.delete("/order/cancel/:id", cancelOrder);
// --- NAYE ROUTES ---
router.put("/order/:id", updateOrderStatus); // PUT use hota hai update ke liye
router.delete("/order/:id", deleteOrder);


export default router;