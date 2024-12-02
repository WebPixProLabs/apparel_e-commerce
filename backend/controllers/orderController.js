import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
// import Stripe from 'stripe';
// import Razorpay from 'razorpay';

// Initialize Razorpay instance
// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET_KEY,
// });

// Initialize Stripe instance
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Global variables
// const currency = '$';
// const deliveryCharge = 10;

// Place orders using COD Method
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

// Place orders using Stripe Method

// export const placeOrderStripe = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;
//     const { origin } = req.headers;

//     // Validate that items is an array
//     if (!Array.isArray(items)) {
//       return res.status(400).json({ success: false, message: "Items should be an array" });
//     }

//     // Validate that items is not empty
//     if (items.length === 0) {
//       return res.status(400).json({ success: false, message: "Items cannot be empty" });
//     }

//     console.log('Items:', items); // Log items to check structure

//     // Create order data
//     const orderData = {
//       userId,
//       items,
//       address,
//       amount,
//       paymentMethod: "Stripe",
//       payment: false,
//       date: Date.now(),
//     };

//     // Save the order data to the database
//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     // Create line_items for Stripe checkout
//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: 'usd',  // Adjust the currency as needed
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100, // Stripe expects the amount in cents
//       },
//       quantity: item.quantity,
//     }));

//     // Optionally, add delivery charges if applicable
//     const deliveryCharge = 500;  // Example delivery charge, adjust as needed
//     line_items.push({
//       price_data: {
//         currency: 'usd',  // Adjust the currency as needed
//         product_data: {
//           name: 'Delivery Charges',
//         },
//         unit_amount: deliveryCharge * 100, // Stripe expects the amount in cents
//       },
//       quantity: 1,
//     });

//     // Create the Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],  // Define payment methods if necessary
//       line_items,
//       mode: 'payment',
//       success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
//     });

//     // Return the session URL to the client
//     return res.json({
//       success: true,
//       session_url: session.url,
//     });
//   } catch (error) {
//     console.error('Error creating Stripe session:', error);  // Log the error on the server side
//     // Return the error message with a status code of 500
//     return res.status(500).json({
//       success: false,
//       message: error.message || 'An error occurred while processing the payment.',
//     });
//   }
// };



// Stripe Verification
// export const verifyStripe = async (req, res) => {
//   const { orderId, success, userId } = req.body;

//   try {
//     if (success === "true") {
//       await orderModel.findByIdAndUpdate(orderId, { payment: true });
//       await userModel.findByIdAndUpdate(userId, { cartData: {} });
//       res.json({ success: true });
//     } else {
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ success: false });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// Place orders using RazorPay Method
// export const placeOrderRazorPay = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;

//     const orderData = {
//       userId,
//       items,
//       address,
//       amount,
//       paymentMethod: "Razorpay",
//       payment: false,
//       date: Date.now(),
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     const options = {
//       amount: amount * 100, // Razorpay expects amount in paise (1 INR = 100 paise)
//       currency: currency.toUpperCase(),
//       receipt: newOrder._id.toString(),
//     };

//     const order = await razorpayInstance.orders.create(options);

//     res.json({ success: true, order });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// Razorpay Verification
// export const verifyRazorpay = async (req, res) => {
//   try {
//     const { userId, razorpay_order_id } = req.body;

//     const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

//     if (orderInfo.status === 'paid') {
//       await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
//       await userModel.findByIdAndUpdate(userId, { cartData: {} });
//       res.json({ success: true, message: "Payment Successful" });
//     } else {
//       res.json({ success: false, message: 'Payment Failed' });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// All orders Data for Admin Panel
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, message: "Fetching All Orders", orders });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message || "Error in Fetching all Orders" });
  }
};

// User Order Data for Frontend
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

// Update Order Status
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "Order Status Updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message || "Error in Updating Order Status" });
  }
};
