// backend/controllers/productController.js
import Product from "../models/Product.js";

// Product Add karne ka logic
export const addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Sare Products lene ka logic
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};