import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) throw new Error('Failed to fetch order');
        const data = await res.json();
        setOrder(data);
        setStatus(data.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleStatusChange = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update status');
      const data = await res.json();
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!order) return <div>No order found</div>;

  return (
    <div>
      <h2>Order Details</h2>
      <p><strong>ID:</strong> {order._id}</p>
      <p><strong>User:</strong> {order.user?.name || order.user?._id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> {order.total}</p>
      <h3>Products</h3>
      <ul>
        {order.products.map((item, idx) => (
          <li key={idx}>
            {item.product?.name || item.product?._id} (x{item.quantity})
          </li>
        ))}
      </ul>
      <form onSubmit={handleStatusChange}>
        <label>
          Update Status:
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        <button type="submit" disabled={updating}>Update</button>
      </form>
    </div>
  );
};

export default OrderDetailsPage; 