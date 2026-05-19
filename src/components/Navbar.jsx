import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Button from './UI/Button';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <span className="teal-text">WARPED</span>CITADEL
      </Link>

      <div className="nav-links">        
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;