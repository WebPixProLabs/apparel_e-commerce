import React, { useContext, useState } from 'react'
import Tittle from "../Components/Tittle"
import CartTotal from "../Components/CartTotal"
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../Context/ShopContext'
import toast from "react-hot-toast";



const PlaceOrder = () => {
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [method, setMethod] = useState("COD");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData (data => ({...data,[name]: value }))
  }
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          const quantity = cartItems[itemId][size];
          if (quantity > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === itemId));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = quantity;
              orderItems.push(itemInfo);
            }
          }
        }
      }
      console.log(orderItems);
      // Add code for submitting the order data to the backend
      
    } catch (error) {
      console.log(error);
      toast.error("Unexpected Error");
    }
  };
 
  return (
    <form onSubmit={handleOnSubmit} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Tittle text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={handleOnChange} name='firstName' value={formData.firstName} required />
          <input type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={handleOnChange} name='lastName' value={formData.lastName} required />
        </div>
        <input type="email" placeholder='Enter Your Email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={handleOnChange} name='email' value={formData.email} required/>
        <input type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={handleOnChange} name='street' value={formData.street} required/>
        <div className='flex gap-3'>
          <input type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={handleOnChange} name='city' value={formData.city} required />
          <input type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={handleOnChange} name='state' value={formData.state} required/>
        </div>
        <div className='flex gap-3'>
          <input type="number" placeholder='Zip Code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={handleOnChange} name='zipCode' value={formData.zipCode} required/>
          <input type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={handleOnChange} name='country' value={formData.country} required/>
        </div>
        <input type="number" placeholder='Phone Number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={handleOnChange} name='phone' value={formData.phone}  required/>
      </div>

      {/* Payment Details */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Tittle text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div className='flex items-center border gap-3 p-2 px-3 cursor-pointer' onClick={() => setMethod("stripe")}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : " "}`}></p>
              <img src={assets.stripe_logo} alt="" className='h-4 mx-4' />
            </div>
            <div className='flex items-center border gap-3 p-2 px-3 cursor-pointer' onClick={() => setMethod("razorpay")}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : " "}`}></p>
              <img src={assets.razorpay_logo} alt="" className='h-4 mx-4' />
            </div>
            <div className='flex items-center border gap-3 p-2 px-3 cursor-pointer' onClick={() => setMethod("cod")}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-900 text-sm font-medium mx-4'>Cash On Delivery</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder