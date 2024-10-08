import { v2 as cloudinary } from "cloudinary";
import 'dotenv/config'; 
import productModel from "../models/productModel.js"


// Add product Function
const addProduct = async (req, res) => {
  try {
    // Destructure fields from request body
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

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

    // Log received images and details
    // console.log("Received Images:", { image1, image2, image3, image4 });
    // console.log(name, description, price, category, subCategory, sizes, bestseller);
    // console.log("Uploaded Image URLs:", imagesUrl);

    // Here, you would typically save the product details along with the image URLs to the database
    // For example:
    // await Product.create({ name, description, price, category, subCategory, sizes, bestseller, images: imagesUrl });

    /* saving the cloudinary images to mongodb */
    const productData = {
      name,
      description,
      category,
      subCategory,
      price:Number(price),
      sizes: JSON.parse(sizes),
      bestseller: bestseller === 'true' ? true : false,
      images: imagesUrl,
      date: Date.now(),
    }
    console.log("productData", productData);

    const product = new productModel(productData);
    await product.save()
    // res.json({success:false, message:"Product Added"});
    
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
};

// Remove product Function
const removeProduct = async (req, res) => {
  // Implementation here
};

// Single product info Function
const singleProduct = async (req, res) => {
  // Implementation here
};

export { addProduct, listProducts, removeProduct, singleProduct };
