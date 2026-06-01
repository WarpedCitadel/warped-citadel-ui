import React from 'react';
import '../../styles/Button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  type?: "button" | "submit" | "reset"
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick,
  type = "button" 
}) => {
  return (
    <button 
      type={type}
      className={`custom-btn ${variant}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;