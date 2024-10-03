import express from "express"; 
import cors from "cors";
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudianry from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";




/* App Config */
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudianry();


/* Middlewares */
app.use(express.json());
app.use(cors());

/* API Endpoints */
app.use('/api/user', userRouter);
app.get('/', (req, res) => {
    res.send('API Working');
});

/* Start the Server */
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
