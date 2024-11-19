import mongoose from "mongoose";
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"


//place orders using COD Method:
export const placeOrder = async (req, res) => {
    try {
      const { items, amount, address, userId } = req.body;
      console.log("Received userId:", userId); 
  
      // Debugging: Check what is being received in the request body
      console.log("Request Body:", req.body);
  
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
  
      // Create order with userId
      const newOrder = new orderModel({
        items,
        amount,
        address,
        userId, // userId will be passed from client
        paymentMethod: 'COD', // Assume COD (Cash on Delivery) for now
      });
  
      // Save the order to the database
      await newOrder.save();
      console.log("Order saved successfully:", newOrder); // Debugging: Check if the order is saved successfully
  
      res.status(200).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
      console.error("Error placing order:", error); // Debugging: Log the error
      res.status(500).json({ message: 'Error placing order', error });
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
