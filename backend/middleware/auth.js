const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_CONFIG, MESSAGES, STATUS_CODES } = require('../config/constants');
const { errorResponse } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Protect routes - require authentication
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_CONFIG.SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return errorResponse(res, STATUS_CODES.UNAUTHORIZED, MESSAGES.ERROR.USER_NOT_FOUND);
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return errorResponse(res, STATUS_CODES.UNAUTHORIZED, 'Not authorized, token failed');
    }
  }

  if (!token) {
    return errorResponse(res, STATUS_CODES.UNAUTHORIZED, 'Not authorized, no token');
  }
});

/**
 * Optional auth - doesn't require authentication but adds user if available
 */
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_CONFIG.SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Token is invalid, but we don't fail the request
      console.error('Optional auth error:', error);
    }
  }

  next();
});

/**
 * Admin only middleware
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return errorResponse(res, STATUS_CODES.FORBIDDEN, MESSAGES.ERROR.FORBIDDEN);
  }
};

/**
 * Role-based authorization middleware
 * @param {string|Array} roles - Allowed roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, STATUS_CODES.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED);
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(res, STATUS_CODES.FORBIDDEN, MESSAGES.ERROR.FORBIDDEN);
    }

    next();
  };
};

/**
 * Generate JWT token
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_CONFIG.SECRET, {
    expiresIn: JWT_CONFIG.EXPIRE
  });
};

/**
 * Generate refresh token
 * @param {string} id - User ID
 * @returns {string} Refresh token
 */
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, JWT_CONFIG.SECRET, {
    expiresIn: JWT_CONFIG.REFRESH_EXPIRE
  });
};

/**
 * Verify token without throwing error
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded token or null
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_CONFIG.SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  protect,
  optionalAuth,
  admin,
  authorize,
  generateToken,
  generateRefreshToken,
  verifyToken
}; 