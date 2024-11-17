import React, { useState } from 'react';
import axios from "axios";
import Logo from "../assets/admin_assets/logomain.png";
import { backendUrl } from '../App';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize navigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make API call to login endpoint
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password },{headers: {
                'Content-Type': 'application/json',
            }});
    
            // Check if login was successful
            if (response.data && response.data.success) {
                const { token, refreshToken } = response.data; // Assuming the response contains `token` and `refreshToken`
    
                // Store the tokens in localStorage or sessionStorage
                localStorage.setItem("accessToken", token);
                localStorage.setItem("refreshToken", refreshToken);
    
                // Set token in state if needed and display success message
                setToken(token); // If you’re managing token in component state
                toast.success("Login Successful");
    
                // Redirect to admin dashboard or a secure route
                navigate('/list'); // Use navigate() to change route
            } else {
                // Display error toast if login failed
                toast.error(response.data.msg || "Login Failed");
            }
        } catch (error) {
            // Improve error handling by checking if error response exists
            const errorMsg = error.response?.data?.msg || "An unexpected error occurred. Please try again.";
            console.error("Error response:", error.response); // For debugging purposes
            toast.error(errorMsg);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <div className='flex items-center justify-center'>
                    <img src={Logo} alt="Admin Logo" className='w-[60%] object-contain py-5' />
                </div>
                <h1 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3 min-w-72'>
                        <label htmlFor="email" className='text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            id="email"
                            type="email" // Changed to "email" for validation
                            placeholder='your@email.com'
                            required
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                        />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <label htmlFor="password" className='text-sm font-medium text-gray-700 mb-2'>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            id="password"
                            type="password"
                            placeholder='Enter your Password'
                            required
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                        />
                    </div>
                    <button type='submit' className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
