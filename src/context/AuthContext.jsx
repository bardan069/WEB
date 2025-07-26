import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('admin') === 'true');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem('admin', 'true');
    } else {
      localStorage.removeItem('admin');
    }
  }, [isAdmin]);

  const setAdmin = () => setIsAdmin(true);
  const clearAdmin = () => setIsAdmin(false);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/v1/customers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        const userWithToken = { ...data.user, token: data.token };
        setUser(userWithToken);
        localStorage.setItem('user', JSON.stringify(userWithToken));
        toast.success('Welcome back!');
        return { success: true, user: userWithToken };
      } else {
        toast.error(data.message || 'Invalid email or password');
        return { success: false, error: data.message || 'Invalid email or password' };
      }
    } catch (err) {
      toast.error('Login failed');
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (userData) => {
    try {
      const res = await fetch('/api/v1/customers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fname: userData.firstName,
          lname: userData.lastName,
          email: userData.email,
          password: userData.password,
          phone: userData.phone || '',
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Account created successfully!');
        return { success: true };
      } else {
        toast.error(data.message || 'Signup failed');
        return { success: false, error: data.message || 'Signup failed' };
      }
    } catch (err) {
      toast.error('Signup failed');
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = async (profileData) => {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.map(u => (u.email === user.email ? { ...u, ...profileData } : u));
    localStorage.setItem('users', JSON.stringify(users));
    setUser({ ...user, ...profileData });
    localStorage.setItem('user', JSON.stringify({ ...user, ...profileData }));
    toast.success('Profile updated successfully!');
    return { success: true };
  };

  const getAllUsers = () => {
    if (!isAdmin) return [];
    return JSON.parse(localStorage.getItem('users') || '[]');
  };

  const updateUser = (email, newData) => {
    if (!isAdmin) return { success: false, error: 'Not authorized' };
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.map(u => (u.email === email ? { ...u, ...newData } : u));
    localStorage.setItem('users', JSON.stringify(users));
    toast.success('User updated successfully!');
    return { success: true };
  };

  const deleteUser = (email) => {
    if (!isAdmin) return { success: false, error: 'Not authorized' };
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(u => u.email !== email);
    localStorage.setItem('users', JSON.stringify(users));
    toast.success('User deleted successfully!');
    return { success: true };
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin,
    setAdmin,
    clearAdmin,
    getAllUsers,
    updateUser,
    deleteUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 