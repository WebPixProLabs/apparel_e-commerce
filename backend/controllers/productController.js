import { v2 as cloudinary } from "cloudinary";
import 'dotenv/config'; 
import productModel from "../models/productModel.js"


// Add product Function
const addProduct = async (req, res) => {
  try {
    // Destructure fields from request body
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
    
    // Debugging log to check bestseller value
    console.log("Received bestseller:", bestseller); 

    // Check and access uploaded files from req.files
    const image1 = req.files?.image1 ? req.files.image1[0] : null;
    const image2 = req.files?.image2 ? req.files.image2[0] : null;
    const image3 = req.files?.image3 ? req.files.image3[0] : null;
    const image4 = req.files?.image4 ? req.files.image4[0] : null;

    // Create an array of images, filtering out null values
    const images = [image1, image2, image3, image4].filter((item) => item !== null);

    // Upload images to Cloudinary and get their URLs
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        console.log("uploading image", item.path);
        if (!item) {
          throw new Error("Uploaded item is null");
        }
        const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    console.log("Uploaded Image URLs:", imagesUrl);

    // Create the product data object
    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      sizes: JSON.parse(sizes),
      bestseller: bestseller === 'true', 
      images: imagesUrl,
      date: Date.now(),
    };

    console.log("productData:", productData); // Log the final product data to check bestSeller

    // Save the product to the database
    const product = new productModel(productData);
    await product.save();

    // Return a response indicating success
    res.json({ success: true, message: "Product added successfully", imagesUrl });

  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


// List product Function
const listProducts = async (req, res) => {
  // Implementation here
  try {
    const products = await productModel.find({})
    res.status(200).json({success:true, products})
    
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove product Function
const removeProduct = async (req, res) => {
    try {
        // Extract the product ID from the request parameters
        const productId = req.params.id; // Assuming you're using /remove/:id route

        // Check if the product ID is provided
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        // Log the product ID we are trying to delete
        console.log("Attempting to delete product with ID:", productId);

        // Find the product by ID to check if it exists
        const productToDelete = await productModel.findById(productId);
        
        // Check if the product exists
        if (!productToDelete) {
            console.log("Product not found:", productId);
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // If it exists, delete the product
        await productModel.findByIdAndDelete(productId);
        console.log("Product deleted successfully:", productId);
        
        // Return a success response
        res.status(200).json({ success: true, message: "Product removed" });
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({ success: false, message: "An error occurred while deleting the product." });
    }
};

export default removeProduct;


// Single product info Function
const singleProduct = async (req, res) => {
  // Implementation here
  try {
    const {productId} = req.body
    const product = await productModel.findById(productId)
    res.status(200).json({success:true, product})
  } catch (error) {
    console.error("Error Listing Single product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }

};

export { addProduct, listProducts, removeProduct, singleProduct };
