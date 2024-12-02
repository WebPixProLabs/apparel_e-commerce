import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import toast from "react-hot-toast"; // Optional: To show toast notifications
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");  
  

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Signup") { // Use === for comparison
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        console.log(response);
        toast.success("Registration successful");

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
            // Optionally, store userId if available
            if (response.data.userId) {
              localStorage.setItem("userId", response.data.userId);
            }
        } else {
          toast.error(response.data.message);
        }
      } else { // Handle the login state
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        console.log(response);
        toast.success("Login successful");
        setToken(response.data.token); // Example of setting token
        localStorage.setItem("token", response.data.token);
        // Optionally, store userId if available
        if (response.data.userId) {
          localStorage.setItem("userId", response.data.userId);
        }
        navigate("/"); // Redirect after login
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  useEffect(()=>{
    if(token) {
      navigate('/');
    }
  },[token])

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  
  return (
    <>
      <form
        onSubmit={HandleOnSubmit}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
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
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        )}

        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
      </form>
    </>
  );
};

export default Login;
