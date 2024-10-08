import React from 'react'
import Logo from "../assets/admin_assets/logomain.png"

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
    <img src={Logo} alt="" className='w-[max(10%,80px)]' />
    <button className='bg-gray-600 text-white px-5 sm:px-7 sm:py-2 rouded-full text-xs sm:text-sm rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar