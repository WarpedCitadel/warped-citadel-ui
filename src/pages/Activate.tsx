import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Panel from '../components/UI/Panel';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { activateAccount, resendPasscode } from '../utils/api';
import '../styles/Activate.css';

const Activate: React.FC = () => {
  const navigate = useNavigate();

  const [passcode, setPasscode] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const email = localStorage.getItem('activationEmail');
  const token = localStorage.getItem('activationSessionToken');

  // If someone browses directly here, redirect to signup
  useEffect(() => {
    if (!email || !token) {
        navigate("/signup");
    }
  }, [email, token, navigate]);

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passcode.trim().length === 0) {
      setMessage('Please enter the verification passcode.');
      return;
    }

    setMessage('');
    setIsLoading(true);

    try {
      await activateAccount(token, passcode);

      // localStorage.removeItem('activationSessionToken');
      // localStorage.removeItem('activationEmail');

      navigate('/login');
    } catch (err: any) {
      setMessage(err.error?.message ?? 'Unable to verify account.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setMessage('');
    setIsResending(true);

    try {
      const result = await resendPasscode(email);

      localStorage.setItem(
        'activationSessionToken',
        result.data.sessionToken
      );

      setMessage(`A new passcode has been sent to ${result.data.email}.`);
    } catch (err: any) {
      setMessage(err.error?.message ?? 'Unable to resend passcode.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="activate-page">
      <div className="activate-center-wrapper">
        <Panel title="Verify your email">
          <form className="activate-form" onSubmit={handleVerify}>

            {message && (
              <div className="status-msg">
                {message}
              </div>
            )}

            <div className="activation-info">
              <p>
                <strong>Verify your email address.</strong>
              </p>

              <p>
                Thanks for signing up! We sent a verification passcode to:
              </p>

              <p className="activation-email">
                {email}
              </p>

              <p>
                Please enter the passcode below to activate your account.
              </p>
            </div>
            
            <Input
              label="Passcode"
              placeholder="Enter 6-digit passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            />

            <div className="form-actions">
            <Button variant="primary" type="submit">
                {isLoading ? 'Verifying...' : 'Verify Account'}
            </Button>
            </div>

            <div className="resend-section">
            <p>
                Didn't receive the email? Check your spam folder or{" "}
                <button
                type="button"
                className="resend-link"
                onClick={handleResend}
                disabled={isResending}
                >
                {isResending ? "sending..." : "resend a new passcode"}
                </button>
                .
            </p>
            </div>
          </form>
        </Panel>
      </div>
    </div>
  );
};

export default Activate;