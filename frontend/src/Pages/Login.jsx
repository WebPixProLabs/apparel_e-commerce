import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin from react-oauth-google
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import toast from "react-hot-toast"; // Optional: To show toast notifications

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle Google OAuth Success Response
  const handleGoogleSuccess = (response) => {
    if (response?.credential) {
      // Decode the JWT to get user info
      const userObject = JSON.parse(atob(response.credential.split(".")[1]));
      console.log("Google User Info: ", userObject);

      if (userObject && userObject.name) {
        toast.success(`Welcome, ${userObject.name}! Login successful.`);
        navigate("/"); // Redirect to the home page after successful login
      } else {
        toast.error("User info not found.");
      }
    } else {
      toast.error("Invalid response from Google.");
    }
  };

  // Handle Google OAuth Failure Response
  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In Error: ", error);
    toast.error("Google Sign-In Failed!");
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    // Your login logic here if applicable
  };

  return (
    <>
      <form
        onSubmit={HandleOnSubmit}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {/* Show Name Input only in Signup State */}
        {currentState === "Login" ? (
          ""
        ) : (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
          />
        )}

        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          required
        />

        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
        />

        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot Password</p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Signup")}
              className="cursor-pointer"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer"
            >
              Login Here
            </p>
          )}
        </div>

        <button className="bg-black text-white font-light px-8 py-2 mt-4">
          {currentState === "Login" ? "Sign-in" : "Sign-up"}
        </button>

        {/* Google Login Button Integration */}
        <div className="mt-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>
      </form>
    </>
  );
};

export default Login;
