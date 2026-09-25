import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [message, setMessage] = useState("");

  const loadBooks = () => {
    api.get("/books", { params: { search, limit: 100 } }).then((res) => setBooks(res.data.books));
  };

  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const confirmDelete = async () => {
    try {
      await api.delete(`/books/${deleteTarget._id}`);
      setMessage("Book deleted successfully.");
      setDeleteTarget(null);
      loadBooks();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not delete book.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="page-container">
      {message && <div className="toast">{message}</div>}
      <div className="admin-header-row">
        <h1 className="page-title">Manage Books</h1>
        <Link to="/admin/add-book" className="btn-filled">+ Add Book</Link>
      </div>

      <input
        className="admin-search-input"
        placeholder="Search books by title, author or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>⭐ {book.rating}</td>
              <td className="admin-table-actions">
                <Link to={`/admin/edit-book/${book._id}`} className="btn-outline-small">Edit</Link>
                <button className="btn-danger-small" onClick={() => setDeleteTarget(book)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteTarget && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Are you sure you want to delete "{deleteTarget.title}"?</p>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn-danger-small" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
