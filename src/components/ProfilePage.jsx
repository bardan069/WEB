import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '120px 20px 40px', textAlign: 'center' }}>Loading profile...</div>;
  }

  if (!user) {
    return (
      <div style={{ padding: '120px 20px 40px', textAlign: 'center' }}>
        <h2>You are not logged in.</h2>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '120px auto 40px', background: 'white', borderRadius: 15, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: 40, fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ color: '#c94f7c', marginBottom: 24 }}>My Profile</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f3e6ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#c94f7c', fontWeight: 700 }}>
          {user.firstName?.charAt(0) || user.email?.charAt(0) || 'U'}
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>{user.firstName} {user.lastName}</div>
          <div style={{ color: '#666', fontSize: 16 }}>{user.email}</div>
        </div>
      </div>
      <hr style={{ margin: '32px 0' }} />
      <h3 style={{ color: '#b85c8b', marginBottom: 16 }}>Order History</h3>
      <div style={{ color: '#888', fontStyle: 'italic', marginBottom: 32 }}>
        (Order history will appear here.)
      </div>
      <button
        onClick={logout}
        style={{ background: 'linear-gradient(to right, #d47fa6, #b85c8b)', color: 'white', border: 'none', padding: '12px 32px', borderRadius: 30, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage; 