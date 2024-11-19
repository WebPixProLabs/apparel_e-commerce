import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch product and cart data on initial load
  useEffect(() => {
    if (token && userId) {
      getUserCart();
    }
    getProductData();
  }, []);

  // Sync token and userId on app reload
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUserId = localStorage.getItem("userId");
    if (localToken && localUserId) {
      setToken(localToken);
      setUserId(localUserId);
      getUserCart();
    }
  }, []);

  // Add to cart functionality
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
  
    const updatedCart = { ...cartItems };
    if (updatedCart[itemId]) {
      updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
    } else {
      updatedCart[itemId] = { [size]: 1 };
    }
    setCartItems(updatedCart);
    toast.success("Product added to cart");
  
    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size }, // Send only required fields
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token here
            },
          }
        );
  
        if (!response.data.success) {
          toast.error(response.data.message || "Failed to update cart on the server.");
        }
      } catch (error) {
        // console.error("Error adding item to cart:", error.message);
        // toast.error("An error occurred while adding the item to the cart.");
      }
    } 
  };
  
  

  // Update cart item quantity
  const updateQuantity = async (itemId, size, quantity) => {
    const updatedCart = { ...cartItems };
    if (quantity > 0) {
      updatedCart[itemId][size] = quantity;
    } else {
      delete updatedCart[itemId][size];
      if (Object.keys(updatedCart[itemId]).length === 0) {
        delete updatedCart[itemId];
      }
    }
    setCartItems(updatedCart);
    if (!token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/update`,
          { userId, itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!response.data.success) {
          toast.error("Failed to update cart on the server.");
        }
      } catch (error) {
        console.error("Error updating cart:", error);
        toast.error("An error occurred while updating the cart.");
      }
    } else if (quantity === 0) {
      toast.success("Product removed from cart");
    }
  };
  // Calculate total items in the cart
  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, sizes) =>
        total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
      0
    );
  };
  // Calculate total cart amount
  const getCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        total += Object.entries(cartItems[itemId]).reduce(
          (sum, [_, qty]) => sum + product.price * qty,
          0
        );
      }
      return total;
    }, 0);
  };
  // Fetch product data
  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products || []);
      } else {
        toast.error("No products available.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  };

  useEffect(()=>{
    getProductData();
  },[])

  // Fetch user cart data
  const getUserCart = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        toast.error("Failed to load cart.");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("An error occurred while loading the cart.");
    }
  };
  // User login
  const loginUser = async (loginData) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/login`,
        loginData
      );
      const { token: authToken, userId: authUserId } = response.data;
      setToken(authToken);
      setUserId(authUserId);
      localStorage.setItem("token", authToken);
      localStorage.setItem("userId", authUserId);
      toast.success("Login successful.");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed.");
    }
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    getProductData,
    getUserCart,
    navigate,
    backendUrl,
    setToken,
    token,
    userId,
    loginUser,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
