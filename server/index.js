// server/index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 📁 Routes
const projectRoutes = require("./routes/projectRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 🔗 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tickets", ticketRoutes);

// 🌐 Test Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// 🗄️ Connect DB
const connectDB = require("./config/db");

connectDB()
  .then(() => {
    console.log("MongoDB Connected");

    // 🚀 Start Server AFTER DB CONNECTS (important 🔥)
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Error:", err);
    process.exit(1);
  });