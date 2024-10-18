
import orderModel from "../models/orderModel.js"
//place orders using COD Method:

export const placeOrder = async (req, res) => {

    try {
        const {userId,items,amount,address} = req.body;
        console.log(req.body);
        const orderData = {userId,items,amount,address,paymentMethod:"COD",payment:false,date:Date.now()}
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {cartData:{}});
        res.status(200).json({success:true,message:"Order Placed Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.data.message});
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
