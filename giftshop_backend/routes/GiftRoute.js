const express = require('express');
const router = express.Router();
const { getGifts, getGiftById, createGift, deleteGift, updateGift } = require('../controllers/GiftController');
const upload = require('../middleware/uploads');

// @route   GET /api/v1/gifts
router.get('/', getGifts);
router.get('/:id', getGiftById);
// @route   POST /api/v1/gifts
router.post('/', upload.single('image'), createGift);
// @route   PUT /api/v1/gifts/:id
router.put('/:id', upload.single('image'), updateGift);
// @route   DELETE /api/v1/gifts/:id
router.delete('/:id', deleteGift);

module.exports = router; 