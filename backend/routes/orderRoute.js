import express from 'express';
import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/authUser.js";  
import { 
  placeOrder, 
  placeOrderStripe, 
  placeOrderRazorPay, 
  getAllOrders, 
  userOrder, 
  updateStatus 
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// Admin Endpoints
orderRouter.post('/list', adminAuth, getAllOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment Endpoints
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorPay);

// User Routes
orderRouter.post('/userorders', authUser, userOrder);

export default orderRouter;
