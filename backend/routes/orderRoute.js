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
orderRouter.post('/list', getAllOrders);
orderRouter.post('/status', updateStatus);

// Payment Endpoints
orderRouter.post('/place',  placeOrder);
orderRouter.post('/stripe',  placeOrderStripe);
orderRouter.post('/razorpay',  placeOrderRazorPay);

// User Routes
orderRouter.post('/userorders',  userOrder);

export default orderRouter;
