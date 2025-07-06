const { body } = require('express-validator');
const { validatePassword, isValidEmail } = require('../utils/validation');

// Login validation
const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 1 })
    .withMessage('Password cannot be empty')
];

// Signup validation
const signupValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail()
    .custom(async (email) => {
      const User = require('../models/User');
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already exists');
      }
      return true;
    }),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .custom((password) => {
      const validation = validatePassword(password);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }
      return true;
    }),
  
  body('confirmPassword')
    .notEmpty()
    .withMessage('Please confirm your password')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

// Password change validation
const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .custom((password) => {
      const validation = validatePassword(password);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }
      return true;
    }),
  
  body('confirmPassword')
    .notEmpty()
    .withMessage('Please confirm your new password')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.newPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

// Profile update validation
const profileUpdateValidation = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail()
    .custom(async (email, { req }) => {
      if (email === req.user.email) {
        return true; // Same email, no need to check
      }
      const User = require('../models/User');
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already exists');
      }
      return true;
    }),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please enter a valid phone number'),
  
  body('address')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Address must be less than 200 characters')
];

module.exports = {
  loginValidation,
  signupValidation,
  changePasswordValidation,
  profileUpdateValidation
}; 