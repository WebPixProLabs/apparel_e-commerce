import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Tittle from "../Components/Tittle";
import axios from "axios";

const Order = () => {
  const { backendUrl, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTExY2FhZmIzOWE5NjM4ZTBiMTFhYyIsImlhdCI6MTczMTI0NjkwNH0.M--EHI76y-oHhIhD3yvTZkESwLxwEL-t1mlQdOpPqEU";
  const userId = "67111caafb39a9638e0b11ac";

  // Function to load order data
  

  

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Tittle text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.length > 0 ? (
          orderData.map((order, idx) => (
            <div
              key={order._id}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                {/* Display items inside the order */}
                {order.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start gap-6 text-sm">
                    <img src={item.images?.[0] || ""} alt="" className="w-16 sm:w-20" />
                    <div>
                      <p className="sm:text-base font-medium">{item.name}</p>
                      <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                        <p className="text-lg">
                          {currency} {item.price}
                        </p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                      <p className="mt-2">
                        Date: <span className="text-gray-400">{new Date(order.date).toLocaleDateString()}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{order.status}</p>
                </div>
                <button className="bg-black text-white border px-4 py-2 text-sm font-medium">
                  TRACK ORDER
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
