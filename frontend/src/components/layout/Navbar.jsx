import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <NavLink to="/dashboard" className="navbar-logo">
          RepoVerse
        </NavLink>

        <nav className="navbar-links">
          <NavLink to="/dashboard">Dashboard</NavLink>

          <NavLink to="/profile">Profile</NavLink>

          <NavLink to="/settings">Settings</NavLink>

          <button className="navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
