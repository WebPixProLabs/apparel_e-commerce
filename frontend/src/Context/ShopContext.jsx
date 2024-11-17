import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL; 
  const [userId, setUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ShopContext values:", { token, userId, cartItems, products, search, showSearch });
    if (token && userId) {
      getUserCart(token);
    }
  }, [token, userId]);

  // Function to add an item to the cart
  const addToCart = async (itemId, size) => {
    // Check for selected size
    if (!size) {
        toast.error("Select Product Size");
        return;
    }
    // Update local cart state
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
        cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);

    // Check if user is authenticated
    if (token) {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response.data);
            // Success notification
            toast.success("Item added to cart");
            // Optionally, update cart state with the response data
            // setCartItems(response.data.cartData); // Uncomment if needed
        } catch (error) {
            console.error("Error adding to cart:", error.response ? error.response.data : error.message);
            // Show error notification
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // Show error from the server
            } else {
                toast.error("An error occurred while adding to the cart."); // Fallback error message
            }
        }
    } else {
        toast.success("Item added to cart successfully!"); // This will show even if token is not present
    }
};





  // Get the total count of items in the cart
  
  const getCartCount = () => {
    if (!cartItems || typeof cartItems !== 'object') {
        return 0; // Return 0 if cartItems is null, undefined, or not an object
    }

    return Object.values(cartItems).reduce((totalCount, itemSizes) => {
        // Ensure itemSizes is an object before proceeding
        if (typeof itemSizes === 'object' && itemSizes !== null) {
            return totalCount + Object.values(itemSizes).reduce((sum, quantity) => sum + (quantity || 0), 0);
        }
        return totalCount; // If itemSizes is not an object, return totalCount as is
    }, 0);
};

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    // Update the quantity
    if (quantity > 0) {
      cartData[itemId][size] = quantity;
    } else {
      // If quantity is 0, remove the item size
      delete cartData[itemId][size];
      

      // If no more sizes left for the item, remove the item itself
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    // Update the cartItems state after changes
    setCartItems(cartData);

    // If token exists, sync the changes to the backend
    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    } else if (quantity === 0) {
      toast.success("Product removed from Cart");
    }
  };

  // Calculate the total amount of the items in the cart
  const getCartAmount = () => {
    // Ensure cartItems is always an object, even if it's null or undefined
    const safeCartItems = cartItems || {};
  
    // If cartItems is empty, return 0 immediately
    if (Object.keys(safeCartItems).length === 0) {
      return 0;
    }
    
    return Object.keys(safeCartItems).reduce((totalAmount, itemId) => {
      // Find the product information using the itemId
      const itemInfo = products.find((product) => product._id === itemId);
      // If the product is found, calculate the amount for this product
      if (itemInfo) {
        // Iterate over each size and quantity in the cart
        Object.entries(safeCartItems[itemId]).forEach(([size, quantity]) => {
          totalAmount += itemInfo.price * quantity;
        });
      } else {
        console.warn(`Product with ID ${itemId} not found`);
      }
      return totalAmount;
    }, 0);
  };
  

  // Fetch product data from the backend
  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
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

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error("Failed to load cart data.");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error(error.response?.data?.message || "Error fetching cart data.");
    }
  };

  const loginUser = async (loginData) => {
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, loginData);
      const { token, userId } = response.data; // Assume the response includes userId and token
      
      setToken(token);
      setUserId(userId);
      
      // Save token and userId to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };
  
    

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      const localToken = localStorage.getItem('token');
      const localUserId = localStorage.getItem("userId");
      setToken(localToken);
      setUserId(localUserId);
      getUserCart(localToken);
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setCartItems,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    userId,
    token,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
