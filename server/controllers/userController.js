const User = require("../models/User");
const Book = require("../models/Book");
const Library = require("../models/Library");

// @route GET /api/users (admin only) - list all users, no passwords
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch users" });
  }
};

// @route GET /api/users/dashboard-stats (admin only)
const getDashboardStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalCategories = (await Book.distinct("category")).length;
    const totalReadingRecords = await Library.countDocuments();

    const recentBooks = await Book.find().sort({ createdAt: -1 }).limit(5);
    const recentUsers = await User.find().select("-password").sort({ createdAt: -1 }).limit(5);

    res.json({ totalBooks, totalUsers, totalCategories, totalReadingRecords, recentBooks, recentUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch dashboard stats" });
  }
};

module.exports = { getUsers, getDashboardStats };
