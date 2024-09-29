import React from "react";
import Logo from "../assets/frontend_assets/logomain.png";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={Logo} alt="" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            nam quidem debitis quia atque in voluptatibus aliquam officia quo
            quaerat.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-500">
            <li>Home</li>
            <li>About US</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH </p>
          <ul className="flex flex-col gap-2 text-gray-500">
            <li>+91-9150253488</li>
            <li>webpixprolabs@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          CopyRight @2024 | WEARTREN-Z | All Rights Reserved.
        </p>
        <p className="py-1 text-sm text-center">Designed By WebPixProLabs ❤️</p>
      </div>
    </div>
  );
};

export default Footer;
