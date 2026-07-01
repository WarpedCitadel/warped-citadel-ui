import React, { useState } from 'react';
import Panel from '../components/UI/Panel';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';
import { loginUser } from '../utils/api';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [statusMsg, setStatusMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMsg('');
    
    const userValid = formData.username.length > 0;
    const passValid = formData.password.length > 0;

    setErrors({
      username: userValid ? "" : "Username is required",
      password: passValid ? "" : "Password is required"
    });

    if (userValid && passValid) {
      setIsLoading(true);
      try {
        const result = await loginUser(formData);
        
        if (result.status === 200) {
          const token = result.headers.get("Authorization");

          if (token) {
            localStorage.setItem("jwt", token);
          }

          localStorage.setItem("userUUID", result.data.userUUID);

          console.log("Login Success! UUID:", result.data.userUUID, "", "Token:", token);

          //TODO: redirect to homepage
          //TODO: check if the user's email is verified, if not redirect to email verification page, and do not save the UUID 
        }
      } catch (err: any) {
        setStatusMsg(err.data || "Invalid username or password");
        console.log("Login Failed:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-center-wrapper">
        <Panel title="Login">
          <form className="login-form" onSubmit={handleLogin}>
            {statusMsg &&
              <div className="status-msg error">
                {statusMsg}
              </div>
            }
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
                {isLoading ? "Logging in..." : "Login"}
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