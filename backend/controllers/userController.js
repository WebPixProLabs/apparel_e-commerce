import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Route for userLogin
const UserLogin = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "User Does not Exist" });
    }
    
    /*  Check if the provided password matches the hashed password in the database */
    
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials." });
    }

    /* If the password is correct, create and return a JWT token */
    
    const token = createToken(user._id);
    return res
      .status(200)
      .json({ success: true, token, msg: "Login successful." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: e.message });
  }
};

// Route for userRegister
const UserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required." });
    }

    // Checking if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists in DB." });
    }

    // Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, msg: "Please enter a valid email." });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          msg: "Please enter a strong password (minimum 8 characters).",
        });
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
// Load environment variables from .env file
dotenv.config();

const AdminLogin = async (req, res) => {
  try {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    // Log the request body for debugging
    console.log("Request Body:", req.body);

    // Check if the email and password are defined
    if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Email and password are required" });
    }

    // Check if email and password match environment variables
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Generate a JWT token using the secret
      const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token will expire in 1 hour

      // Send the token in the response
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, msg: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default AdminLogin;



export { UserLogin, UserRegister, AdminLogin };
