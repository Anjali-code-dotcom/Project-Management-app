const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected
router.get("/profile", authMiddleware, getUserProfile);
router.get("/", authMiddleware, getAllUsers);

module.exports = router;