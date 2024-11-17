// import jwt from "jsonwebtoken";

// const adminAuth = async(req,res,next) =>  {

//   try {
//     const {token} = req.headers;
//     console.log(token);
//     if(!token){
//       return res.json({success:false,message:"not Authorized"})
//     }
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     if(token_decode !== process.env.ADMIN_EMAIL + token_decode !==process.env.ADMIN_PASSWORD) {
//       return res.json({success:false,message:"not Authorized"})
//     }
//     next()
//   } catch (error) {
//     console.log(error);
//     return res.json({success:false,message:"not Authorized"})
//   }
// }

// export default adminAuth;



import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ success: false, message: "Not authorized. Token missing." });
    }

    // Extract the token
    const token = authorizationHeader.split(" ")[1]; // "Bearer <token>"

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the token belongs to the admin
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Not authorized. Invalid admin credentials." });
    }

    req.user = decoded; // Pass user info to the next middleware
    next();
  } catch (error) {
    console.error("Error in adminAuth middleware:", error);

    // Handle token errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token has expired." });
    }
    return res.status(403).json({ success: false, message: "Token validation failed." });
  }
};

export default adminAuth;





