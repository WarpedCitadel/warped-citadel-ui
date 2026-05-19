import '../styles/Navbar.css';
import Button from './UI/Button';

const Navbar = ({ onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => onNavigate('home')}>
        <span className="teal-text">WARPED</span>CITADEL
      </div>

      <div className="nav-links">
        <Button onClick={() => onNavigate('login')}>Login</Button>
      </div>
    </nav>
  );
};

export default Navbar;