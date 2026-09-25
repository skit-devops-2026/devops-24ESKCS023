import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          📚 Digital Library
        </Link>

        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/books" onClick={() => setMenuOpen(false)}>Books</Link>

          {user && user.role !== "admin" && (
            <Link to="/my-library" onClick={() => setMenuOpen(false)}>My Library</Link>
          )}

          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

          {!user && <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>}

          {user && user.role === "admin" && (
            <>
              <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/admin/books" onClick={() => setMenuOpen(false)}>Manage Books</Link>
              <Link to="/admin/add-book" onClick={() => setMenuOpen(false)}>Add Book</Link>
              <Link to="/admin/users" onClick={() => setMenuOpen(false)}>Users</Link>
            </>
          )}

          {user && user.role !== "admin" && (
            <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
          )}

          {!user ? (
            <>
              <Link to="/login" className="nav-btn-outline" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="nav-btn-filled" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <button className="nav-btn-outline" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
