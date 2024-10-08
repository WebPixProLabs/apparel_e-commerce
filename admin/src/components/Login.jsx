import React, { useState } from 'react'
import axios from "axios";
import Logo from "../assets/admin_assets/logomain.png"
import { backendUrl } from '../App';
import toast from "react-hot-toast";
const Login = ({setToken}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async(e)=> {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', {email,password})
            if(response.data.success) {
                setToken(response.data.token);
                toast.success("Login Successful");
            } else {
                toast.error("Login Failed");
            }
        } catch (error) {
            console.log(error);
            toast.error("Login Failed");
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <div className='flex items-center justify-center'>
        <img src={Logo} alt="" className='w-[60%] object-contain py-5' />
        </div>
        <h1 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h1>
        <form onSubmit={handleSubmit}>
        <div className='mb-3 min-w-72'>
        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
        <input  onChange={(e)=> setEmail(e.target.value)} value={email} type="text" placeholder='your@email.com' required  className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'/>
        </div>
        <div className='mb-3 min-w-72'>
        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
        <input onChange={(e)=> setPassword(e.target.value)} value={password} type="text" placeholder='Enter your Password' required className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' />
        </div>
        <button type='submit' className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'> Login Button</button>
        </form>
        
        </div>
    
    </div>
  )
}

export default Login