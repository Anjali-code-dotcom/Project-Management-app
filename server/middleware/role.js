// middleware/role.js

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // 🔒 Check if user exists (from auth middleware)
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized - No user found" });
      }

      // 🔒 Check if role exists in user
      if (!req.user.role) {
        return res.status(403).json({ message: "User role not defined" });
      }

      // 🔍 Check if user's role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied - insufficient permissions" });
      }

      // ✅ Allow access
      next();

    } catch (err) {
      console.error("Role middleware error:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  };
};

module.exports = checkRole;