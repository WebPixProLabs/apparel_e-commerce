import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

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
const AdminLogin = async (req, res) => {
  // Implement the AdminLogin function here
};

export { UserLogin, UserRegister, AdminLogin };
