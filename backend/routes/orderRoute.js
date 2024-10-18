import express from 'express'
import adminAuth from "../middlewares/adminAuth"
import { placeOrder, placeOrderStripe, placeOrderRazorPay, getAllOrders, userOrder, updateStatus } from "../controllers/orderController"

const orderRouter = express.Router()

{/* Admin  */}

orderRouter.post('/list', adminAuth,getAllOrders)
orderRouter.post('/status', adminAuth,updateStatus)

{/* Payment Endpoints */}
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser,placeOrderRazorPay)

{/* user Feature */}

orderRouter.post('/userorder',authUser,userOrder);

export default orderRouter

