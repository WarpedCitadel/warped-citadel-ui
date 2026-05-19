import Panel from '../components/UI/Panel';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
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
              <p>New to the citadel? <span onClick={() => setPage('signup')} className="teal-link">Create account</span></p>
            </div>

          </form>
        </Panel>
      </div>
    </div>
  );
};

export default Login;