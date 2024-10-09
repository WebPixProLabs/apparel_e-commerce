import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import toast, { Toaster } from 'react-hot-toast';


export const backendUrl = import.meta.env.VITE_BACKEND_URL
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem("token"):'');

  useEffect (()=>{
    localStorage.setItem('token', token);
  },[token])
  return (
    <div className="bg-gray-50 min-h-screen">
    <Toaster/>
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25ox)] my-8 text-gray-800 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List />} token={token} />
                <Route path="/orders" element={<Orders  token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
