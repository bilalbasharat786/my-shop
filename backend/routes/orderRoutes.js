// backend/routes/orderRoutes.js
import express from "express";
import { createOrder,getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/orders", createOrder); // POST request par order banega
router.get("/orders", getOrders);

export default router;