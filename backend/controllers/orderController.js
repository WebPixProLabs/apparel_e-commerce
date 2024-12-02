import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//place orders using COD Method:
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    console.log(req.body);

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
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
  try {
    const orders = await orderModel.find({})
    res.status(200).json({success:true, message: "Fetching All Orders",orders})
} catch (error) {
    console.log(error)
    res.status(400).json({success:false, message:error.message || "error in Fetching all Orders"})
}
};

// userOrder data for frontend

export const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    const orders = await orderModel.find({ userId });
    if (orders.length === 0) {
      return res.status(200).json({ success: true, message: "No orders found", orders: [] });
    }
    res.status(200).json({ success: true, message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};



// Update Status order
export const updateStatus = async (req, res) => {
  try {
    const {orderId,status} = req.body;
    await orderModel.findByIdAndUpdate(orderId,{status})
    res.status(200).json({success:true,message:"Order Status Updated"});
  } catch (error) {
    console.log(error)
    res.status(400).json({success:false,message:error.message || "Error in Updating Order Status"})
  }
};
