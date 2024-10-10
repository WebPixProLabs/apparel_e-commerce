import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  // Extract the token from the 'Authorization' header
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Not Authorized: No token provided" });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized: Malformed token" });
  }

  // Verify the token using the JWT secret
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err.message);
      return res.status(401).json({ success: false, message: "Not Authorized: Invalid or expired token" });
    }

    // Check if the decoded token has the role attribute
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not Authorized: Insufficient permissions" });
    }

    req.user = decoded; // Attach decoded user info to the request
    next();
  });
};

export default adminAuth;
