import express from "express";
import { addProduct, listProducts, removeProduct, singleProduct } from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";



const productRouter = express.Router();

productRouter.post('/add',adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]), addProduct);
productRouter.delete('/remove/:id',removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProducts);

export default productRouter;