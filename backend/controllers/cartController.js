// cartController.js
import userModel from "../models/userModel.js"
// Function to add items to the cart
// Function to add items to the cart
export const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        const userData = await userModel.findById(userId);

        // Check if userData and cartData are defined
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Initialize cartData if it doesn't exist
        if (!userData.cartData) {
            userData.cartData = {};
        }

        let cartData = userData.cartData;

        // Adding items to cart
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Increment quantity
            } else {
                cartData[itemId][size] = 1; // Initialize quantity
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1; // Initialize size with quantity 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true }); // Ensure new document is returned
        res.status(200).json({ success: true, message: 'Items added to cart', cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error adding item to cart' });
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
    // Function implementation here
    try {
        // Destructure userId from request body
        const { userId } = req.body;

        // Validate userId
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        // Find user by ID
        const userData = await userModel.findById(userId).lean(); // Using .lean() for better performance

        // Check if user exists
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Extract cartData from userData
        const cartData = userData.cartData; // This is safe now since userData is validated

        // Send response with cart data
        res.status(200).json({ success: true, cartData });
    } catch (error) {
        console.error("Error fetching cart data:", error); // More specific logging
        res.status(500).json({ success: false, message: 'Error fetching cart data' });
    }
};
