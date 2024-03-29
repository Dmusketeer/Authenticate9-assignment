// authMiddleware.js
const jwt = require("jsonwebtoken");
const secretKey = process.env.TOKEN_SECRET; // Replace with your secret key

// Middleware function to verify JWT token
const isAuthorized = (req, res, next) => {
  // Get token from request header
  const token = req.headers.authorization;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  // Verify token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    // Attach user ID to request object
    req.userId = decoded.userId;
    next(); // Call next middleware function
  });
};

module.exports = { isAuthorized };
