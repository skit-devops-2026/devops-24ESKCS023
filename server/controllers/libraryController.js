const Library = require("../models/Library");
const Book = require("../models/Book");

// @route GET /api/library - get logged-in user's library
const getMyLibrary = async (req, res) => {
  try {
    const entries = await Library.find({ userId: req.user.id }).populate("bookId");
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch your library" });
  }
};

// @route POST /api/library - add a book to library
const addToLibrary = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const existing = await Library.findOne({ userId: req.user.id, bookId });
    if (existing) {
      return res.status(400).json({ message: "Already in My Library" });
    }

    const entry = await Library.create({ userId: req.user.id, bookId });
    res.status(201).json({ message: "Book added to My Library", entry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not add book to library" });
  }
};

// @route PUT /api/library/:bookId - update reading status
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Want to Read", "Currently Reading", "Completed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const entry = await Library.findOneAndUpdate(
      { userId: req.user.id, bookId: req.params.bookId },
      { status },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ message: "Book not found in your library" });
    }

    res.json({ message: "Reading status updated", entry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not update status" });
  }
};

// @route DELETE /api/library/:bookId - remove from library
const removeFromLibrary = async (req, res) => {
  try {
    const entry = await Library.findOneAndDelete({
      userId: req.user.id,
      bookId: req.params.bookId
    });

    if (!entry) {
      return res.status(404).json({ message: "Book not found in your library" });
    }

    res.json({ message: "Book removed from My Library" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not remove book" });
  }
};

module.exports = { getMyLibrary, addToLibrary, updateStatus, removeFromLibrary };
