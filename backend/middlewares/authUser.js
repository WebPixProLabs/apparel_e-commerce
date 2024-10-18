// authUser.js

import jwt from 'jsonwebtoken'; // Assuming you are using JWT for authentication

const authUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get the token from the header

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded; // Attach the decoded token data to the request
        next(); // Move to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

export default authUser;
