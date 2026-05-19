import Panel from '../components/UI/Panel';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ setPage }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login logic goes here...");
  };

  return (
    <div className="login-page">
      <div className="login-center-wrapper">
        <Panel title="Login">
          <form className="login-form" onSubmit={handleLogin}>
            <Input label="Username" placeholder="Enter your username" />
            <Input label="Password" type="password" placeholder="••••••••" />
            
            <div className="form-actions">
              <Button variant="primary">Login</Button>
            </div>
            <div className="form-footer">
              <p>New to the citadel? <Link to="/signup" className="teal-link">Create an account</Link></p>
            </div>

          </form>
        </Panel>
      </div>
    </div>
  );
};

export default Login;