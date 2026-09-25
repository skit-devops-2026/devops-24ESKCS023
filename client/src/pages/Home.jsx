import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";

const categories = [
  "Programming", "Computer Science", "Technology", "Science",
  "Mathematics", "History", "Fiction", "Business", "Literature"
];

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [stats, setStats] = useState({ totalBooks: 0, totalCategories: 0 });
  const [userCount, setUserCount] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    api.get("/books?limit=8&sort=newest").then((res) => setFeaturedBooks(res.data.books));
    api.get("/books/meta/stats").then((res) => setStats(res.data));
  }, []);

  const handleSearch = (term) => {
    navigate(`/books?search=${encodeURIComponent(term)}`);
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
    <div>
      {message && <div className="toast">{message}</div>}

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Explore. Read. Learn.</h1>
          <p>Discover books, expand your knowledge, and build your personal digital library.</p>
          <div className="hero-buttons">
            <Link to="/books" className="btn-filled">Explore Books</Link>
            {!user && <Link to="/signup" className="btn-outline">Get Started</Link>}
          </div>
        </div>
        <div className="hero-visual">📖</div>
      </section>

      {/* SEARCH */}
      <section className="search-section">
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* FEATURED BOOKS */}
      <section className="section">
        <h2 className="section-title">Featured Books</h2>
        <div className="book-grid">
          {featuredBooks.map((book) => (
            <BookCard key={book._id} book={book} onAddToLibrary={handleAddToLibrary} />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section section-alt">
        <h2 className="section-title">Browse Categories</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat}
              className="category-card"
              onClick={() => navigate(`/books?category=${encodeURIComponent(cat)}`)}
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <h2 className="section-title">Why Choose Our Library</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-icon">📚</span>
            <h3>Large Collection</h3>
            <p>Hundreds of books across many categories, curated for our readers.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔍</span>
            <h3>Easy Search</h3>
            <p>Find books quickly by title, author or category.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💻</span>
            <h3>Read Digitally</h3>
            <p>Read available books directly online, anytime, anywhere.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📖</span>
            <h3>Personal Library</h3>
            <p>Save books to your own library and track your reading progress.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section stats-section">
        <div className="stat-box">
          <h3>{stats.totalBooks}+</h3>
          <p>Total Books</p>
        </div>
        <div className="stat-box">
          <h3>{stats.totalCategories}</h3>
          <p>Categories</p>
        </div>
        <div className="stat-box">
          <h3>100%</h3>
          <p>Digital Access</p>
        </div>
        <div className="stat-box">
          <h3>24/7</h3>
          <p>Availability</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
