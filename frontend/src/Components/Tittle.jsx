import React from "react";

const Tittle = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-2">
      <p className="text-black">
        {text1} <span className="text-black font-medium">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  );
};

export default Tittle;
