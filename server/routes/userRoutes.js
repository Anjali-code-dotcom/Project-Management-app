const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 🔐 Middleware (Protect Routes)
const protect = (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultsecret"
    );

    req.user = decoded.id; // store user id
    next();

  } catch (error) {
    console.error("AUTH ERROR:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


// ================= GET PROFILE (LOGGED IN USER) =================
// ⚠️ MUST BE ABOVE "/:id"
router.get("/profile/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("PROFILE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// ================= GET ALL USERS =================
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);

  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// ================= GET SINGLE USER =================
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("GET USER ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// ================= UPDATE USER =================
router.put("/:id", protect, async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// ================= DELETE USER =================
router.delete("/:id", protect, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;