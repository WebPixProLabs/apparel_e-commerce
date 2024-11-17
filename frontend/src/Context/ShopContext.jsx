import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
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

  // Load initial cart and product data
  useEffect(() => {
    if (token && userId) {
      getUserCart(token);
    }
    getProductData();
  }, [token, userId]);

  // Sync token and userId from local storage on app reload
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUserId = localStorage.getItem("userId");
    if (localToken && localUserId && (!token || !userId)) {
      setToken(localToken);
      setUserId(localUserId);
      getUserCart(localToken);
    }
  }, [token, userId]);

  // Add to cart functionality
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
  
    // Clone the cartItems to update the state
    let cartData = structuredClone(cartItems);
  
    // Add or update the cartData
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
  
    // Update the local state
    setCartItems(cartData);
  
    // If user is logged in (token exists), send the update to the server
    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/add`,
          { userId, itemId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Ensure the response structure is as expected
        if (response.data.success) {
          toast.success("Item added to cart");
        } else {
          toast.error("Error adding item to cart: " + response.data.message);
        }
      } catch (error) {
        console.error("Error adding to cart:", error.response?.data || error.message);
        toast.error("An error occurred while adding to the cart.");
      }
    } else {
      // If user is not logged in, show success message locally
      toast.success("Item added to cart successfully!");
    }
  };
  

  // Update cart quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = { ...cartItems };

    // Update cart items data
    if (quantity > 0) {
      cartData[itemId][size] = quantity;
    } else {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);

    // Sync with backend if user is logged in
    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/update`,
          { userId, itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          toast.success("Cart updated");
        } else {
          toast.error(response.data.message || "Error updating cart");
        }
      } catch (error) {
        console.error("Error updating cart:", error.response?.data || error.message);
        toast.error("Error updating cart data.");
      }
    } else if (quantity === 0) {
      toast.success("Product removed from Cart");
    }
  };

  // Calculate cart total items
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, sizes) =>
      total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0), 0);
  };

  // Calculate total cart amount
  const getCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        Object.entries(cartItems[itemId]).forEach(([size, qty]) => {
          total += product.price * qty;
        });
      }
      return total;
    }, 0);
  };

  // Fetch product data
  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success && response.data.products) {
        setProducts(response.data.products);
        toast.success("Products loaded.");
      } else {
        toast.error("No products available.");
      }
    } catch (error) {
      console.error("Product fetch error:", error);
      toast.error("Failed to fetch products.");
    }
  };

  // Fetch user cart
  const getUserCart = async (authToken) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        toast.error("Unable to load cart.");
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
      toast.error("Failed to load cart data.");
    }
  };

  // User login
  const loginUser = async (loginData) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, loginData);
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

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
