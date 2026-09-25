const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  status: {
    type: String,
    enum: ["Want to Read", "Currently Reading", "Completed"],
    default: "Want to Read"
  },
  addedAt: { type: Date, default: Date.now }
});

// a user cannot add the same book twice
librarySchema.index({ userId: 1, bookId: 1 }, { unique: true });

module.exports = mongoose.model("Library", librarySchema);
