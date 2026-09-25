import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";

const categories = [
  "Programming", "Computer Science", "Technology", "Science",
  "Mathematics", "History", "Fiction", "Business", "Literature"
];

const Books = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "newest";

  useEffect(() => {
    const params = { search, category, sort, page, limit: 8 };
    api.get("/books", { params }).then((res) => {
      setBooks(res.data.books);
      setTotalPages(res.data.totalPages || 1);
    });
  }, [search, category, sort, page]);

  useEffect(() => setPage(1), [search, category, sort]);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const handleAddToLibrary = async (bookId) => {
    if (!user) {
      setMessage("Please login to add books to your library.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    try {
      await api.post("/library", { bookId });
      setMessage("Book added to My Library!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not add book.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="page-container">
      {message && <div className="toast">{message}</div>}

      <h1 className="page-title">All Books</h1>

      <SearchBar
        onSearch={(term) => updateParam("search", term)}
        placeholder="Search books by title, author or category..."
      />

      <div className="books-layout">
        <aside className="filters-panel">
          <h4>Category</h4>
          <select value={category} onChange={(e) => updateParam("category", e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <h4>Sort By</h4>
          <select value={sort} onChange={(e) => updateParam("sort", e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="rating-desc">Highest Rating</option>
          </select>

          <button
            className="btn-outline-small"
            style={{ marginTop: "1rem" }}
            onClick={() => setSearchParams({})}
          >
            Clear Filters
          </button>
        </aside>

        <div className="books-main">
          {books.length === 0 ? (
            <p className="empty-state">No books found. Try a different search or filter.</p>
          ) : (
            <div className="book-grid">
              {books.map((book) => (
                <BookCard key={book._id} book={book} onAddToLibrary={handleAddToLibrary} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
              <span>Page {page} of {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
