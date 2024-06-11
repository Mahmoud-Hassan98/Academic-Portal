const jwt = require("jsonwebtoken");
require("dotenv").config();

// This middleware will only continue if the token is present in the request headers

module.exports = function (req, res, next) {
  // Get token from header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the JWT token from the authorization header
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  // Verify token
  try {
    const decodedToken = jwt.verify(token, process.env.jwtSecret); // Verify the JWT token
    const user = decodedToken; // Extract the user ID from the token payload
    if (user) {
      delete user.exp;
      delete user.iat;
      req.user = user;
    }
    // Assign the userId to req.userId
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
