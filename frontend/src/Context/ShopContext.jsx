import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure this is set correctly
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Function to add an item to the cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    // Clone current cart items
    let cartData = structuredClone(cartItems);
    // Update quantity in the cart
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);
    toast.success("Item added to cart successfully!");
  };

  // Get the total count of items in the cart
  const getCartCount = () => {
    return Object.values(cartItems).reduce((totalCount, itemSizes) => {
      return totalCount + Object.values(itemSizes).reduce((sum, quantity) => sum + quantity, 0);
    }, 0);
  };

  // Function to update item quantity in the cart
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (quantity === 0) {
      toast.success("Product removed from Cart");
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }
  };

  // Calculate the total amount of the items in the cart
  const getCartAmount = () => {
    return Object.keys(cartItems).reduce((totalAmount, itemId) => {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        Object.entries(cartItems[itemId]).forEach(([size, quantity]) => {
          totalAmount += itemInfo.price * quantity;
        });
      }
      return totalAmount;
    }, 0);
  };

  // Fetch product data from the backend
  const getProductData = async () => {
    try {
      console.log("Backend URL:", backendUrl); // Log the URL
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log("API Response:", response.data);
      
      // Check if the response is successful
      if (response.data.success && response.data.products) {
        setProducts(response.data.products);
        toast.success("Products fetched successfully!");
      } else {
        toast.error("No products available.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  };

  // Fetch product data when the component mounts
  useEffect(() => {
    getProductData();
  }, []);

  // Context value to be provided to the children components
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
