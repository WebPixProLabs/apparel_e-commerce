import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
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
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err.message);
      return res.status(401).json({ success: false, message: "Not Authorized: Invalid or expired token" });
    }

    // Here you would typically verify if the user is an admin
    // Assuming the token payload contains a user role or similar identifier
    if (decoded.role !== "admin") { // Example role check
      return res.status(403).json({ success: false, message: "Not Authorized: Insufficient permissions" });
    }

    // If everything is fine, allow access to the next middleware
    req.user = decoded; // Attach decoded user info to the request
    next();
  });
};

export default adminAuth;
