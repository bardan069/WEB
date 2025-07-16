import React, { useState } from 'react';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';

const AuthApp = () => {
  const [page, setPage] = useState('login');
  return (
    <div>
      {page === 'login' ? (
        <LoginPage />
      ) : (
        <SignupPage />
      )}
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        {page === 'login' ? (
          <span>Don't have an account? <button style={{ color: '#b85c8b', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setPage('signup')}>Sign up</button></span>
        ) : (
          <span>Already have an account? <button style={{ color: '#b85c8b', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setPage('login')}>Login</button></span>
        )}
      </div>
    </div>
  );
};

export default AuthApp; 