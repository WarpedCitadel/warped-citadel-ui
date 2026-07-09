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
              <span>{displayName}</span>

              {/* modern drop down arrow */}
              <svg
                className={`dropdown-arrow ${menuOpen ? "open" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
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