import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container section settings-page">
      <div className="settings-header">
        <h1>Settings</h1>

        <p>Manage your account.</p>
      </div>

      <div className="settings-card">
        <h3>Account</h3>

        <div className="setting-row">
          <span>Logged in as</span>

          <strong>{user?.email}</strong>
        </div>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="settings-card">
        <h3>Application</h3>

        <div className="setting-row">
          <span>Version</span>

          <strong>v1.0.0</strong>
        </div>

        <div className="setting-row">
          <span>Backend</span>

          <strong>Connected</strong>
        </div>
      </div>
    </div>
  );
}

export default Settings;
