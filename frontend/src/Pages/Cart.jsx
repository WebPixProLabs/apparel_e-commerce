import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Tittle";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../Components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Create a temporary array to store cart data
    const tempData = [];

    // Iterate through cart items to extract product details
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          // Find the product details from the products array
          const product = products.find((item) => item._id === productId);

          if (product) {
            tempData.push({
              _id: productId,
              size: size,
              quantity: cartItems[productId][size],
              name: product.name,
              price: product.price,
              image: product.image[0], // Assuming product.image is an array
            });
          }
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, idx) => {
          return (
            <div
              key={idx}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img src={item.image} alt="" className="w-16 sm:w-20" />
                <div>
                  <p className="text-sm sm:text-lg font-medium">{item.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              {/* Quantity input field */}
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              />
              {/* Delete button */}
              <img
                src={assets.bin_icon}
                alt="Delete"
                className="w-4 sm:w-5 cursor-pointer"
                onClick={() => {
                  updateQuantity(item._id, item.size, 0);
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
      <div className="w-full sm:w-[450px]">
      <CartTotal/>
      </div>
      </div>
    </div>
  );
};

export default Cart;
