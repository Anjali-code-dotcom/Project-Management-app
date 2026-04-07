const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    });

    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.log("DB Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;