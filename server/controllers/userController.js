const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 🔐 Generate JWT Token (safe)
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "defaultsecret", // ✅ prevents crash
    { expiresIn: "7d" }
  );
};

// ================= REGISTER USER =================
exports.registerUser = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body); // 🔍 debug

    const { name, email, password } = req.body;

    // ✅ Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({ message: "User not created" });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// ================= LOGIN USER =================
exports.loginUser = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body); // 🔍 debug

    const { email, password } = req.body;

    // ✅ Validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔍 Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }
};

// ================= GET USER PROFILE =================
exports.getUserProfile = async (req, res) => {
  try {
    // ✅ Safety check
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("PROFILE ERROR:", error);
    res.status(500).json({
      message: "Server error fetching profile",
      error: error.message,
    });
  }
};

// ================= GET ALL USERS =================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);

  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({
      message: "Server error fetching users",
      error: error.message,
    });
  }
};