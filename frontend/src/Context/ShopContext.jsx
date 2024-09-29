import React, { createContext } from "react";
import { products } from "../assets/frontend_assets/assets.js"; 

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;

  
  const value = {
    products,
    currency,
    delivery_fee,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};
