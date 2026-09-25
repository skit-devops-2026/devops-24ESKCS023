import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3>📚 Digital Library</h3>
          <p>Discover books, expand your knowledge, and build your personal digital library.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: adityasoni1377272@digitallibrary.com</p>
          <p>Phone: +91 89057 39341</p>
          <p>Address: Swami Keshvanand Institute of Technology,
Management & Gramothan, Jaipur</p>
        </div>

        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <span>🌐</span>
            <span>📘</span>
            <span>📷</span>
            <span>🐦</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Digital Library. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
