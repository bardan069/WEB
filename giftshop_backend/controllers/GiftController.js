const Gift = require('../models/Gift');

// @desc    Get all gifts
// @route   GET /api/v1/gifts
// @access  Public
exports.getGifts = async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.status(200).json({ success: true, data: gifts });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get a single gift by ID
// @route   GET /api/v1/gifts/:id
// @access  Public
exports.getGiftById = async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id);
    if (!gift) {
      return res.status(404).json({ success: false, error: 'Gift not found' });
    }
    res.status(200).json({ success: true, data: gift });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create a new gift
// @route   POST /api/v1/gifts
// @access  Admin
exports.createGift = async (req, res) => {
  try {
    const { name, brand, category, description, price, originalPrice, discount, stock, isAvailable, isFeatured, rating, numReviews, tags, shippingInfo } = req.body;
    let images = [];
    if (req.file) {
      images.push(`/uploads/${req.file.filename}`);
    }
    const gift = await Gift.create({
      name,
      brand,
      category,
      description,
      price,
      originalPrice,
      discount,
      images,
      stock,
      isAvailable,
      isFeatured,
      rating,
      numReviews,
      tags,
      shippingInfo: shippingInfo ? JSON.parse(shippingInfo) : undefined
    });
    res.status(201).json({ success: true, data: gift });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Update a gift
// @route   PUT /api/v1/gifts/:id
// @access  Admin
exports.updateGift = async (req, res) => {
  try {
    const updateFields = { ...req.body };
    if (req.file) {
      updateFields.images = [`/uploads/${req.file.filename}`];
    }
    // If shippingInfo is a string, parse it
    if (typeof updateFields.shippingInfo === 'string') {
      try {
        updateFields.shippingInfo = JSON.parse(updateFields.shippingInfo);
      } catch {}
    }
    const gift = await Gift.findByIdAndUpdate(req.params.id, updateFields, { new: true, runValidators: true });
    if (!gift) {
      return res.status(404).json({ success: false, error: 'Gift not found' });
    }
    res.status(200).json({ success: true, data: gift });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Delete a gift
// @route   DELETE /api/v1/gifts/:id
// @access  Admin
exports.deleteGift = async (req, res) => {
  try {
    const gift = await Gift.findByIdAndDelete(req.params.id);
    if (!gift) {
      return res.status(404).json({ success: false, error: 'Gift not found' });
    }
    res.status(200).json({ success: true, message: 'Gift deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}; 