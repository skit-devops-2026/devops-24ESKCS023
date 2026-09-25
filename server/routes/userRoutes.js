const express = require("express");
const router = express.Router();
const { getUsers, getDashboardStats } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", protect, adminOnly, getUsers);
router.get("/dashboard-stats", protect, adminOnly, getDashboardStats);

module.exports = router;
