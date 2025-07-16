import React, { useState, useEffect } from 'react';
import { FaBoxOpen, FaClipboardList, FaChartBar, FaCog, FaPlus, FaEdit, FaTrash, FaUserCircle } from 'react-icons/fa';

const dashboardSections = [
  { key: 'products', title: 'Products', icon: <FaBoxOpen />, color: '#c94f7c' },
  { key: 'orders', title: 'Orders', icon: <FaClipboardList />, color: '#b85c8b' },
  { key: 'income', title: 'Income', icon: <FaChartBar />, color: '#d47fa6' },
  { key: 'settings', title: 'Settings', icon: <FaCog />, color: '#a86ebf' },
];

const AdminDashboard = () => {
  const [active, setActive] = useState('products');

  return (
    <div style={{ minHeight: '100vh', height: '100vh', width: '100vw', background: 'linear-gradient(120deg, #fbeaec 0%, #f7e1f3 100%)', display: 'flex', alignItems: 'stretch', justifyContent: 'stretch', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: 90, background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(12px)', borderRight: '1.5px solid #fbeaec', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0', gap: 24, boxShadow: '2px 0 16px #fbeaec22', zIndex: 2 }}>
        <FaUserCircle style={{ fontSize: 38, color: '#c94f7c', marginBottom: 18 }} />
        {dashboardSections.map(section => (
          <button
            key={section.key}
            onClick={() => setActive(section.key)}
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
          {active === 'orders' && <OrdersSection />}
          {active === 'income' && <IncomeSection />}
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
      } else {
        setProducts([...products, data.data]);
      }
      closeModal();
    } else {
      alert(data.error || data.message || 'Failed to save product');
    }
    setSaving(false);
  };

  // Delete
  const handleDelete = async id => {
    if (!window.confirm('Delete this product?')) return;
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) setProducts(products.filter(p => p.id !== id));
    else alert('Failed to delete product');
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ width: '100%', background: 'rgba(255,255,255,0.8)', borderRadius: 28, boxShadow: '0 8px 32px #fbeaec55', padding: 44, minHeight: 500, display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start', position: 'relative', transition: 'box-shadow 0.2s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', justifyContent: 'space-between' }}>
        <h2 style={{ color: '#c94f7c', fontWeight: 900, fontSize: 32, marginBottom: 0, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 14, textShadow: '0 2px 8px #fbeaec' }}><FaBoxOpen /> Product Management</h2>
        <button onClick={() => openModal()} style={{ background: 'linear-gradient(90deg, #c94f7c, #b85c8b)', color: 'white', border: 'none', borderRadius: 14, padding: '12px 28px', fontWeight: 800, fontSize: 18, boxShadow: '0 2px 12px #fbeaec', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', transition: 'background 0.2s, box-shadow 0.2s', outline: 'none' }} onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 16px #c94f7c44'} onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 12px #fbeaec'}><FaPlus /> Add Product</button>
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
            {products.map(product => (
              <tr key={product.id} style={{ background: '#fff', transition: 'background 0.18s' }} onMouseOver={e => e.currentTarget.style.background = '#fbeaec44'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                <td style={{ padding: 14 }}>{product.id}</td>
                <td style={{ padding: 14 }}>{product.name}</td>
                <td style={{ padding: 14 }}>{product.price}</td>
                <td style={{ padding: 14 }}>{product.description}</td>
                <td style={{ padding: 14 }}>
                  {product.image ? <img src={product.image} alt={product.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 10, boxShadow: '0 1px 6px #fbeaec' }} /> : <span style={{ color: '#ccc' }}>No image</span>}
                </td>
                <td style={{ padding: 14 }}>
                  <button onClick={() => openModal(product)} style={{ marginRight: 8, background: 'linear-gradient(90deg, #6e8fbf, #b85c8b)', color: 'white', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 16, transition: 'background 0.2s' }}><FaEdit /></button>
                  <button onClick={() => handleDelete(product.id)} style={{ background: 'linear-gradient(90deg, #c94f7c, #d47fa6)', color: 'white', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 16, transition: 'background 0.2s' }}><FaTrash /></button>
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
  return (
    <div style={{ width: '100%', background: 'rgba(255,255,255,0.7)', borderRadius: 22, boxShadow: '0 8px 32px #fbeaec33', padding: 40, minHeight: 500, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start', position: 'relative' }}>
      <h2 style={{ color: '#d47fa6', fontWeight: 800, fontSize: 28, marginBottom: 10, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 12 }}><FaChartBar /> Income Overview</h2>
      <div style={{ color: '#888', marginBottom: 18 }}>See income analytics and reports. (Interactive UI coming soon!)</div>
      <div style={{ width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #fbeaec', padding: 24, minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b85c8b', fontWeight: 600, fontSize: 18 }}>
        Income stats and charts will appear here.
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div style={{ width: '100%', background: 'rgba(255,255,255,0.7)', borderRadius: 22, boxShadow: '0 8px 32px #fbeaec33', padding: 40, minHeight: 500, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start', position: 'relative' }}>
      <h2 style={{ color: '#a86ebf', fontWeight: 800, fontSize: 28, marginBottom: 10, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 12 }}><FaCog /> Settings</h2>
      <div style={{ color: '#888', marginBottom: 18 }}>Edit admin profile and platform settings. (Interactive UI coming soon!)</div>
      <div style={{ width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #fbeaec', padding: 24, minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b85c8b', fontWeight: 600, fontSize: 18 }}>
        Settings form will appear here.
      </div>
    </div>
  );
}

export default AdminDashboard; 