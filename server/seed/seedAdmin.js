// Run with: npm run seed-admin
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ email: "admin@digitallibrary.com" });
    if (existingAdmin) {
      console.log("Admin account already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Library Admin",
      email: "admin@digitallibrary.com",
      password: hashedPassword,
      role: "admin",
      isVerified: true // admin is created directly, so no OTP step is needed
    });

    console.log("Admin account created successfully!");
    console.log("Email: admin@digitallibrary.com");
    console.log("Password: Admin@123");
    console.log("IMPORTANT: Change this password after logging in for real deployment.");
    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
