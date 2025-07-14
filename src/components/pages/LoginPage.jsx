import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    }
    setLoading(false);
  };
  
     
 
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(to right, #fbeaec, #fff0f5);
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
        }

        .login-button:hover:not(:disabled) {
          background: linear-gradient(to right, #c86a99, #a64a78);
        }

        .login-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .login-image {
          flex: 1;
          background: url('/download.jpeg') no-repeat center center;
          background-size: cover;
        }

        .signup-link {
          text-align: center;
          font-size: 13px;
          color: #777;
          margin-top: 20px;
        }

        .signup-link a {
          color: #b85c8b;
          text-decoration: none;
          font-weight: 500;
        }

        .signup-link a:hover {
          text-decoration: underline;
        }

        .admin-login-option {
          background: white !important;
          color: #b85c8b !important;
          border: 2px solid #b85c8b !important;
        }
        .admin-login-option:hover {
          background: #fbeaec !important;
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

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="options-row">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#" style={{ color: '#b85c8b', textDecoration: 'none' }}>
                  Forgot password?
                </a>
              </div>

              <button 
                type="submit" 
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <button
                type="button"
                className="login-button admin-login-option"
                style={{ marginTop: 12, background: 'white', color: '#b85c8b', border: '2px solid #b85c8b' }}
                onClick={() => navigate('/admin-login')}
              >
                Login as Admin
              </button>
            </form>

            <div className="signup-link">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>

          <div className="login-image"></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
