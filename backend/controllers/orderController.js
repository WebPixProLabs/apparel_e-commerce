import mongoose from "mongoose";
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"


//place orders using COD Method:
export const placeOrder = async (req,res) => {
    
  try {
      
      const { userId, items, amount, address} = req.body;
      console.log(req.body);

      const orderData = {
          userId,
          items,
          address,
          amount,
          paymentMethod:"COD",
          payment:false,
          date: Date.now()
      }

      const newOrder = new orderModel(orderData)
      await newOrder.save()

      await userModel.findByIdAndUpdate(userId,{cartData:{}})

      res.json({success:true,message:"Order Placed"})


  } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
  }

}
  

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
  try {
    const { userId } = req.body;
    console.log(req.body);
    const orders = await orderModel.find({userId})
    res.status(200).json({ message: 'Order placed successfully', order: orders });
    
  } catch (error) {
    console.log(error);
    res.status(400).json({success:false,message:error.message});
  }

};


// Update Status order
export const updateStatus = async (req, res) => {
    
};
