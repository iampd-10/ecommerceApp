//this is product controller
import productSchema from '../models/productSchema.js';
// import userSchema from '../models/userSchema.js';

export const createProduct = async (req, res) => {
  try {
    const { pname, description, price, category, stock, ratings } = req.body;
    const sellerId = req.userId;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;


    const newProduct = new productSchema({
      pname,
      description,
      price,
      category,
      stock,
      ratings,
      sellerId,
       images: imageUrl,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


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

