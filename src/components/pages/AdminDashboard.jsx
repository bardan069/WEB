import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { isAdmin, getAllUsers, updateUser, deleteUser } = useAuth();
  const [editingEmail, setEditingEmail] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();
  const [users, setUsers] = useState(getAllUsers());

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login');
    }
    // eslint-disable-next-line
  }, [isAdmin, navigate]);

  const handleEdit = (user) => {
    setEditingEmail(user.email);
    setEditData({ ...user });
  };

  const handleCancel = () => {
    setEditingEmail(null);
    setEditData({});
  };

  const handleSave = () => {
    updateUser(editingEmail, editData);
    setUsers(getAllUsers());
    setEditingEmail(null);
    setEditData({});
  };

  const handleDelete = (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(email);
      setUsers(getAllUsers());
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  if (!isAdmin) return null;

  return (
    <div style={{ maxWidth: 900, margin: '120px auto 40px', background: 'white', borderRadius: 15, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: 40, fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ color: '#c94f7c', marginBottom: 24 }}>Admin Dashboard</h2>
      <h3 style={{ color: '#b85c8b', marginBottom: 16 }}>User Management</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32 }}>
        <thead>
          <tr style={{ background: '#fbeaec' }}>
            <th style={{ padding: 10, border: '1px solid #eee' }}>First Name</th>
            <th style={{ padding: 10, border: '1px solid #eee' }}>Last Name</th>
            <th style={{ padding: 10, border: '1px solid #eee' }}>Email</th>
            <th style={{ padding: 10, border: '1px solid #eee' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr><td colSpan={4} style={{ textAlign: 'center', color: '#888', padding: 20 }}>No users found.</td></tr>
          )}
          {users.map((user) => (
            <tr key={user.email}>
              <td style={{ padding: 10, border: '1px solid #eee' }}>
                {editingEmail === user.email ? (
                  <input name="firstName" value={editData.firstName || ''} onChange={handleChange} />
                ) : (
                  user.firstName
                )}
              </td>
              <td style={{ padding: 10, border: '1px solid #eee' }}>
                {editingEmail === user.email ? (
                  <input name="lastName" value={editData.lastName || ''} onChange={handleChange} />
                ) : (
                  user.lastName
                )}
              </td>
              <td style={{ padding: 10, border: '1px solid #eee' }}>{user.email}</td>
              <td style={{ padding: 10, border: '1px solid #eee' }}>
                {editingEmail === user.email ? (
                  <>
                    <button onClick={handleSave} style={{ marginRight: 8, background: '#b85c8b', color: 'white', border: 'none', borderRadius: 5, padding: '6px 14px', cursor: 'pointer' }}>Save</button>
                    <button onClick={handleCancel} style={{ background: '#ccc', color: '#333', border: 'none', borderRadius: 5, padding: '6px 14px', cursor: 'pointer' }}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)} style={{ marginRight: 8, background: '#d47fa6', color: 'white', border: 'none', borderRadius: 5, padding: '6px 14px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(user.email)} style={{ background: '#e57373', color: 'white', border: 'none', borderRadius: 5, padding: '6px 14px', cursor: 'pointer' }}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard; 