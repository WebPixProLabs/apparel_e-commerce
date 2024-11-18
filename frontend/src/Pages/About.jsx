import React from "react";
import Tittle from "../Components/Tittle";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetter from "../Components/NewsLetter";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-2xl text-center pt-8 border-t">
        <Tittle text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-10 md:gap-16">
        <img
          src={assets.about_img}
          alt="About Us"
          className="w-full max-w-[400px] rounded object-cover"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className="text-base sm:text-lg leading-relaxed">
            At our core, we believe in delivering <strong>quality</strong> and
            <strong>innovation</strong>. Our journey began with a passion for
            excellence, and every product we create reflects our commitment to
            bringing you the best.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            We understand the hustle and bustle of modern life. That’s why we
            strive to make your experience seamless, allowing you to focus on
            what truly matters while we take care of the rest.
            <strong>Your convenience is our mission!</strong>
          </p>
          <b className="text-gray-800 text-lg md:text-xl">Our Mission</b>
          <p className="text-base sm:text-lg leading-relaxed">
            To transform your vision into reality with unparalleled service and
            dedication. <strong>Join us on this journey!</strong>
          </p>
        </div>
      </div>

      <div className="text-2xl py-7 text-center">
        <Tittle text1={"WHY"} text2={"CHOSE US ?"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-6 md:px-10 lg:px-16 py-6 sm:py-8 flex flex-col gap-5 shadow-md rounded-lg">
          <b className="text-xl">Quality Assurance</b>
          <p className="text-gray-600">
            Experience the perfect blend of <strong>quality</strong> and
            <strong>affordability</strong>. Our rigorous quality checks ensure
            that you receive only the finest products tailored to your needs.
          </p>
        </div>
        <div className="border px-6 md:px-10 lg:px-16 py-6 sm:py-8 flex flex-col gap-5 shadow-md rounded-lg">
          <b className="text-xl">Convenience</b>
          <p className="text-gray-600">
            We prioritize your time. Enjoy a shopping experience that’s not only
            <strong>hassle-free</strong> but also <strong>delightful</strong>.
            Your satisfaction is just a click away!
          </p>
        </div>
        <div className="border px-6 md:px-10 lg:px-16 py-6 sm:py-8 flex flex-col gap-5 shadow-md rounded-lg">
          <b className="text-xl">Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our dedicated team is always here for you, providing
            <strong>personalized support</strong> to ensure your needs are met.
            We don’t just sell products; we build relationships!
          </p>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default About;
