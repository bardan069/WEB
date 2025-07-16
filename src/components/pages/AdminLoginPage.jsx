import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEnvelope, FaLock, FaUserShield, FaSignInAlt } from 'react-icons/fa';

const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = 'admin123';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAdmin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAdmin();
      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 100); // Delay to ensure context updates
    } else {
      alert('Invalid admin credentials');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', height: '100vh', width: '100vw', background: 'linear-gradient(120deg, #fbeaec 0%, #f7e1f3 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
      <div style={{ maxWidth: 420, width: '100%', background: 'rgba(255,255,255,0.85)', borderRadius: 22, boxShadow: '0 8px 32px rgba(201,79,124,0.13)', padding: 48, fontFamily: 'Segoe UI, sans-serif', position: 'relative', zIndex: 1, backdropFilter: 'blur(16px)', border: '1.5px solid #fbeaec' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <FaUserShield style={{ color: '#c94f7c', fontSize: 32, marginRight: 10 }} />
          <h2 style={{ color: '#c94f7c', fontWeight: 700, fontSize: 28, margin: 0 }}>Admin Login</h2>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ position: 'relative' }}>
            <FaEnvelope style={{ position: 'absolute', left: 12, top: 13, color: '#c94f7c' }} />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Admin Email" style={{ width: '100%', padding: '12px 44px 12px 38px', borderRadius: 8, border: '1.5px solid #e9b6d0', fontSize: 16, background: '#f7e1f3', color: '#2c3e50', backdropFilter: 'blur(2px)' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <FaLock style={{ position: 'absolute', left: 12, top: 13, color: '#c94f7c' }} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" style={{ width: '100%', padding: '12px 44px 12px 38px', borderRadius: 8, border: '1.5px solid #e9b6d0', fontSize: 16, background: '#f7e1f3', color: '#2c3e50', backdropFilter: 'blur(2px)' }} />
          </div>
          <button type="submit" style={{ width: '100%', background: 'linear-gradient(90deg, #c94f7c 0%, #b85c8b 100%)', color: 'white', border: 'none', borderRadius: 10, padding: '14px 0', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px #fbeaec', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }} disabled={loading}>
            {loading ? 'Logging in...' : <><FaSignInAlt style={{ fontSize: 20 }} /> Login</>}
          </button>
        </form>
        <div style={{ marginTop: 18, textAlign: 'center' }}>
          <span style={{ color: '#888' }}>Not an admin? </span>
          <a href="/login" style={{ color: '#b85c8b', fontWeight: 600, textDecoration: 'none' }}>Login as User</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage; 