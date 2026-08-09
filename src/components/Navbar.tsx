import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";
import '../styles/Navbar.css';
import Button from './UI/Button';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const displayName = localStorage.getItem("displayName");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("displayName");
    localStorage.removeItem("userUUID");

    navigate("/");
    window.location.reload();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      navigate(`/games?title=${encodeURIComponent(query)}`);
    } else {
      navigate("/games");
    }
  };

  return (
    <nav className="navbar">

      {/* Left side */}
      <div className="navbar-left">
        <Link to="/" className="nav-logo">
          <span className="teal-text">WARPED</span>CITADEL
        </Link>

        <Link to="/games" className="browse-link">
          Browse
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button type="submit" aria-label="Search">
            <FaMagnifyingGlass />
          </button>
        </form>
      </div>

      {/* Right side */}
      <div className="nav-links">
        {displayName ? (
          <div className="profile-menu">
            <button
              className="profile-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span>{displayName}</span>

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
                  to={`/user/${displayName}`}
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