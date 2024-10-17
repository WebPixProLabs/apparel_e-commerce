import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import Tittle from "./Tittle";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products) {
      const bestProduct = products.filter((item) => item.bestseller === true);
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="m-5">
      <div className="text-center text-3xl py-8 italic text-black">
        <Tittle text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base">
          Shop our best sellers, featuring top-rated products that combine
          quality, style, and value. Each item is carefully selected based on
          customer feedback and popularity. Explore now!
        </p>
      </div>

      {/* Product Items Rendering */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestseller.length > 0 ? (
          bestseller.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.images[0]} 
              price={item.price}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No best sellers available.
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
