import express from "express";
import { UserLogin, AdminLogin, UserRegister, refreshAccessToken } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', UserRegister);
userRouter.post('/login', UserLogin);
userRouter.post('/admin', AdminLogin);
userRouter.post('/refresh-token', refreshAccessToken);

export default userRouter;
