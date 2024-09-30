import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={()=> setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2 ">
          FILTERS
          <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>
        
        {/* Category Filter */}
        <div
          className={`border sm:block border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? " " : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Men"} /> Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Women"} /> Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Kids"} /> Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}

        <div
          className={`border sm:block border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? " " : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"TopWear"} /> TopWear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"BottomWear"} /> BottomWear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"WinterWear"} /> WinterWear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      
    </div>
  );
};

export default Collection;
