// cartController.js
import userModel from "../models/userModel.js"
// Function to add items to the cart
export const addToCart = async (req, res) => {
    // Function implementation here
    try {
        const {userId, itemId, size} = req.body
        const userData = await userModel.findById(userId);
        const cartData  = await userData.cartData
        if (cartData[itemId]) {
            if(cartData[itemId,size]){
                cartData[itemId,size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.status(200).json({success:true,message: 'Items added to cart'})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message: 'Error adding item to cart'})
    }
};

// Function to update the cart
export const updateCart = async (req, res) => {
    // Function implementation here
    try {
        const { userId,itemId,size, quantity} = req.body

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.status(200).json({success:true,message: 'cart Updated'})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message: 'Error adding item to cart'})
    }
};

// Function to get user cart data
export const getUserCart = async (req, res) => {
    // Function implementation here
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        res.status(200).json({success:true, cartData});

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message: 'Error adding item to cart'})
    }
};
