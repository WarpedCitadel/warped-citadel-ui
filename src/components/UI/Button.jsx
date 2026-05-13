import '../../styles/Button.css';

const Button = ({ children, variant = 'primary', onClick }) => {
  return (
    <button className={`custom-btn ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;