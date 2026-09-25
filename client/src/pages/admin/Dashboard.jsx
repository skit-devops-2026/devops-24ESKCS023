import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/users/dashboard-stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <div className="page-loading">Loading...</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Admin Dashboard</h1>

      <div className="admin-stats-grid">
        <div className="stat-box">
          <h3>{stats.totalBooks}</h3>
          <p>Total Books</p>
        </div>
        <div className="stat-box">
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>
        <div className="stat-box">
          <h3>{stats.totalCategories}</h3>
          <p>Total Categories</p>
        </div>
        <div className="stat-box">
          <h3>{stats.totalReadingRecords}</h3>
          <p>Reading Records</p>
        </div>
      </div>

      <div className="admin-dashboard-layout">
        <div className="admin-panel">
          <h3>Recently Added Books</h3>
          {stats.recentBooks.map((book) => (
            <div key={book._id} className="admin-list-item">
              <span>{book.title}</span>
              <span className="book-category">{book.category}</span>
            </div>
          ))}
          <Link to="/admin/books" className="btn-outline-small" style={{ marginTop: "1rem", display: "inline-block" }}>
            Manage All Books
          </Link>
        </div>

        <div className="admin-panel">
          <h3>Recently Registered Users</h3>
          {stats.recentUsers.map((u) => (
            <div key={u._id} className="admin-list-item">
              <span>{u.name}</span>
              <span>{u.email}</span>
            </div>
          ))}
          <Link to="/admin/users" className="btn-outline-small" style={{ marginTop: "1rem", display: "inline-block" }}>
            View All Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
