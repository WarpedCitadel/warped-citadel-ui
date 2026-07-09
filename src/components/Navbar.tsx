import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import Button from './UI/Button';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const displayName = localStorage.getItem("displayName");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("displayName");
    localStorage.removeItem("userUUID");

    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <span className="teal-text">WARPED</span>CITADEL
      </Link>

      <div className="nav-links">
        {displayName ? (
          <div className="profile-menu">
            <button
              className="profile-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {displayName} ▼
            </button>

            {menuOpen && (
              <div className="dropdown-menu">
                <Link
                  to="/profile"
                  className="dropdown-item"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>

                <button
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;