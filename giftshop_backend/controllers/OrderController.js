const asyncHandler = require("../middleware/async");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Gift = require("../models/Gift");
const { protect, authorize } = require("../middleware/auth");

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
exports.createOrder = asyncHandler(async (req, res, next) => {
  console.log('Order creation request body:', req.body);
  const { shippingAddress, paymentMethod, notes, items, subtotal, tax, shippingCost, totalAmount } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    console.log('No items provided in order request');
    return res.status(400).json({
      success: false,
      message: "No items in order"
    });
  }

  // Validate stock and calculate totals
  let calcSubtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const gift = await Gift.findById(item.gift);
    if (!gift) {
      return res.status(400).json({
        success: false,
        message: `Gift not found: ${item.gift}`
      });
    }
    if (!gift.isAvailable) {
      return res.status(400).json({
        success: false,
        message: `${gift.name} is not available`
      });
    }
    if (gift.stock < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for ${gift.name}`
      });
    }
    const itemTotal = item.price * item.quantity;
    calcSubtotal += itemTotal;
    orderItems.push({
      gift: gift._id,
      quantity: item.quantity,
      price: item.price
    });
  }

  // Calculate tax and shipping if not provided
  const finalSubtotal = subtotal || calcSubtotal;
  const finalTax = typeof tax === 'number' ? tax : finalSubtotal * 0.1;
  const finalShippingCost = typeof shippingCost === 'number' ? shippingCost : (finalSubtotal > 1000 ? 0 : 50);
  const finalTotalAmount = typeof totalAmount === 'number' ? totalAmount : (finalSubtotal + finalTax + finalShippingCost);

  try {
    // Create order
    const order = await Order.create({
      customer: req.user.id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal: finalSubtotal,
      tax: finalTax,
      shippingCost: finalShippingCost,
      totalAmount: finalTotalAmount,
      notes
    });

    // Update gift stock
    for (const item of orderItems) {
      await Gift.findByIdAndUpdate(item.gift, {
        $inc: { stock: -item.quantity }
      });
    }

    // Populate order details
    await order.populate({
      path: 'items.gift',
      select: 'name brand price images'
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order
    });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ success: false, message: 'Order creation failed', error: err.message });
  }
});

// @desc    Get user's orders
// @route   GET /api/v1/orders
// @access  Private
exports.getUserOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ customer: req.user.id })
    .populate({
      path: 'items.gift',
      select: 'name brand price images'
    })
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc    Get single order
// @route   GET /api/v1/orders/:id
// @access  Private
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: 'items.gift',
    select: 'name brand price images'
  });

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found"
    });
  }

  // Check if user owns this order or is admin
  if (order.customer.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: "Access denied"
    });
  }

  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc    Get all orders (Admin only)
// @route   GET /api/v1/orders/admin/all
// @access  Private (Admin)
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only."
    });
  }

  const orders = await Order.find()
    .populate({
      path: 'customer',
      select: 'fname lname email'
    })
    .populate({
      path: 'items.gift',
      select: 'name brand price'
    })
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc    Update order status (Admin only)
// @route   PUT /api/v1/orders/:id/status
// @access  Private (Admin)
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only."
    });
  }

  const { orderStatus, paymentStatus, trackingNumber, estimatedDelivery } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found"
    });
  }

  const updateData = {};
  if (orderStatus) updateData.orderStatus = orderStatus;
  if (paymentStatus) updateData.paymentStatus = paymentStatus;
  if (trackingNumber) updateData.trackingNumber = trackingNumber;
  if (estimatedDelivery) updateData.estimatedDelivery = estimatedDelivery;

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  ).populate({
    path: 'items.gift',
    select: 'name brand price images'
  });

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: updatedOrder
  });
});

// @desc    Cancel order
// @route   PUT /api/v1/orders/:id/cancel
// @access  Private
exports.cancelOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found"
    });
  }

  // Check if user owns this order or is admin
  if (order.customer.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: "Access denied"
    });
  }

  // Only allow cancellation if order is pending or confirmed
  if (!['pending', 'confirmed'].includes(order.orderStatus)) {
    return res.status(400).json({
      success: false,
      message: "Order cannot be cancelled at this stage"
    });
  }

  order.orderStatus = 'cancelled';
  await order.save();

  // Restore stock if order was confirmed
  if (order.orderStatus === 'confirmed') {
    for (const item of order.items) {
      await Gift.findByIdAndUpdate(item.gift, {
        $inc: { stock: item.quantity }
      });
    }
  }

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: order
  });
}); 