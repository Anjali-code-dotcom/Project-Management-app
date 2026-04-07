// server/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // check token exists
    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // remove "Bearer "
    const actualToken = token.split(" ")[1];

    // verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;