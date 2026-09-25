const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, default: "" },
  coverImage: { type: String, default: "" },
  publicationYear: { type: Number },
  isbn: { type: String, default: "" },
  pages: { type: Number },
  language: { type: String, default: "English" },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  pdfUrl: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Book", bookSchema);
