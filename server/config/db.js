const mongoose = require("mongoose");

const connectDB = async () => {
  let retries = 5;

  while (retries) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4, // 👈 important (IPv4 force)
      });

      console.log("✅ MongoDB Connected");
      break;

    } catch (error) {
      console.log("❌ MongoDB Error:", error.message);

      retries--;
      console.log(`Retrying... (${retries} left)`);

      await new Promise(res => setTimeout(res, 5000));
    }
  }

  if (!retries) {
    console.log("❌ Could not connect to MongoDB after retries");
    process.exit(1);
  }
};

module.exports = connectDB;