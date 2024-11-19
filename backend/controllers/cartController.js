import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Add to Cart Function
export const addToCart = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid token: userId not found" });
    }
    const { itemId, size } = req.body;
    if (!itemId || !size) {
      return res.status(400).json({
        success: false,
        message: "Invalid request: Missing itemId or size",
      });
    }
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let cartData = userData.cartData || {};
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res
      .status(200)
      .json({ success: true, message: "Added to cart successfully", cartData });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update Cart Function
export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    if (!userId || !itemId || !size || quantity === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request: Missing fields" });
    }
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let cartData = userData.cartData || {};
    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      cartData[itemId][size] = quantity;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Item not found in cart" });
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res
      .status(200)
      .json({ success: true, message: "Cart updated successfully", cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating cart" });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userIds = ["6703652ea159a4420ec3940d", "67111caafb39a9638e0b11ac"];
    const cartsData = [];
    for (const userId of userIds) {
      const userData = await userModel.findById(userId).lean();
      if (!userData) {
        cartsData.push({ userId, success: false, message: "User not found" });
        continue;
      }
      const cartData = userData.cartData || {};
      cartsData.push({ userId, success: true, cartData });
    }
    res.status(200).json({ success: true, cartsData });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching cart data" });
  }
};
