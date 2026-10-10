import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

// Shows a book's PDF inside our own website (with the navbar and footer around it)
const Reader = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/books/${id}`)
      .then((res) => setBook(res.data))
      .catch(() => setError("Book not found."));
  }, [id]);

  if (error) {
    return (
      <div className="page-container">
        <p className="empty-state">{error}</p>
        <Link to="/books" className="btn-outline-small">← Back to Books</Link>
      </div>
    );
  }

  if (!book) return <div className="page-loading">Loading...</div>;

  return (
    <div className="page-container">
      <div className="admin-header-row">
        <div>
          <h1 className="page-title" style={{ marginBottom: "0.2rem" }}>{book.title}</h1>
          <p style={{ color: "var(--text-muted)" }}>by {book.author}</p>
        </div>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <Link to={`/books/${book._id}`} className="btn-outline-small">← Back to Book</Link>
          {book.pdfUrl && (
            <a href={book.pdfUrl} target="_blank" rel="noreferrer" className="btn-outline-small">
              Open in new tab
            </a>
          )}
        </div>
      </div>

      {book.pdfUrl ? (
        <iframe
          title={book.title}
          src={book.pdfUrl}
          style={{
            width: "100%",
            height: "calc(100vh - 230px)",
            minHeight: "500px",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            background: "#fff"
          }}
        />
      ) : (
        <p className="empty-state">Reading file is currently unavailable.</p>
      )}
    </div>
  );
};

export default Reader;
