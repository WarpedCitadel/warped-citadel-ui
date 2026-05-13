import '../styles/Navbar.css';
import Button from './UI/Button';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">WARPED<span className="teal-text">CITADEL</span></div>
      <div className="nav-links">
        <Button>Login</Button>
      </div>
    </nav>
  );
};

export default Navbar;