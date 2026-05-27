import '../../styles/Input.css';

const Input = ({ label, type = "text", placeholder, value, onChange }) => {
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