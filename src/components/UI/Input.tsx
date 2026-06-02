import React from 'react';
import '../../styles/Input.css';

interface InputProps {
  label?: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  value?: string;  
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange,
  error 
}) => {
  return (
    <div className="input-group">
      <div className="input-label-row">
        {label && <label className="input-label">{label}</label>}
        {error && <span className="input-error-text">{error}</span>}
      </div>
      
      <input 
        className={`custom-input ${error ? 'input-error' : ''}`}
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;