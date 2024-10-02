import React, { useContext, useState } from 'react'
import Tittle from "../Components/Tittle"
import CartTotal from "../Components/CartTotal"
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../Context/ShopContext'


const PlaceOrder = () => {

  const [method, setMethod] = useState("COD");
  const { navigate } = useContext(ShopContext);
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Tittle text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="email" placeholder='Enter Your Email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3'>
          <input type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input type="number" placeholder='Zip Code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="number" placeholder='Phone Number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
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
            <button className='bg-black text-white px-16 py-3 text-sm' onClick={() => navigate('/orders')}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder