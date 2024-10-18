import express from 'express'
import orderModel from "../models/orderModel"
import adminAuth from "../middlewares/adminAuth"
import { placeOrder, placeOrderStripe, placeOrderRazorPay, getAllOrders, userOrder, updateStatus } from "../controllers/orderController"

const orderRouter = express.Router()

{/* Admin  */}
orderRouter.post('/list',adminAuth,getAllOrders);
orderRouter.patch('/status',adminAuth,updateStatus);
{/* Payment Endpoints */}
orderRouter.post('/placeOrder',placeOrder);
orderRouter.post('/placeOrderStripe',placeOrderStripe);
orderRouter.post('/placeOrderRazorPay',placeOrderRazorPay);

orderRouter.get('/userOrder',adminAuth,userOrder);



