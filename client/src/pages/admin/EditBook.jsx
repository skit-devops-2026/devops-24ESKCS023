import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const categories = [
  "Programming", "Computer Science", "Technology", "Science",
  "Mathematics", "History", "Fiction", "Business", "Literature"
];

const EditBook = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/books/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/books/${id}`, form);
      setMessage("Book updated successfully.");
      setError("");
      setTimeout(() => navigate("/admin/books"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Could not update book.");
    }
  };

  if (!form) return <div className="page-loading">Loading...</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Edit Book</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}
        {message && <p className="form-success">{message}</p>}

        <label>Book Title</label>
        <input name="title" value={form.title} onChange={handleChange} />

        <label>Author</label>
        <input name="author" value={form.author} onChange={handleChange} />

        <label>Category</label>
        <select name="category" value={form.category} onChange={handleChange}>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <label>Description</label>
        <textarea name="description" rows="3" value={form.description} onChange={handleChange} />

        <label>Cover Image URL</label>
        <input name="coverImage" value={form.coverImage} onChange={handleChange} />

        <label>Publication Year</label>
        <input name="publicationYear" type="number" value={form.publicationYear || ""} onChange={handleChange} />

        <label>ISBN</label>
        <input name="isbn" value={form.isbn} onChange={handleChange} />

        <label>Number of Pages</label>
        <input name="pages" type="number" value={form.pages || ""} onChange={handleChange} />

        <label>Language</label>
        <input name="language" value={form.language} onChange={handleChange} />

        <label>Rating (0-5)</label>
        <input name="rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={handleChange} />

        <label>PDF / Read URL</label>
        <input name="pdfUrl" value={form.pdfUrl} onChange={handleChange} />

        <button type="submit" className="btn-filled" style={{ marginTop: "1rem" }}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditBook;
