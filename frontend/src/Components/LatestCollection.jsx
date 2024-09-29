import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'

const LatestCollection = () => {

    const Products = useContext(ShopContext)
    console.log(Products);
  return (
    <div>LatestCollection</div>
  )
}

export default LatestCollection