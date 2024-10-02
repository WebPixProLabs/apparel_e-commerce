import React from 'react'
import Tittle from '../Components/Tittle'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetter from '../Components/NewsLetter'

const Contact = () => {
  return (
    <div>
    <div className='text-center text-2xl pt-10 border-t'>
    <Tittle text1={'CONTACT'} text2={'US'} />
    </div>

    <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
    <img src={assets.contact_img} alt="" className='w-full md:max-w-[480px]' />
    <div className='flex flex-col justify-center items-start gap-6 '>
    <p className='font-semibold text-xl text-gray-600'>Our Store</p>
    <p className='text-gray-500'>3/374 Ganga Nagar, Gowri Amman Industries Back Side <br /> Pattraimedu,Namakkal 637002</p>
    <p className='text-gray-500'>+91-9150253488 <br /> contact@weartren-z.com</p>
    <p className='font-semibold text-xl text-gray-600'>Carrers at WearTren-Z</p>
    <p className='text-gray-500'>Learn More About Our Team and Job Openings!</p>
    <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>EXPLORE JOBS </button>
    </div>
    </div>
    <NewsLetter/>
    </div>
  )
}

export default Contact