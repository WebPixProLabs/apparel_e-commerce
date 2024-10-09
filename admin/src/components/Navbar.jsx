import React from 'react';
import Logo from "../assets/admin_assets/logomain.png";
import toast from 'react-hot-toast';

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken('');  
    toast.success('Logout Success!', {
      position: "top-center",
      duration: 2000,
    });
  };

  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
      <img src={Logo} alt="Logo" className='w-[max(10%,80px)]' />
      <button 
        onClick={handleLogout} 
        className='bg-gray-600 text-white px-5 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
