import React from 'react'
import Tittle from "../Components/Tittle"

const PlaceOrder = () => {
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
    
    </div>
  )
}

export default PlaceOrder