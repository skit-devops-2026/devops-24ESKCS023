import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/books/${id}`).then((res) => setBook(res.data));
  }, [id]);

  const handleAddToLibrary = async () => {
    if (!user) {
      setMessage("Please login to add books to your library.");
      return;
    }
    try {
      await api.post("/library", { bookId: id });
      setMessage("Book added to My Library!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not add book.");
    }
  };

  const handleRead = () => {
    if (book.pdfUrl) {
      window.open(book.pdfUrl, "_blank");
    } else {
      setMessage("Reading file is currently unavailable.");
    }
  };

  if (!book) return <div className="page-loading">Loading...</div>;

  return (
    <div className="page-container book-details">
      {message && <div className="toast">{message}</div>}

      <Link to="/books" className="btn-outline-small">← Back to Books</Link>

      <div className="book-details-layout">
        <img
          src={book.coverImage || "https://via.placeholder.com/300x420?text=No+Cover"}
          alt={book.title}
          className="book-details-cover"
        />

        <div className="book-details-info">
          <h1>{book.title}</h1>
          <p className="book-details-author">by {book.author}</p>
          <span className="book-category">{book.category}</span>

          <p className="book-details-description">{book.description}</p>

          <ul className="book-meta-list">
            <li><strong>Publication Year:</strong> {book.publicationYear || "N/A"}</li>
            <li><strong>ISBN:</strong> {book.isbn || "N/A"}</li>
            <li><strong>Pages:</strong> {book.pages || "N/A"}</li>
            <li><strong>Language:</strong> {book.language || "N/A"}</li>
            <li><strong>Rating:</strong> ⭐ {book.rating || "N/A"}</li>
            <li><strong>Added:</strong> {new Date(book.createdAt).toLocaleDateString()}</li>
          </ul>

          <div className="book-details-actions">
            <button className="btn-filled" onClick={handleRead}>Read Book</button>
            <button className="btn-outline" onClick={handleAddToLibrary}>Add to My Library</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
