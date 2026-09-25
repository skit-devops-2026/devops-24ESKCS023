import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Blocks access unless the user is logged in AND is an admin
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="page-loading">Loading...</div>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
