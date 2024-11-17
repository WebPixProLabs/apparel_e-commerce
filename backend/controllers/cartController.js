// cartController.js
import userModel from "../models/userModel.js"
import mongoose from 'mongoose';
import productModel from '../models/productModel.js'

// Function to add items to the cart
// Function to add items to the cart
export const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity = 1 } = req.body;  // Default quantity is 1

        console.log("Request Body:", req.body);

        // Validate request body
        if (!userId || !itemId || !size) {
            console.error("Missing fields in request body");
            return res.status(400).json({
                success: false,
                message: 'Missing required fields (userId, itemId, size)',
            });
        }

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.error("Invalid userId format");
            return res.status(400).json({
                success: false,
                message: 'Invalid userId',
            });
        }

        // Validate itemId format
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            console.error("Invalid itemId format");
            return res.status(400).json({
                success: false,
                message: 'Invalid itemId',
            });
        }

        // Fetch the user data
        const userData = await userModel.findById(userId);
        if (!userData) {
            console.error("User not found for userId:", userId);
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        console.log("User data retrieved:", userData);

        // Fetch the product data
        const productData = await productModel.findById(itemId);
        if (!productData) {
            console.error("Product not found for itemId:", itemId);
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // Validate if the size exists in the product's available sizes
        if (!productData.sizes.includes(size)) {
            console.error(`Size ${size} not available for this product`);
            return res.status(400).json({
                success: false,
                message: `Size ${size} not available for this product`,
            });
        }

        // Initialize cartData if it doesn't exist
        if (!userData.cartData) {
            userData.cartData = {};
        }

        // Ensure cartData[itemId] is properly initialized
        if (!userData.cartData[itemId]) {
            userData.cartData[itemId] = {};  // Initialize the product entry
        }

        // Increment the quantity for the selected size
        userData.cartData[itemId][size] = (userData.cartData[itemId][size] || 0) + quantity;

        console.log("Updated cartData:", userData.cartData);

        // Save updated user data
        await userData.save();

        console.log("Cart data saved successfully");

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Item added to cart successfully',
            cartData: userData.cartData,  // Send the updated cart data
        });
    } catch (error) {
        console.error('Error in addToCart:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error adding item to cart',
        });
    }
};



// Function to update the cart
export const updateCart = async (req, res) => {
    // Function implementation here
    // Function to update the cart

    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        
        // Check if userData is null
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        let cartData = userData.cartData || {}; // Ensure cartData is initialized

        if (cartData[itemId] && cartData[itemId][size]) {
            cartData[itemId][size] = quantity;
        } else {
            return res.status(400).json({ success: false, message: 'Item not found in cart' });
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.status(200).json({ success: true, message: 'Cart Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error updating cart' });
    }
};

// Function to get user cart data
export const getUserCart = async (req, res) => {
    try {
        // User IDs you provided
        const userIds = [
            "6703652ea159a4420ec3940d",
            "67111caafb39a9638e0b11ac"
        ];

        // Array to hold cart data for both users
        const cartsData = [];

        // Fetch cart data for each user
        for (const userId of userIds) {
            const userData = await userModel.findById(userId).lean();

            // Check if user exists
            if (!userData) {
                cartsData.push({ userId, success: false, message: 'User not found' });
                continue; // Skip to the next user ID
            }

            // Extract cartData from userData
            const cartData = userData.cartData || []; // Provide a default value in case cartData is undefined
            cartsData.push({ userId, success: true, cartData });
        }

        // Send response with all users' cart data
        res.status(200).json({ success: true, cartsData });
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ success: false, message: 'Error fetching cart data' });
    }
};

