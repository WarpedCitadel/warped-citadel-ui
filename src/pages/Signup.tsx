import React, { useState } from 'react';
import Panel from '../components/UI/Panel';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { Link, useNavigate } from 'react-router-dom';
import { validateUsername, validateEmail, validatePassword } from '../utils/validation';
import { signupUser } from '../utils/api';
import '../styles/Signup.css';


const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerMessage(null); // Reset messages

    const userCheck = validateUsername(formData.username);
    const emailCheck = validateEmail(formData.email);
    const passCheck = validatePassword(formData.password);

    if (!userCheck.isValid || !emailCheck.isValid || !passCheck.isValid) {
      setErrors({
        username: userCheck.message,
        email: emailCheck.message,
        password: passCheck.message
      });
      return;
    }

    // 2. Clear local errors and start loading
    setErrors({ username: '', email: '', password: '' });
    setIsLoading(true);

    // Try to send to backend
    try {
      const result = await signupUser(formData);
      
      if (result.status === 201) {
        // Signup successful, take to email verification page

        localStorage.setItem("activationSessionToken", result.data.sessionToken);
        localStorage.setItem("activationEmail", result.data.email);

        navigate("/signup/activate");
        // setServerMessage("Account successfully created");
        // setFormData({ username: '', email: '', password: '' }); // Clear form
      }
    } catch (err: any) {
      // 4. Handle Backend Errors (like user already exists)
      // Assuming backend returns status 409 for conflicts
      if (err.status === 409) {
        //ideally the backend would specifiy which field is conflicting
        setServerMessage(err.error?.message ?? "Username or email already exists");
      }
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <div className="signup-page">
      <div className="signup-center-wrapper">
        <Panel title="Join the Citadel">
          <form className="signup-form" onSubmit={handleSignup}>
            {serverMessage && (
              <div className={`status-msg ${serverMessage.includes('success') ? 'success' : 'error'}`}>
                {serverMessage}
              </div>
            )}
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
                {isLoading ? "Creating..." : "Create Account"}
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