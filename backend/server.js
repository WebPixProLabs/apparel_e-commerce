import express from "express"; 
import cors from "cors";
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js"
import connectCloudinary from "./config/cloudinary.js";




/* App Config */
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();


/* Middlewares */
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* API Endpoints */

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => {
    res.send('API Working');
});

/* Start the Server */
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
