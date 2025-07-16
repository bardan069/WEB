import express from 'express';
import * as orderController from '../../controller/order/orderController.js';

const orderRouter = express.Router();

// Create order
orderRouter.post('/', orderController.createOrder);
// Get all orders
orderRouter.get('/', orderController.getOrders);
// Get order by ID
orderRouter.get('/:id', orderController.getOrderById);
// Update order status
orderRouter.patch('/:id/status', orderController.updateOrderStatus);
// Delete order
orderRouter.delete('/:id', orderController.deleteOrder);

export { orderRouter }; 