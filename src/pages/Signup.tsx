import React, { useState } from 'react';
import Panel from '../components/UI/Panel';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';
import { validateUsername, validateEmail, validatePassword } from '../utils/validation';
import '../styles/Signup.css';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 1. Run validations
    const userValid = validateUsername(formData.username);
    const emailValid = validateEmail(formData.email);
    const passValid = validatePassword(formData.password);

    // 2. Update error state
    setErrors({
      username: userValid.message,
      email: emailValid.message,
      password: passValid.message
    });

    // 3. Only proceed if all are valid
    if (userValid.isValid && emailValid.isValid && passValid.isValid) {
      console.log("Form is valid! Sending to backend...", formData);
      // This is where the api.ts file will be called later
    }
  };  

  return (
    <div className="signup-page">
      <div className="signup-center-wrapper">
        <Panel title="Join the Citadel">
          <form className="signup-form" onSubmit={handleSignup}>
            <Input 
              label="Username" 
              placeholder="Choose a username" 
              value={formData.username}
              error={errors.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
            <Input 
              label="Email" 
              type="email" 
              placeholder="your@email.com" 
              value={formData.email}
              error={errors.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              error={errors.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            
            <div className="form-actions">
              <Button variant="primary" type="submit">
                Create Account
              </Button>
            </div>

            <div className="form-footer">
              <p>
                Already a member?{" "}
                <Link to="/login" className="teal-link">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </Panel>
      </div>
    </div>
  );
};

export default Signup;