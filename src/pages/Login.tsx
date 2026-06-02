import React, { useState } from 'react';
import Panel from '../components/UI/Panel';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';
import { validateUsername } from '../utils/validation';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic check: Are fields empty?
    const userValid = formData.username.length > 0;
    const passValid = formData.password.length > 0;

    setErrors({
      username: userValid ? "" : "Username is required",
      password: passValid ? "" : "Password is required"
    });

    if (userValid && passValid) {
       console.log("Attempting Login...");
    }
  };

  return (
    <div className="login-page">
      <div className="login-center-wrapper">
        <Panel title="Login">
          <form className="login-form" onSubmit={handleLogin}>
            <Input 
              label="Username" 
              placeholder="Enter your username" 
              value={formData.username}
              error={errors.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              error={errors.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            
            <div className="form-actions">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>

            <div className="form-footer">
              <p>
                New to the citadel?{" "}
                <Link to="/signup" className="teal-link">
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </Panel>
      </div>
    </div>
  );
};

export default Login;