import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../Components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.images[0]); // Fixed the typo: productData.images
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll  justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images.map((item, idx) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={idx}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink cursor-pointer"
                alt={productData.name} 
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt={productData.name} className="w-full h-auto" />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="Star rating" className="w-3 5" />
            <img src={assets.star_icon} alt="Star rating" className="w-3 5" />
            <img src={assets.star_icon} alt="Star rating" className="w-3 5" />
            <img src={assets.star_icon} alt="Star rating" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="Star rating" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes && productData.sizes.length > 0 ? ( // Ensure sizes exist
                productData.sizes.map((item, idx) => (
                  <button
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === size ? "border-orange-500" : ""
                    }`}
                    key={idx}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))
              ) : (
                <p>No sizes available</p>
              )}
            </div>
          </div>
          <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            onClick={() => addToCart(productData._id, size)}
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original Product!</p>
            <p>Cash On Delivery is available for this Product</p>
            <p>Easy Exchange and Return Policy within 7 Days</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm"> Description </b>
          <p className="border px-5 py-3 text-sm"> Reviews (122) </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Explore our diverse range of products, crafted to meet the highest
            standards of quality and design. Each item is thoughtfully created
            to enhance your lifestyle, combining functionality with modern
            aesthetics. Browse through our collections to find the perfect fit
            for your unique taste and style.
          </p>
          <p>
            E-commerce websites typically display products along with detailed
            descriptions, images, prices, and any available variations (e.g.,
            sizes, colors, materials). Each product is perfectly designed for a
            better outfit.
          </p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
