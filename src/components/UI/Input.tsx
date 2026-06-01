import React from 'react';
import '../../styles/Input.css';

interface InputProps {
  label?: string;
  type?: "text" | "password" | "email" | "number"; // Limit to common types
  placeholder?: string;
  value?: string;
  // This is the specific type for a Change Event in an Input field
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange 
}) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input 
        className="custom-input"
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;