const express = require("express");
const router = express.Router();
const {
  getBooks, getBookById, createBook, updateBook, deleteBook, getStats
} = require("../controllers/bookController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", getBooks);
router.get("/meta/stats", getStats);
router.get("/:id", getBookById);

router.post("/", protect, adminOnly, createBook);
router.put("/:id", protect, adminOnly, updateBook);
router.delete("/:id", protect, adminOnly, deleteBook);

module.exports = router;
