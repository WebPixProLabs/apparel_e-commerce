import express from "express";
import { UserLogin, AdminLogin, UserRegister } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', UserRegister);
userRouter.post('/login', UserLogin);
userRouter.post('/admin', AdminLogin);

export default userRouter;
