const express = require("express");
const router = express.Router();
const {
  getMyLibrary, addToLibrary, updateStatus, removeFromLibrary
} = require("../controllers/libraryController");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getMyLibrary);
router.post("/", protect, addToLibrary);
router.put("/:bookId", protect, updateStatus);
router.delete("/:bookId", protect, removeFromLibrary);

module.exports = router;
