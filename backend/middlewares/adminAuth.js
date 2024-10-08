import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // Extract the token from the 'Authorization' header
    const authHeader = req.headers['authorization'];

    // Check if the 'Authorization' header exists
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Not Authorized: No token provided" });
    }

    // Split the header to extract the token part: 'Bearer <token>'
    const token = authHeader.split(' ')[1];

    // If the token is not correctly formatted or missing
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized: Malformed token" });
    }

    // Verify the token using the JWT secret
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Verify if the decoded token contains the correct admin credentials
    if (token_decode.email !== process.env.ADMIN_EMAIL || token_decode.password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Not Authorized: Invalid token" });
    }

    // If everything is fine, allow access to the next middleware
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};

export default adminAuth;
