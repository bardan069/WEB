import React, { useState } from 'react';

const LoginPage = ({ onNavigateToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('Login:', { email, password });
    // Add your login logic here
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(to right, #fbeaec, #fff0f5);
          background image: url(./download.jpeg)
        }

        .login-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          padding: 20px;
        }

        .login-box {
          display: flex;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          max-width: 950px;
          width: 100%;
          box-shadow: 0 12px 40px rgba(223, 182, 203, 0.25);
        }

        .login-form-container {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-brand {
          font-size: 22px;
          font-weight: bold;
          color: #c94f7c;
          margin-bottom: 12px;
        }

        .login-heading {
          font-size: 26px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #2c2c2c;
        }

        .login-subtext {
          font-size: 13px;
          color: #777;
          margin-bottom: 24px;
        }

        .google-login {
          border: 1px solid #ccc;
          border-radius: 30px;
          padding: 10px 20px;
          text-align: center;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
          background: #fff;
          transition: all 0.3s ease;
        }

        .google-login:hover {
          background: #fce4ec;
        }

        .divider {
          text-align: center;
          font-size: 12px;
          color: #aaa;
          margin: 16px 0;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .input-label {
          font-size: 13px;
          color: #444;
        }

        .form-input {
          padding: 10px 14px;
          border: 1px solid #ccc;
          border-radius: 30px;
          font-size: 14px;
          outline: none;
        }

        .form-input:focus {
          border-color: #d47fa6;
        }

        .password-toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: #888;
        }

        .options-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .login-button {
          background: linear-gradient(to right, #d47fa6, #b85c8b);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 30px;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-bottom: 16px;
        }

        .login-button:hover {
          background: linear-gradient(to right, #c86a99, #a64a78);
        }

        .signup-link {
          text-align: center;
          font-size: 13px;
          color: #777;
        }

        .signup-link a {
          color: #b85c8b;
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
        }

        .signup-link a:hover {
          text-decoration: underline;
        }

        .login-image {
          flex: 1;
          background: url('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=600&fit=crop') no-repeat center center;
          background-size: cover;
        }

        @media (max-width: 768px) {
          .login-box {
            flex-direction: column;
            border-radius: 0;
          }

          .login-image {
            height: 220px;
          }
        }
      `}</style>

      <div className="login-wrapper">
        <div className="login-box">
          <div className="login-form-container">
            <div className="login-brand">HEART & HUES</div>
            <h2 className="login-heading">Login</h2>
            <p className="login-subtext">Choose a gift for any occasion 🎁</p>

            <div className="google-login">
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
              Sign in with Google
            </div>

            <div className="divider">OR</div>

            <div>
              <div className="input-group">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    style={{ position: 'absolute', right: '12px', top: '9px' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              <div className="options-row">
                <label>
                  <input type="checkbox" style={{ marginRight: '6px' }} />
                  Remember Me
                </label>
                <a href="#" style={{ color: '#b85c8b', textDecoration: 'none' }}>Forgot password?</a>
              </div>

              <button onClick={handleSubmit} className="login-button">Login</button>
            </div>

            <div className="signup-link">
              Don't have an account? <a onClick={onNavigateToSignup}>Create one here</a>
            </div>
          </div>

          <div className="login-image"></div>
        </div>
      </div>
    </>
  );
};

const SignupPage = ({ onNavigateToLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = () => {
    // Validation
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!agreeToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    console.log('Signup successful:', { firstName, lastName, email, password, agreeToTerms });
    
    // Navigate to login page after successful signup
    alert('Account created successfully! Redirecting to login page...');
    onNavigateToLogin();
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(to right, #fbeaec, #fff0f5);
        }

        .signup-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
        }

        .signup-box {
          display: flex;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          max-width: 950px;
          width: 100%;
          box-shadow: 0 12px 40px rgba(223, 182, 203, 0.25);
        }

        .signup-form-container {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .signup-brand {
          font-size: 22px;
          font-weight: bold;
          color: #c94f7c;
          margin-bottom: 12px;
        }

        .signup-heading {
          font-size: 26px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #2c2c2c;
        }

        .signup-subtext {
          font-size: 13px;
          color: #777;
          margin-bottom: 24px;
        }

        .google-signup {
          border: 1px solid #ccc;
          border-radius: 30px;
          padding: 10px 20px;
          text-align: center;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
          background: #fff;
          transition: all 0.3s ease;
        }

        .google-signup:hover {
          background: #fce4ec;
        }

        .divider {
          text-align: center;
          font-size: 12px;
          color: #aaa;
          margin: 16px 0;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .name-row {
          display: flex;
          gap: 12px;
        }

        .name-row .input-group {
          flex: 1;
        }

        .input-label {
          font-size: 13px;
          color: #444;
        }

        .form-input {
          padding: 10px 14px;
          border: 1px solid #ccc;
          border-radius: 30px;
          font-size: 14px;
          outline: none;
        }

        .form-input:focus {
          border-color: #d47fa6;
        }

        .password-toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: #888;
        }

        .terms-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          margin-bottom: 20px;
          line-height: 1.4;
        }

        .terms-checkbox {
          margin-top: 2px;
        }

        .signup-button {
          background: linear-gradient(to right, #d47fa6, #b85c8b);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 30px;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-bottom: 16px;
        }

        .signup-button:hover {
          background: linear-gradient(to right, #c86a99, #a64a78);
        }

        .signup-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .login-link {
          text-align: center;
          font-size: 13px;
          color: #777;
        }

        .login-link a {
          color: #b85c8b;
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
        }

        .login-link a:hover {
          text-decoration: underline;
        }

        .signup-image {
          flex: 1;
          background: url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&h=600&fit=crop') no-repeat center center;
          background-size: cover;
        }

        @media (max-width: 768px) {
          .signup-box {
            flex-direction: column;
            border-radius: 0;
          }

          .signup-image {
            height: 220px;
          }

          .name-row {
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>

      <div className="signup-wrapper">
        <div className="signup-box">
          <div className="signup-form-container">
            <div className="signup-brand">HEART & HUES</div>
            <h2 className="signup-heading">Create Account</h2>
            <p className="signup-subtext">Join us and discover perfect gifts for every moment ✨</p>

            <div className="google-signup">
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
              Sign up with Google
            </div>

            <div className="divider">OR</div>

            <div>
              <div className="name-row">
                <div className="input-group">
                  <label className="input-label">First Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Last Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    style={{ position: 'absolute', right: '12px', top: '9px' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    style={{ position: 'absolute', right: '12px', top: '9px' }}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              <div className="terms-row">
                <input
                  type="checkbox"
                  className="terms-checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
                <span>
                  I agree to the <a href="#" style={{ color: '#b85c8b', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: '#b85c8b', textDecoration: 'none' }}>Privacy Policy</a>
                </span>
              </div>

              <button 
                onClick={handleSubmit}
                className="signup-button"
                disabled={!agreeToTerms}
              >
                Create Account
              </button>
            </div>

            <div className="login-link">
              Already have an account? <a onClick={onNavigateToLogin}>Sign in here</a>
            </div>
          </div>

          <div className="signup-image"></div>
        </div>
      </div>
    </>
  );
};

const AuthApp = () => {
  const [currentPage, setCurrentPage] = useState('signup'); // Start with signup page

  const navigateToLogin = () => setCurrentPage('login');
  const navigateToSignup = () => setCurrentPage('signup');

  return (
    <div>
      {currentPage === 'login' ? (
        <LoginPage onNavigateToSignup={navigateToSignup} />
      ) : (
        <SignupPage onNavigateToLogin={navigateToLogin} />
      )}
    </div>
  );
};

export default AuthApp;