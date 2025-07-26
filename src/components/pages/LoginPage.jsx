import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEnvelope, FaLock, FaSignInAlt, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #fbeaec 0%, #f7e1f3 50%, #f0d4e8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '20px',
    }}>
      {/* Enhanced background shapes */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: 150, height: 150, background: 'radial-gradient(circle at 30% 30%, #c94f7c 40%, rgba(255,240,245,0.8) 100%)', borderRadius: '50%', opacity: 0.15, filter: 'blur(3px)', animation: 'float 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '20%', right: '15%', width: 100, height: 100, background: 'radial-gradient(circle at 70% 70%, #b85c8b 50%, rgba(255,240,245,0.8) 100%)', borderRadius: '50%', opacity: 0.12, filter: 'blur(2px)', animation: 'float 8s ease-in-out infinite reverse' }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '20%', width: 80, height: 80, background: 'radial-gradient(circle at 50% 50%, #d47fa6 50%, rgba(255,240,245,0.8) 100%)', borderRadius: '50%', opacity: 0.10, filter: 'blur(2px)', animation: 'float 7s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '25%', right: '25%', width: 60, height: 60, background: 'radial-gradient(circle at 40% 60%, #e9b6d0 50%, rgba(255,240,245,0.8) 100%)', borderRadius: '50%', opacity: 0.08, filter: 'blur(2px)', animation: 'float 9s ease-in-out infinite reverse' }} />
      </div>

      {/* Main login container */}
      <div style={{
        maxWidth: 450,
        width: '100%',
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 24,
        boxShadow: '0 20px 60px rgba(201,79,124,0.15), 0 8px 32px rgba(0,0,0,0.1)',
        padding: '48px 40px',
        fontFamily: 'Segoe UI, sans-serif',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.3)',
        transform: 'translateY(-20px)',
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: 32, 
          gap: 12,
          flexDirection: 'column',
          textAlign: 'center'
        }}>
          <div style={{
            width: 80,
            height: 80,
            background: 'linear-gradient(135deg, #c94f7c 0%, #b85c8b 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            boxShadow: '0 8px 24px rgba(201,79,124,0.3)'
          }}>
            <FaUser style={{ color: 'white', fontSize: 36 }} />
          </div>
          <h2 style={{ 
            color: '#c94f7c', 
            fontWeight: 800, 
            fontSize: 32, 
            margin: 0,
            letterSpacing: '0.5px'
          }}>Welcome Back</h2>
          <p style={{ 
            color: '#888', 
            fontSize: 16, 
            margin: '8px 0 0 0',
            fontWeight: 400
          }}>Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ position: 'relative' }}>
            <FaEnvelope style={{ 
              position: 'absolute', 
              left: 16, 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#c94f7c',
              fontSize: 18
            }} />
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email" 
              style={{ 
                width: '100%', 
                padding: '16px 16px 16px 48px', 
                borderRadius: 12, 
                border: '2px solid #e9b6d0', 
                fontSize: 16, 
                background: '#fff', 
                color: '#000', 
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#c94f7c'}
              onBlur={(e) => e.target.style.borderColor = '#e9b6d0'}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <FaLock style={{ 
              position: 'absolute', 
              left: 16, 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#c94f7c',
              fontSize: 18
            }} />
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              placeholder="Enter your password" 
              style={{ 
                width: '100%', 
                padding: '16px 48px 16px 48px', 
                borderRadius: 12, 
                border: '2px solid #e9b6d0', 
                fontSize: 16, 
                background: '#fff', 
                color: '#000', 
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#c94f7c'}
              onBlur={(e) => e.target.style.borderColor = '#e9b6d0'}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(v => !v)} 
              style={{ 
                position: 'absolute', 
                right: 12, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                color: '#c94f7c', 
                fontSize: 20, 
                padding: 8,
                borderRadius: 6,
                transition: 'background 0.2s'
              }} 
              tabIndex={-1} 
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onMouseOver={(e) => e.target.style.background = '#fbeaec'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              background: 'linear-gradient(135deg, #c94f7c 0%, #b85c8b 100%)', 
              color: 'white', 
              border: 'none', 
              borderRadius: 12, 
              padding: '18px 0', 
              fontWeight: 700, 
              fontSize: 18, 
              boxShadow: '0 8px 24px rgba(201,79,124,0.3)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: 12, 
              marginTop: 8, 
              transition: 'all 0.3s ease',
              cursor: loading ? 'not-allowed' : 'pointer'
            }} 
            disabled={loading}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 12px 32px rgba(201,79,124,0.4)')}
            onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 8px 24px rgba(201,79,124,0.3)')}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 20,
                  height: 20,
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Logging in...
              </div>
            ) : (
              <>
                <FaSignInAlt style={{ fontSize: 20 }} /> 
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Links */}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ color: '#666', fontSize: 15 }}>Don't have an account? </span>
            <Link 
              to="/signup" 
              style={{ 
                color: '#b85c8b', 
                fontWeight: 600, 
                textDecoration: 'none',
                fontSize: 15,
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.color = '#c94f7c'}
              onMouseOut={(e) => e.target.style.color = '#b85c8b'}
            >
              Sign up
            </Link>
          </div>
          <div>
            <span style={{ color: '#666', fontSize: 15 }}>Admin? </span>
            <Link 
              to="/admin-login" 
              style={{ 
                color: '#b85c8b', 
                fontWeight: 600, 
                textDecoration: 'none',
                fontSize: 15,
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.color = '#c94f7c'}
              onMouseOut={(e) => e.target.style.color = '#b85c8b'}
            >
              Login as Admin
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage; 