import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets.js";
import toast from 'react-hot-toast';

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
   
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to cart successfully!");
  };

  const getCartCount = () => {
    let totalcount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalcount += cartItems[items][item];
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    return totalcount;
  };


  const updateQuantity = async(itemId, size, quantity) => {

    let cartData = structuredClone (cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (quantity === 0) {
      toast.success("Product removed from Cart");
      // Optionally, remove the size key if needed for a cleaner structure
      delete cartData[itemId][size];
      // Remove item if all sizes are empty
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
  }
}
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
    updateQuantity
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
