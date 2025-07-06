const { STATUS_CODES } = require('../config/constants');

/**
 * Success Response Handler
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {*} data - Response data
 */
const successResponse = (res, statusCode = STATUS_CODES.OK, message = 'Success', data = null) => {
  const response = {
    success: true,
    message,
    ...(data && { data })
  };

  return res.status(statusCode).json(response);
};

/**
 * Error Response Handler
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {*} error - Error details (optional)
 */
const errorResponse = (res, statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR, message = 'Internal server error', error = null) => {
  const response = {
    success: false,
    message,
    ...(error && process.env.NODE_ENV === 'development' && { error: error.message })
  };

  return res.status(statusCode).json(response);
};

/**
 * Validation Error Response Handler
 * @param {Object} res - Express response object
 * @param {Array} errors - Validation errors array
 */
const validationErrorResponse = (res, errors) => {
  return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
    success: false,
    message: 'Validation error',
    errors
  });
};

/**
 * Pagination Response Handler
 * @param {Object} res - Express response object
 * @param {Array} data - Response data
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @param {string} message - Success message
 */
const paginatedResponse = (res, data, page, limit, total, message = 'Data retrieved successfully') => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const response = {
    success: true,
    message,
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage,
      hasPrevPage
    }
  };

  return res.status(STATUS_CODES.OK).json(response);
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse,
  paginatedResponse
}; 