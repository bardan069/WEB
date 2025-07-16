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
      background: 'linear-gradient(120deg, #fbeaec 0%, #f7e1f3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Creative background shapes */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: 60, left: 80, width: 120, height: 120, background: 'radial-gradient(circle at 30% 30%, #c94f7c 60%, #fff0f5 100%)', borderRadius: '50%', opacity: 0.13, filter: 'blur(2px)' }} />
        <div style={{ position: 'absolute', top: 180, right: 120, width: 90, height: 90, background: 'radial-gradient(circle at 70% 70%, #b85c8b 60%, #fff0f5 100%)', borderRadius: '50%', opacity: 0.10, filter: 'blur(2px)' }} />
        <div style={{ position: 'absolute', bottom: 60, left: 200, width: 70, height: 70, background: 'radial-gradient(circle at 50% 50%, #d47fa6 60%, #fff0f5 100%)', borderRadius: '50%', opacity: 0.09, filter: 'blur(2px)' }} />
      </div>
      <div style={{
        maxWidth: 420,
        width: '100%',
        background: 'rgba(255,255,255,0.55)',
        borderRadius: 22,
        boxShadow: '0 8px 32px rgba(201,79,124,0.13)',
        padding: 48,
        fontFamily: 'Segoe UI, sans-serif',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(16px)',
        border: '1.5px solid #fbeaec',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, gap: 10 }}>
          <FaUser style={{ color: '#c94f7c', fontSize: 32 }} />
          <h2 style={{ color: '#c94f7c', fontWeight: 700, fontSize: 28, margin: 0 }}>User Login</h2>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ position: 'relative' }}>
            <FaEnvelope style={{ position: 'absolute', left: 12, top: 13, color: '#c94f7c' }} />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" style={{ width: '100%', padding: '12px 44px 12px 38px', borderRadius: 8, border: '1.5px solid #e9b6d0', fontSize: 16, background: '#b8aeb8', color: '#fff', backdropFilter: 'blur(2px)' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <FaLock style={{ position: 'absolute', left: 12, top: 13, color: '#c94f7c' }} />
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" style={{ width: '100%', padding: '12px 44px 12px 38px', borderRadius: 8, border: '1.5px solid #e9b6d0', fontSize: 16, background: '#fff', color: '#2c3e50', backdropFilter: 'blur(2px)' }} />
            <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: 10, top: 10, background: 'none', border: 'none', cursor: 'pointer', color: '#c94f7c', fontSize: 20, padding: 0 }} tabIndex={-1} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" style={{ width: '100%', background: 'linear-gradient(90deg, #c94f7c 0%, #b85c8b 100%)', color: 'white', border: 'none', borderRadius: 10, padding: '14px 0', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px #fbeaec', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 6, transition: 'background 0.2s' }} disabled={loading}>
            {loading ? 'Logging in...' : <><FaSignInAlt style={{ fontSize: 20 }} /> Login</>}
          </button>
        </form>
        <div style={{ marginTop: 22, textAlign: 'center' }}>
          <span style={{ color: '#888' }}>Don't have an account? </span>
          <Link to="/signup" style={{ color: '#b85c8b', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
        </div>
        <div style={{ marginTop: 18, textAlign: 'center' }}>
          <span style={{ color: '#888' }}>Admin? </span>
          <Link to="/admin-login" style={{ color: '#b85c8b', fontWeight: 600, textDecoration: 'none' }}>Login as Admin</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 