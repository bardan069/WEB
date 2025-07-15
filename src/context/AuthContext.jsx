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

  // Keep isAdmin in sync with localStorage
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
    // Fake login: check localStorage for users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast.success('Welcome back!');
      return { success: true };
    } else {
      toast.error('Invalid email or password');
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const signup = async (userData) => {
    // Fake signup: store user in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === userData.email)) {
      toast.error('Email already exists');
      return { success: false, error: 'Email already exists' };
    }
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success('Account created successfully!');
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = async (profileData) => {
    // Fake update: update user in localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.map(u => (u.email === user.email ? { ...u, ...profileData } : u));
    localStorage.setItem('users', JSON.stringify(users));
    setUser({ ...user, ...profileData });
    localStorage.setItem('user', JSON.stringify({ ...user, ...profileData }));
    toast.success('Profile updated successfully!');
    return { success: true };
  };

  // Add admin helpers
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