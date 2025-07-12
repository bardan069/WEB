import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';


const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = 'admin123';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAdmin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAdmin();
      toast.success('Admin logged in!');
      navigate('/admin-dashboard');
    } else {
      toast.error('Invalid admin credentials');
    }
    setLoading(false);
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
            <div className="login-brand">ADMIN PANEL</div>
            <h2 className="login-heading">Admin Login</h2>
            <p className="login-subtext">Enter admin credentials to manage users</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Admin Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="admin@admin.com"
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
                    placeholder="Enter admin password"
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
              <button 
                type="submit" 
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In as Admin'}
              </button>
            </form>
          </div>
          <div className="login-image"></div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage; 