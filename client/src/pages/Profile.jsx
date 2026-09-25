import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [libraryStats, setLibraryStats] = useState({ total: 0, reading: 0, completed: 0 });

  useEffect(() => {
    api.get("/library").then((res) => {
      const entries = res.data;
      setLibraryStats({
        total: entries.length,
        reading: entries.filter((e) => e.status === "Currently Reading").length,
        completed: entries.filter((e) => e.status === "Completed").length
      });
    });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await api.put("/auth/profile", { name, currentPassword, newPassword });
      setUser(res.data.user);
      setMessage("Profile updated successfully.");
      setEditing(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update profile.");
    }
  };

  if (!user) return <div className="page-loading">Loading...</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">My Profile</h1>

      <div className="profile-card">
        {!editing ? (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Books in My Library:</strong> {libraryStats.total}</p>
            <p><strong>Currently Reading:</strong> {libraryStats.reading}</p>
            <p><strong>Completed:</strong> {libraryStats.completed}</p>

            <div className="profile-actions">
              <button className="btn-outline" onClick={() => setEditing(true)}>Edit Profile</button>
              <button className="btn-danger-small" onClick={logout}>Logout</button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate}>
            {error && <p className="form-error">{error}</p>}
            {message && <p className="form-success">{message}</p>}

            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />

            <label>Current Password (only needed to change password)</label>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />

            <label>New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

            <div className="profile-actions">
              <button type="submit" className="btn-filled">Save Changes</button>
              <button type="button" className="btn-outline" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
