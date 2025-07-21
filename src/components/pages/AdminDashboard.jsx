import React, { useState, useEffect } from 'react';
import { FaBoxOpen, FaClipboardList, FaChartBar, FaCog, FaPlus, FaEdit, FaTrash, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const dashboardSections = [
  { key: 'products', title: 'Product Management', icon: <FaBoxOpen />, color: '#c94f7c' },
  { key: 'users', title: 'User Management', icon: <FaUserCircle />, color: '#b85c8b' },
  { key: 'overview', title: 'Overview', icon: <FaChartBar />, color: '#d47fa6' },
  { key: 'settings', title: 'Settings', icon: <FaCog />, color: '#a86ebf' },
];

const AdminDashboard = () => {
  const [active, setActive] = useState('products');
  const navigate = useNavigate();

  const handleSectionClick = (key) => {
    setActive(key);
  };

  return (
    <div style={{ minHeight: '100vh', height: '100vh', width: '100vw', background: 'linear-gradient(120deg, #fbeaec 0%, #f7e1f3 100%)', display: 'flex', alignItems: 'stretch', justifyContent: 'stretch', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: 90, background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(12px)', borderRight: '1.5px solid #fbeaec', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0', gap: 24, boxShadow: '2px 0 16px #fbeaec22', zIndex: 2 }}>
        <FaUserCircle style={{ fontSize: 38, color: '#c94f7c', marginBottom: 18 }} />
        {dashboardSections.map(section => (
          <button
            key={section.key}
            onClick={() => handleSectionClick(section.key)}
            style={{
              background: active === section.key ? `linear-gradient(90deg, ${section.color} 60%, #fff0f5 100%)` : 'none',
              color: active === section.key ? 'white' : section.color,
              border: 'none',
              borderRadius: 16,
              padding: '14px 0',
              width: 48,
              height: 48,
              margin: '0 0 8px 0',
              fontSize: 22,
              boxShadow: active === section.key ? '0 2px 12px #fbeaec' : 'none',
              cursor: 'pointer',
              transition: 'all 0.18s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title={section.title}
          >
            {section.icon}
          </button>
        ))}
      </aside>
      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: 900, minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInDash 0.7s' }}>
          {active === 'products' && <ProductsSection />}
          {active === 'users' && <UsersSection />}
          {active === 'overview' && <IncomeSection />}
          {active === 'settings' && <SettingsSection />}
        </div>
      </main>
      <style>{`
        @keyframes fadeInDash {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '' });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  // Fetch products
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  // Open modal for add/edit
  const openModal = (product = null) => {
    setEditProduct(product);
    setForm(product ? { ...product } : { name: '', price: '', description: '', image: '' });
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditProduct(null);
    setForm({ name: '', price: '', description: '', image: '' });
  };

  // Handle form change
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Save (add or edit)
  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    const method = editProduct ? 'PUT' : 'POST';
    const url = editProduct ? `/api/products/${editProduct.id}` : '/api/products';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseFloat(form.price) })
    });
    const data = await res.json();
    if (res.ok) {
      if (editProduct) {
        setProducts(products.map(p => (p.id === editProduct.id ? data.data : p)));
        toast.success('Product updated!');
      } else {
        setProducts([...products, data.data]);
        toast.success('Product added!');
      }
      closeModal();
    } else {
      toast.error(data.error || data.message || 'Failed to save product');
    }
    setSaving(false);
  };

  // Delete
  const handleDelete = async id => {
    if (!window.confirm('Delete this product?')) return;
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted!');
    } else toast.error('Failed to delete product');
  };

  // Filtered products
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div>Loading products...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ width: '100%', background: 'rgba(255,255,255,0.8)', borderRadius: 28, boxShadow: '0 8px 32px #fbeaec55', padding: 44, minHeight: 500, display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start', position: 'relative', transition: 'box-shadow 0.2s' }}>
      <Toaster position="top-right" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', justifyContent: 'space-between' }}>
        <h2 style={{ color: '#c94f7c', fontWeight: 900, fontSize: 32, marginBottom: 0, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 14, textShadow: '0 2px 8px #fbeaec' }}><FaBoxOpen /> Product Management</h2>
        <button onClick={() => openModal()} style={{ background: 'linear-gradient(90deg, #c94f7c, #b85c8b)', color: 'white', border: 'none', borderRadius: 14, padding: '12px 28px', fontWeight: 800, fontSize: 18, boxShadow: '0 2px 12px #fbeaec', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', transition: 'background 0.2s, box-shadow 0.2s', outline: 'none' }} title="Add Product"><FaPlus /> Add Product</button>
      </div>
      <div style={{ width: '100%', margin: '10px 0 20px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: 10, border: '1.5px solid #e9b6d0', fontSize: 16, width: 260, background: '#fff8fa', marginRight: 0 }}
        />
      </div>
      <div style={{ width: '100%', overflowX: 'auto', borderRadius: 18, boxShadow: '0 2px 12px #fbeaec33', background: 'rgba(255,255,255,0.95)' }}>
        <table style={{ width: '100%', borderRadius: 18, minWidth: 600, color: '#b85c8b', fontWeight: 600, fontSize: 16, borderCollapse: 'separate', borderSpacing: 0, overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(90deg, #fbeaec 60%, #f7e1f3 100%)' }}>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 800, fontSize: 17, color: '#c94f7c', borderTopLeftRadius: 18 }}>ID</th>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 800, fontSize: 17, color: '#c94f7c' }}>Name</th>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 800, fontSize: 17, color: '#c94f7c' }}>Price</th>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 800, fontSize: 17, color: '#c94f7c' }}>Description</th>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 800, fontSize: 17, color: '#c94f7c' }}>Image</th>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 800, fontSize: 17, color: '#c94f7c', borderTopRightRadius: 18 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} style={{ background: '#fff', transition: 'background 0.18s' }} onMouseOver={e => e.currentTarget.style.background = '#fbeaec44'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                <td style={{ padding: 14 }}>{product.id}</td>
                <td style={{ padding: 14 }}>{product.name}</td>
                <td style={{ padding: 14 }}>{product.price}</td>
                <td style={{ padding: 14, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.description}</td>
                <td style={{ padding: 14 }}>
                  {product.image ? <img src={product.image} alt={product.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 10, boxShadow: '0 1px 6px #fbeaec' }} /> : <span style={{ color: '#ccc' }}>No image</span>}
                </td>
                <td style={{ padding: 14 }}>
                  <button onClick={() => openModal(product)} style={{ marginRight: 8, background: 'linear-gradient(90deg, #6e8fbf, #b85c8b)', color: 'white', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 16, transition: 'background 0.2s' }} title="Edit Product"><FaEdit /></button>
                  <button onClick={() => handleDelete(product.id)} style={{ background: 'linear-gradient(90deg, #c94f7c, #d47fa6)', color: 'white', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 16, transition: 'background 0.2s' }} title="Delete Product"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for add/edit */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(201,79,124,0.13)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInModal 0.25s' }}>
          <form onSubmit={handleSave} style={{ background: 'linear-gradient(120deg, #fff 60%, #fbeaec 100%)', borderRadius: 22, boxShadow: '0 8px 32px #fbeaec55', padding: 40, minWidth: 340, maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', animation: 'popIn 0.22s' }}>
            <button type="button" onClick={closeModal} style={{ position: 'absolute', top: 16, right: 18, background: 'none', border: 'none', color: '#c94f7c', fontSize: 26, fontWeight: 700, cursor: 'pointer', zIndex: 2, lineHeight: 1 }} aria-label="Close">×</button>
            <h3 style={{ color: '#c94f7c', fontWeight: 800, fontSize: 24, margin: 0, textAlign: 'center', letterSpacing: 1 }}>{editProduct ? 'Edit Product' : 'Add Product'}</h3>
            <label style={{ fontWeight: 700, color: '#b85c8b' }}>Name
              <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e9b6d0', fontSize: 17, marginTop: 7, background: '#fff8fa', transition: 'border 0.2s' }} />
            </label>
            <label style={{ fontWeight: 700, color: '#b85c8b' }}>Price
              <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e9b6d0', fontSize: 17, marginTop: 7, background: '#fff8fa', transition: 'border 0.2s' }} />
            </label>
            <label style={{ fontWeight: 700, color: '#b85c8b' }}>Description
              <textarea name="description" value={form.description} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e9b6d0', fontSize: 17, marginTop: 7, minHeight: 60, background: '#fff8fa', transition: 'border 0.2s' }} />
            </label>
            <label style={{ fontWeight: 700, color: '#b85c8b' }}>Image URL
              <input name="image" value={form.image} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e9b6d0', fontSize: 17, marginTop: 7, background: '#fff8fa', transition: 'border 0.2s' }} />
            </label>
            {form.image && (
              <div style={{ textAlign: 'center', margin: '10px 0' }}>
                <img src={form.image} alt="Preview" style={{ maxWidth: 120, maxHeight: 120, borderRadius: 10, boxShadow: '0 1px 6px #fbeaec' }} />
                <div style={{ color: '#b85c8b', fontSize: 13, marginTop: 4 }}>Image Preview</div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
              <button type="submit" disabled={saving} style={{ background: 'linear-gradient(90deg, #c94f7c, #b85c8b)', color: 'white', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 800, fontSize: 17, boxShadow: '0 2px 8px #fbeaec', cursor: 'pointer', flex: 1, transition: 'background 0.2s' }}>{saving ? 'Saving...' : (editProduct ? 'Update' : 'Add')}</button>
              <button type="button" onClick={closeModal} style={{ background: '#eee', color: '#c94f7c', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 800, fontSize: 17, boxShadow: '0 2px 8px #fbeaec', cursor: 'pointer', flex: 1, transition: 'background 0.2s' }}>Cancel</button>
            </div>
          </form>
          <style>{`
            @keyframes fadeInModal {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes popIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

function UsersSection() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [editUser, setEditUser] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', email: '', role: 'user', password: '' });
  const [saving, setSaving] = React.useState(false);
  const [search, setSearch] = React.useState('');

  // Fetch users
  React.useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  // Open modal for add/edit
  const openModal = (user = null) => {
    setEditUser(user);
    setForm(user ? { ...user, password: '' } : { name: '', email: '', role: 'user', password: '' });
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditUser(null);
    setForm({ name: '', email: '', role: 'user', password: '' });
  };

  // Handle form change
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Save (add or edit)
  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    const method = editUser ? 'PUT' : 'POST';
    const url = editUser ? `/api/users/${editUser.id}` : '/api/users';
    const body = { ...form };
    if (!editUser && !form.password) {
      toast.error('Password is required for new users');
      setSaving(false);
      return;
    }
    if (!form.name || !form.email || !form.role) {
      toast.error('All fields are required');
      setSaving(false);
      return;
    }
    if (editUser && !form.password) {
      delete body.password; // Don't send password if not changed
    }
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) {
      if (editUser) {
        setUsers(users.map(u => (u.id === editUser.id ? data.data : u)));
        toast.success('User updated!');
      } else {
        setUsers([...users, data.data]);
        toast.success('User added!');
      }
      closeModal();
    } else {
      toast.error(data.error || data.message || 'Failed to save user');
    }
    setSaving(false);
  };

  // Delete
  const handleDelete = async id => {
    if (!window.confirm('Delete this user?')) return;
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setUsers(users.filter(u => u.id !== id));
      toast.success('User deleted!');
    } else toast.error('Failed to delete user');
  };

  // Filtered users
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading users...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ width: '100%', background: 'rgba(255,255,255,0.8)', borderRadius: 28, boxShadow: '0 8px 32px #fbeaec55', padding: 44, minHeight: 500, display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start', position: 'relative', transition: 'box-shadow 0.2s' }}>
      <Toaster position="top-right" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', justifyContent: 'space-between' }}>
        <h2 style={{ color: '#b85c8b', fontWeight: 900, fontSize: 32, marginBottom: 0, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 14, textShadow: '0 2px 8px #fbeaec' }}><FaUserCircle /> User Management</h2>
        <button onClick={() => openModal()} style={{ background: 'linear-gradient(90deg, #b85c8b, #6e8fbf)', color: 'white', border: 'none', borderRadius: 14, padding: '12px 28px', fontWeight: 800, fontSize: 18, boxShadow: '0 2px 12px #fbeaec', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', transition: 'background 0.2s, box-shadow 0.2s', outline: 'none' }} title="Add User"><FaPlus /> Add User</button>
      </div>
      <div style={{ width: '100%', margin: '10px 0 20px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: 10, border: '1.5px solid #e9b6d0', fontSize: 16, width: 260, background: '#fff8fa', marginRight: 0 }}
        />
      </div>
      <div style={{ width: '100%', overflowX: 'auto', borderRadius: 18, boxShadow: '0 2px 12px #fbeaec33', background: 'rgba(255,255,255,0.95)' }}>
        <table style={{ width: '100%', borderRadius: 18, minWidth: 600, color: '#b85c8b', fontWeight: 600, fontSize: 16, borderCollapse: 'separate', borderSpacing: 0, overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(90deg, #fbeaec 60%, #f7e1f3 100%)' }}>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 800, fontSize: 17, color: '#b85c8b', borderTopLeftRadius: 18 }}>ID</th>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 800, fontSize: 17, color: '#b85c8b' }}>Avatar</th>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 800, fontSize: 17, color: '#b85c8b' }}>Name</th>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 800, fontSize: 17, color: '#b85c8b' }}>Email</th>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 800, fontSize: 17, color: '#b85c8b' }}>Role</th>
              <th style={{ padding: 16, textAlign: 'left', fontWeight: 800, fontSize: 17, color: '#b85c8b', borderTopRightRadius: 18 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} style={{ background: '#fff', transition: 'background 0.18s' }} onMouseOver={e => e.currentTarget.style.background = '#fbeaec44'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                <td style={{ padding: 14 }}>{user.id}</td>
                <td style={{ padding: 14 }}>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: '50%', boxShadow: '0 1px 6px #fbeaec' }} />
                  ) : (
                    <FaUserCircle style={{ fontSize: 36, color: '#e9b6d0' }} />
                  )}
                </td>
                <td style={{ padding: 14 }}>{user.name}</td>
                <td style={{ padding: 14 }}>{user.email}</td>
                <td style={{ padding: 14, textTransform: 'capitalize' }}>{user.role}</td>
                <td style={{ padding: 14 }}>
                  <button onClick={() => openModal(user)} style={{ marginRight: 8, background: 'linear-gradient(90deg, #6e8fbf, #b85c8b)', color: 'white', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 16, transition: 'background 0.2s' }} title="Edit User"><FaEdit /></button>
                  <button onClick={() => handleDelete(user.id)} style={{ background: 'linear-gradient(90deg, #c94f7c, #d47fa6)', color: 'white', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 16, transition: 'background 0.2s' }} title="Delete User"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for add/edit */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(201,79,124,0.13)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInModal 0.25s' }}>
          <form onSubmit={handleSave} style={{ background: 'linear-gradient(120deg, #fff 60%, #fbeaec 100%)', borderRadius: 22, boxShadow: '0 8px 32px #fbeaec55', padding: 40, minWidth: 340, maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', animation: 'popIn 0.22s' }}>
            <button type="button" onClick={closeModal} style={{ position: 'absolute', top: 16, right: 18, background: 'none', border: 'none', color: '#b85c8b', fontSize: 26, fontWeight: 700, cursor: 'pointer', zIndex: 2, lineHeight: 1 }} aria-label="Close">×</button>
            <h3 style={{ color: '#b85c8b', fontWeight: 800, fontSize: 24, margin: 0, textAlign: 'center', letterSpacing: 1 }}>{editUser ? 'Edit User' : 'Add User'}</h3>
            <label style={{ fontWeight: 700, color: '#b85c8b' }}>Name
              <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e9b6d0', fontSize: 17, marginTop: 7, background: '#fff8fa', transition: 'border 0.2s' }} />
            </label>
            <label style={{ fontWeight: 700, color: '#b85c8b' }}>Email
              <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e9b6d0', fontSize: 17, marginTop: 7, background: '#fff8fa', transition: 'border 0.2s' }} />
            </label>
            <label style={{ fontWeight: 700, color: '#b85c8b' }}>Role
              <select name="role" value={form.role} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e9b6d0', fontSize: 17, marginTop: 7, background: '#fff8fa', transition: 'border 0.2s' }}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label style={{ fontWeight: 700, color: '#b85c8b' }}>Password {editUser ? <span style={{ color: '#888', fontWeight: 400 }}>(leave blank to keep unchanged)</span> : null}
              <input name="password" type="password" value={form.password} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e9b6d0', fontSize: 17, marginTop: 7, background: '#fff8fa', transition: 'border 0.2s' }} />
            </label>
            <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
              <button type="submit" disabled={saving} style={{ background: 'linear-gradient(90deg, #b85c8b, #6e8fbf)', color: 'white', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 800, fontSize: 17, boxShadow: '0 2px 8px #fbeaec', cursor: 'pointer', flex: 1, transition: 'background 0.2s' }}>{saving ? 'Saving...' : (editUser ? 'Update' : 'Add')}</button>
              <button type="button" onClick={closeModal} style={{ background: '#eee', color: '#b85c8b', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 800, fontSize: 17, boxShadow: '0 2px 8px #fbeaec', cursor: 'pointer', flex: 1, transition: 'background 0.2s' }}>Cancel</button>
            </div>
          </form>
          <style>{`
            @keyframes fadeInModal {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes popIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

function OrdersSection() {
  return (
    <div style={{ width: '100%', background: 'rgba(255,255,255,0.7)', borderRadius: 22, boxShadow: '0 8px 32px #fbeaec33', padding: 40, minHeight: 500, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start', position: 'relative' }}>
      <h2 style={{ color: '#b85c8b', fontWeight: 800, fontSize: 28, marginBottom: 10, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 12 }}><FaClipboardList /> Order Management</h2>
      <div style={{ color: '#888', marginBottom: 18 }}>View and manage customer orders. (Interactive UI coming soon!)</div>
      <div style={{ width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #fbeaec', padding: 24, minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b85c8b', fontWeight: 600, fontSize: 18 }}>
        Order list will appear here.
      </div>
    </div>
  );
}

function IncomeSection() {
  // Example summary data (replace with real data as needed)
  const summary = {
    totalIncome: 12500,
    totalOrders: 320,
    totalUsers: 150,
  };
  // Example recent transactions (replace with real data as needed)
  const transactions = [
    { id: 1, user: 'Alice', amount: 120, date: '2024-06-01', status: 'Completed' },
    { id: 2, user: 'Bob', amount: 75, date: '2024-06-01', status: 'Completed' },
    { id: 3, user: 'Charlie', amount: 200, date: '2024-05-31', status: 'Refunded' },
    { id: 4, user: 'Diana', amount: 50, date: '2024-05-30', status: 'Completed' },
    { id: 5, user: 'Eve', amount: 300, date: '2024-05-29', status: 'Completed' },
  ];

  return (
    <div style={{ width: '100%', background: 'rgba(255,255,255,0.7)', borderRadius: 22, boxShadow: '0 8px 32px #fbeaec33', padding: 40, minHeight: 500, display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start', position: 'relative' }}>
      <h2 style={{ color: '#d47fa6', fontWeight: 800, fontSize: 28, marginBottom: 10, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 12 }}><FaChartBar /> Income Overview</h2>
      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: 32, width: '100%', marginBottom: 16 }}>
        <div style={{ flex: 1, background: 'linear-gradient(90deg, #fbeaec 60%, #f7e1f3 100%)', borderRadius: 18, boxShadow: '0 2px 8px #fbeaec', padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ color: '#d47fa6', fontWeight: 700, fontSize: 18 }}>Total Income</div>
          <div style={{ color: '#b85c8b', fontWeight: 900, fontSize: 32, marginTop: 8 }}>${summary.totalIncome.toLocaleString()}</div>
        </div>
        <div style={{ flex: 1, background: 'linear-gradient(90deg, #fbeaec 60%, #f7e1f3 100%)', borderRadius: 18, boxShadow: '0 2px 8px #fbeaec', padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ color: '#d47fa6', fontWeight: 700, fontSize: 18 }}>Total Orders</div>
          <div style={{ color: '#b85c8b', fontWeight: 900, fontSize: 32, marginTop: 8 }}>{summary.totalOrders}</div>
        </div>
        <div style={{ flex: 1, background: 'linear-gradient(90deg, #fbeaec 60%, #f7e1f3 100%)', borderRadius: 18, boxShadow: '0 2px 8px #fbeaec', padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ color: '#d47fa6', fontWeight: 700, fontSize: 18 }}>Total Users</div>
          <div style={{ color: '#b85c8b', fontWeight: 900, fontSize: 32, marginTop: 8 }}>{summary.totalUsers}</div>
        </div>
      </div>
      {/* Income Chart Placeholder */}
      <div style={{ width: '100%', background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #fbeaec', padding: 32, marginBottom: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ color: '#b85c8b', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Income Trend (Last 7 Days)</div>
        <div style={{ width: '100%', height: 120, background: 'repeating-linear-gradient(135deg, #fbeaec, #fbeaec 10px, #f7e1f3 10px, #f7e1f3 20px)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d47fa6', fontWeight: 600, fontSize: 18 }}>
          [Income Chart Placeholder]
        </div>
      </div>
      {/* Recent Transactions Table */}
      <div style={{ width: '100%', background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #fbeaec', padding: 24 }}>
        <div style={{ color: '#b85c8b', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Recent Transactions</div>
        <table style={{ width: '100%', borderRadius: 12, color: '#b85c8b', fontWeight: 600, fontSize: 16, borderCollapse: 'separate', borderSpacing: 0, overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(90deg, #fbeaec 60%, #f7e1f3 100%)' }}>
              <th style={{ padding: 12, textAlign: 'left', fontWeight: 800, fontSize: 16, color: '#d47fa6', borderTopLeftRadius: 12 }}>ID</th>
              <th style={{ padding: 12, textAlign: 'left', fontWeight: 800, fontSize: 16, color: '#d47fa6' }}>User</th>
              <th style={{ padding: 12, textAlign: 'left', fontWeight: 800, fontSize: 16, color: '#d47fa6' }}>Amount</th>
              <th style={{ padding: 12, textAlign: 'left', fontWeight: 800, fontSize: 16, color: '#d47fa6' }}>Date</th>
              <th style={{ padding: 12, textAlign: 'left', fontWeight: 800, fontSize: 16, color: '#d47fa6', borderTopRightRadius: 12 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} style={{ background: '#fff', transition: 'background 0.18s' }} onMouseOver={e => e.currentTarget.style.background = '#fbeaec44'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                <td style={{ padding: 10 }}>{tx.id}</td>
                <td style={{ padding: 10 }}>{tx.user}</td>
                <td style={{ padding: 10 }}>${tx.amount}</td>
                <td style={{ padding: 10 }}>{tx.date}</td>
                <td style={{ padding: 10, color: tx.status === 'Completed' ? '#4caf50' : '#c94f7c', fontWeight: 700 }}>{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsSection() {
  // Example admin profile data (replace with real data as needed)
  const [profile, setProfile] = React.useState({
    name: 'Admin User',
    email: 'admin@admin.com',
    avatar: '',
  });
  // Initialize form state from profile only once
  const [form, setForm] = React.useState({ name: 'Admin User', email: 'admin@admin.com', password: '' });
  const [saving, setSaving] = React.useState(false);
  const [theme, setTheme] = React.useState('light');

  // Remove useEffect that resets form state from profile

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = e => {
    e.preventDefault();
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setProfile(p => ({ ...p, name: form.name, email: form.email }));
      setSaving(false);
      toast.success('Profile updated!');
    }, 1000);
  };

  const handleThemeToggle = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
    toast.success(`Theme set to ${theme === 'light' ? 'Dark' : 'Light'}`);
  };

  return (
    <div style={{ width: '100%', background: 'rgba(255,255,255,0.7)', borderRadius: 22, boxShadow: '0 8px 32px #fbeaec33', padding: 40, minHeight: 500, display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start', position: 'relative' }}>
      <h2 style={{ color: '#a86ebf', fontWeight: 800, fontSize: 28, marginBottom: 10, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 12 }}><FaCog /> Settings</h2>
      {/* Admin Profile Card */}
      <div style={{ display: 'flex', gap: 32, width: '100%', marginBottom: 16 }}>
        <div style={{ flex: 1, background: 'linear-gradient(90deg, #fbeaec 60%, #f7e1f3 100%)', borderRadius: 18, boxShadow: '0 2px 8px #fbeaec', padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: '50%', boxShadow: '0 1px 6px #fbeaec', marginBottom: 12 }} />
          ) : (
            <FaUserCircle style={{ fontSize: 64, color: '#e9b6d0', marginBottom: 12 }} />
          )}
          <div style={{ color: '#a86ebf', fontWeight: 900, fontSize: 22 }}>{profile.name}</div>
          <div style={{ color: '#b85c8b', fontWeight: 600, fontSize: 16 }}>{profile.email}</div>
        </div>
        {/* Profile Update Form */}
        <form onSubmit={handleSave} style={{ flex: 2, background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #fbeaec', padding: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ color: '#a86ebf', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Update Profile</div>
          <label style={{ fontWeight: 700, color: '#b85c8b' }}>Name
            <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e9b6d0', fontSize: 17, marginTop: 7, background: '#fff8fa', transition: 'border 0.2s', color: '#000' }} />
          </label>
          <label style={{ fontWeight: 700, color: '#b85c8b' }}>Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e9b6d0', fontSize: 17, marginTop: 7, background: '#fff8fa', transition: 'border 0.2s', color: '#000' }} />
          </label>
          <label style={{ fontWeight: 700, color: '#b85c8b' }}>Password <span style={{ color: '#888', fontWeight: 400 }}>(leave blank to keep unchanged)</span>
            <input name="password" type="password" value={form.password} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e9b6d0', fontSize: 17, marginTop: 7, background: '#fff8fa', transition: 'border 0.2s', color: '#000' }} />
          </label>
          <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
            <button type="submit" disabled={saving} style={{ background: 'linear-gradient(90deg, #a86ebf, #6e8fbf)', color: 'white', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 800, fontSize: 17, boxShadow: '0 2px 8px #fbeaec', cursor: 'pointer', flex: 1, transition: 'background 0.2s' }}>{saving ? 'Saving...' : 'Update'}</button>
          </div>
        </form>
      </div>
      {/* Platform Settings */}
      <div style={{ width: '100%', background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #fbeaec', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18 }}>
        <div style={{ color: '#a86ebf', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Platform Settings</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ color: '#b85c8b', fontWeight: 600, fontSize: 16 }}>Theme:</span>
          <button type="button" onClick={handleThemeToggle} style={{ background: theme === 'light' ? 'linear-gradient(90deg, #fbeaec, #fff)' : 'linear-gradient(90deg, #a86ebf, #b85c8b)', color: theme === 'light' ? '#a86ebf' : 'white', border: 'none', borderRadius: 10, padding: '10px 24px', fontWeight: 700, fontSize: 16, boxShadow: '0 2px 8px #fbeaec', cursor: 'pointer', transition: 'background 0.2s' }}>{theme === 'light' ? 'Light' : 'Dark'}</button>
        </div>
        <div style={{ color: '#888', fontSize: 15, marginTop: 8 }}>More platform settings coming soon...</div>
      </div>
    </div>
  );
}

export default AdminDashboard; 