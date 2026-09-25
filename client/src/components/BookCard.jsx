import { Link } from "react-router-dom";

const BookCard = ({ book, onAddToLibrary }) => {
  return (
    <div className="book-card">
      <div className="book-cover">
        <img
          src={book.coverImage || "https://via.placeholder.com/200x280?text=No+Cover"}
          alt={book.title}
        />
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <span className="book-category">{book.category}</span>
        <p className="book-rating">⭐ {book.rating || "N/A"}</p>

        <div className="book-actions">
          <Link to={`/books/${book._id}`} className="btn-outline-small">View Details</Link>
          <button className="btn-filled-small" onClick={() => onAddToLibrary(book._id)}>
            Add to Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
