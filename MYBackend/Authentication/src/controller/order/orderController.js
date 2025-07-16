import { Order } from '../../models/order/Order.js';
import { OrderItem } from '../../models/order/OrderItem.js';
import { User } from '../../models/user/User.js';
import { Product } from '../../models/product/Product.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { user, products, total } = req.body;
    // Create the order
    const order = await Order.create({ userId: user, total });
    // Create order items
    if (Array.isArray(products)) {
      for (const item of products) {
        await OrderItem.create({
          orderId: order.id,
          productId: item.product,
          quantity: item.quantity,
        });
      }
    }
    const createdOrder = await Order.findByPk(order.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: OrderItem, include: [{ model: Product }] }
      ]
    });
    res.status(201).json(createdOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: OrderItem, include: [{ model: Product }] }
      ]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: OrderItem, include: [{ model: Product }] }
      ]
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    await OrderItem.destroy({ where: { orderId: order.id } });
    await order.destroy();
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 