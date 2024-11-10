import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    // Extract token from the 'Authorization' header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not Authorized to Login" });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    // Verify and decode the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          // Token has expired, send appropriate message
          return res.status(401).json({ success: false, message: "Token has expired, please login again" });
        }
        // Other token errors
        return res.status(401).json({ success: false, message: "Invalid Credentials, Login Again" });
      }

      // Check admin credentials from decoded token
      if (decoded.email !== process.env.ADMIN_EMAIL || decoded.password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, message: "Invalid Credentials, Login Again" });
      }

      // Proceed if token is valid and matches admin credentials
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ success: false, message: "Server error during authentication" });
  }
};

export default adminAuth;
