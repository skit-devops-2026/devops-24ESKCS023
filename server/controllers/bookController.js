const Book = require("../models/Book");

// @route GET /api/books
// supports search, filter, sort, pagination via query params
const getBooks = async (req, res) => {
  try {
    const { search, category, author, minRating, sort, page = 1, limit = 12 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ];
    }

    if (category) query.category = category;
    if (author) query.author = { $regex: author, $options: "i" };
    if (minRating) query.rating = { $gte: Number(minRating) };

    let sortOption = { createdAt: -1 }; // newest first by default
    if (sort === "title-asc") sortOption = { title: 1 };
    if (sort === "title-desc") sortOption = { title: -1 };
    if (sort === "rating-desc") sortOption = { rating: -1 };
    if (sort === "newest") sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [books, total] = await Promise.all([
      Book.find(query).sort(sortOption).skip(skip).limit(limitNum),
      Book.countDocuments(query)
    ]);

    res.json({
      books,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch books" });
  }
};

// @route GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(404).json({ message: "Book not found" });
  }
};

// @route POST /api/books (admin only)
const createBook = async (req, res) => {
  try {
    const {
      title, author, category, description, coverImage,
      publicationYear, isbn, pages, language, rating, pdfUrl
    } = req.body;

    if (!title || !author || !category) {
      return res.status(400).json({ message: "Title, author and category are required" });
    }

    const book = await Book.create({
      title, author, category, description, coverImage,
      publicationYear, isbn, pages, language, rating, pdfUrl
    });

    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not add book" });
  }
};

// @route PUT /api/books/:id (admin only)
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book updated successfully", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not update book" });
  }
};

// @route DELETE /api/books/:id (admin only)
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not delete book" });
  }
};

// @route GET /api/books/meta/stats (used by homepage + admin dashboard)
const getStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const categories = await Book.distinct("category");
    res.json({ totalBooks, totalCategories: categories.length, categories });
  } catch (error) {
    res.status(500).json({ message: "Could not fetch stats" });
  }
};

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook, getStats };
