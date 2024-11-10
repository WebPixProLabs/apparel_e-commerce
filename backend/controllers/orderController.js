
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
//place orders using COD Method:

export const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        
        // Log the request body for debugging
        console.log('Order request body:', req.body);
        
        // Validate userId presence
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({
                success: false,
                message: "User ID, items, amount, and address are required"
            });
        }
        
        // Prepare order data
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "cod",
            payment: false,
            date: Date.now()
        };
        
        // Create and save the new order
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        
        // Clear user's cart data after order placement
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        
        // Send success response
        res.status(200).json({ success: true, message: "Order Placed Successfully" });
        
    } catch (error) {
        // Improved error handling
        console.error('Error placing order:', error);
        const errorMessage = error.message || "An error occurred while placing the order";
        res.status(500).json({ success: false, message: errorMessage });
    }
};

//place orders using Stripe Method
export const placeOrderStripe = async (req, res) => {

};
//place orders using RazorPay Method
export const placeOrderRazorPay = async (req, res) => {

};

// All orders Data for Admin Panel

export const getAllOrders = async (req, res) => {

};

// userOrder data for frontend
export const userOrder = async (req, res) => {

};

// Update Status order
export const updateStatus = async (req, res) => {
    
};
