// JWT Configuration
const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET || 'your-secret-key',
  EXPIRE: process.env.JWT_EXPIRE || '7d',
  REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '30d'
};

// Rate Limiting Configuration
const RATE_LIMIT_CONFIG = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100, // limit each IP to 100 requests per windowMs
  MESSAGE: 'Too many requests from this IP, please try again later.'
};

// File Upload Configuration
const FILE_UPLOAD_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  UPLOAD_PATH: 'uploads/'
};

// Pagination Configuration
const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

// User Roles
const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
};

// Order Status
const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// Payment Status
const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

// API Response Messages
const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login successful',
    LOGOUT: 'Logout successful',
    SIGNUP: 'Account created successfully',
    PROFILE_UPDATE: 'Profile updated successfully',
    PASSWORD_CHANGE: 'Password changed successfully',
    PRODUCT_CREATED: 'Product created successfully',
    PRODUCT_UPDATED: 'Product updated successfully',
    PRODUCT_DELETED: 'Product deleted successfully',
    ORDER_CREATED: 'Order created successfully',
    ORDER_UPDATED: 'Order updated successfully'
  },
  ERROR: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_NOT_FOUND: 'User not found',
    PRODUCT_NOT_FOUND: 'Product not found',
    ORDER_NOT_FOUND: 'Order not found',
    UNAUTHORIZED: 'Not authorized',
    FORBIDDEN: 'Access denied',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Internal server error'
  }
};

// HTTP Status Codes
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
};

module.exports = {
  JWT_CONFIG,
  RATE_LIMIT_CONFIG,
  FILE_UPLOAD_CONFIG,
  PAGINATION_CONFIG,
  USER_ROLES,
  ORDER_STATUS,
  PAYMENT_STATUS,
  MESSAGES,
  STATUS_CODES
}; 