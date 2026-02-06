// backend/controllers/productController.js
import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
    try {
        // Check karo agar image upload hui hai
        if (!req.file) {
            return res.status(400).send({ message: "Please upload an image" });
        }

        // Image ka path (e.g., 'uploads/123456789.jpg')
        // Windows ma path ma '\' ata hai, usy '/' sa replace kr rhy hain ta k URL theek rhy
        const imagePath = req.file.path.replace(/\\/g, "/");

        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            imageUrl: imagePath, // URL ki jagah ab local path save hoga
        });

        const result = await product.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

// getProducts wesa hi rahega
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};