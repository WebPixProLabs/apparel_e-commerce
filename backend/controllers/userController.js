import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import validator from "validator";

// Load environment variables from .env file once
dotenv.config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '365d' }); 
};

const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '365d' }); 
};

// Route for UserLogin
const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, msg: "User does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, msg: "Invalid credentials." });
    }

    // Generate access token and refresh token
    const token = createToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    // Return both tokens to the client
    return res.status(200).json({ success: true, token, refreshToken, msg: "Login successful." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: e.message });
  }
};

// Route for UserRegister
const UserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, msg: "All fields are required." });
    }

    // Checking if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, msg: "User already exists in DB." });
    }

    // Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, msg: "Please enter a valid email." });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, msg: "Please enter a strong password (minimum 8 characters)." });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    
    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({ success: true, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: e.message });
  }
};

// Route for AdminLogin
const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Email and password are required" });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      let user = await userModel.findOne({ email: process.env.ADMIN_EMAIL });
      
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new userModel({
          name: 'Admin',
          email: process.env.ADMIN_EMAIL,
          password: hashedPassword,
          role: 'admin',
        });
        await user.save();
        console.log("Admin user saved to MongoDB.");
      }

      const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '365d' });
      const refreshToken = jwt.sign({ email, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '365d' });

      return res.status(200).json({ success: true, token, refreshToken });
    } else {
      return res.status(401).json({ success: false, msg: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Route for refreshAccessToken
export const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "Missing refresh token" });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ accessToken: newAccessToken });
  });
};

// Export all functions
export { UserLogin, UserRegister, AdminLogin };
