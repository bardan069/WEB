const express = require('express');
const router = express.Router();

// Import controller
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  refreshToken,
  logout,
  verifyToken
} = require('../controllers/authController');

// Import middleware
const { protect } = require('../middleware/auth');

// Import validation schemas
const {
  loginValidation,
  signupValidation,
  changePasswordValidation,
  profileUpdateValidation
} = require('../validators/auth');

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', signupValidation, register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', loginValidation, login);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh', refreshToken);

/**
 * @route   POST /api/auth/verify
 * @desc    Verify token
 * @access  Public
 */
router.post('/verify', verifyToken);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', protect, getProfile);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', protect, profileUpdateValidation, updateProfile);

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.put('/change-password', protect, changePasswordValidation, changePassword);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', protect, logout);

module.exports = router; 