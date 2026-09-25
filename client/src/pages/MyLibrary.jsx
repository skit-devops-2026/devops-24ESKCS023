import { useEffect, useState } from "react";
import api from "../services/api";

const statusOptions = ["Want to Read", "Currently Reading", "Completed"];

const MyLibrary = () => {
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState("");

  const loadLibrary = () => {
    api.get("/library").then((res) => setEntries(res.data));
  };

  useEffect(() => {
    loadLibrary();
  }, []);

  const handleStatusChange = async (bookId, status) => {
    await api.put(`/library/${bookId}`, { status });
    loadLibrary();
  };

  const handleRemove = async (bookId) => {
    await api.delete(`/library/${bookId}`);
    setMessage("Book removed from My Library.");
    loadLibrary();
    setTimeout(() => setMessage(""), 3000);
  };

  const handleRead = (book) => {
    if (book.pdfUrl) {
      window.open(book.pdfUrl, "_blank");
    } else {
      setMessage("Reading file is currently unavailable.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="page-container">
      {message && <div className="toast">{message}</div>}
      <h1 className="page-title">My Library</h1>

      {entries.length === 0 ? (
        <p className="empty-state">
          Your library is empty. Go to the Books page and add some books!
        </p>
      ) : (
        <div className="library-list">
          {entries.map((entry) => (
            <div key={entry._id} className="library-item">
              <img
                src={entry.bookId?.coverImage || "https://via.placeholder.com/100x140?text=No+Cover"}
                alt={entry.bookId?.title}
              />
              <div className="library-item-info">
                <h3>{entry.bookId?.title}</h3>
                <p>by {entry.bookId?.author}</p>
                <span className="book-category">{entry.bookId?.category}</span>

                <select
                  value={entry.status}
                  onChange={(e) => handleStatusChange(entry.bookId._id, e.target.value)}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="library-item-actions">
                <button className="btn-outline-small" onClick={() => handleRead(entry.bookId)}>Read</button>
                <button className="btn-danger-small" onClick={() => handleRemove(entry.bookId._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLibrary;
