//this is product controller
import productSchema from '../models/productSchema.js';
// import userSchema from '../models/userSchema.js';

export const createProduct = async (req, res) => {
    try {
        const { pname, description, price, category, stock, images,ratings } = req.body;
        const sellerId = req.userId; // Assuming userId is set by hasToken middleware

        if (!pname || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const newProduct = new productSchema({
            pname,
            description,
            price,
            category,
            stock,
            sellerId,
            images,
            ratings
        });

        await newProduct.save();
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: newProduct
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await productSchema.find();
        return res.status(200).json({
            success: true,
            products: products
        });
           
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}                                                   

