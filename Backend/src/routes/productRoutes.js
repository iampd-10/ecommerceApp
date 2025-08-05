import express from "express";
import { upload } from "../controller/fileController.js";
import { hasToken } from "../middleware/hasToken.js";


const router = express.Router();
import { createProduct, getProducts } from "../controller/productController.js";

// Route to create a new product
router.post("/add", hasToken, upload.single('image'), createProduct);
// Route to get all products
router.get("/all", getProducts);
export default router;

