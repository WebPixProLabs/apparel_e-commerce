import jwt from "jsonwebtoken";

const adminAuth = async(req,res,next) =>  {

  try {
    const {token} = req.headers;
    if(!token){
      return res.json({success:false,message:"not Authorized"})
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if(token_decode !== process.env.ADMIN_EMAIL && token_decode !==process.env.ADMIN_PASSWORD) {
      return res.json({success:false,message:"not Authorized"})
    }
    next()
  } catch (error) {
    console.log(error);
    return res.json({success:false,message:"not Authorized"})
  }
}

export default adminAuth;
