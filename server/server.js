require("dotenv").config();
const express = require("express"); 
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 📁 Routes
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

// Middleware
app.use(express.json());
app.use(cors());

// 🔗 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tickets", ticketRoutes);

// Test Route
app.get("/", (_req, res) => {
  res.send("API Running...");
});

// Debug Headers (optional)
app.use((req, _res, next) => {
  console.log("HEADERS:", req.headers);
  next();
});


const startServer = async () => {
  try {
   
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });

  } catch (error) {
    console.error("❌ Server Error:", error.message);
    process.exit(1);
  }
};

startServer();