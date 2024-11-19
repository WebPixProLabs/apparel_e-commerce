import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHdlYXJ0cmVuei5jb20iLCJwYXNzd29yZCI6ImFkbWluMTIzNCIsImlhdCI6MTcyODU1ODA1MiwiZXhwIjoxNzI4NTYxNjUyfQ.4B1dAzq994ODxV2WuEHPyxLmT2fgC7nSDo6X_dK78C4";

const List = ({token}) => {
  const [list, setList] = useState([]);

  // Fetch the product list
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      if (response.data.success) {
        setList(response.data.products);
        toast.success("Product Fetching Successful");
      } else {
        toast.error("Error Fetching Products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Listing Product");
    }
  };

  // Remove a product
  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message || "Failed to remove product");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error(error.response?.data?.message || error.message || "An error occurred");
    }
  };
  
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-3">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.length > 0 ? (
          list.map((item, idx) => (
            <div key={idx} className="md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
              {/* Display the first image from the images array */}
              <img
                src={item.images?.[0] || "https://via.placeholder.com/50"} // Fallback image
                alt={item.name}
                className="w-16 h-16 object-cover"
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <button onClick={() => removeProduct(item._id)} className="text-red-500">
                X
              </button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </>
  );
};

export default List; 
