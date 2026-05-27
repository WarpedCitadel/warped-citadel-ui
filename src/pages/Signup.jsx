import Panel from '../components/UI/Panel';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup logic goes here...");
  };

  return (
    <div className="signup-page">
      <div className="signup-center-wrapper">
        <Panel title="Join the Citadel">
          <form className="signup-form" onSubmit={handleSignup}>
            <Input label="Username" placeholder="Choose a display name" />
            <Input label="Email" type="email" placeholder="your@email.com" />
            <Input label="Password" type="password" placeholder="••••••••" />
            
            <div className="form-actions">
              <Button variant="primary">Create Account</Button>
            </div>

            <div className="form-footer">
              <p>
                Already a member? <Link to="/login" className="teal-link">Login here</Link>
              </p>
            </div>
          </form>
        </Panel>
      </div>
    </div>
  );
};

export default Signup;