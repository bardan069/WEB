const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { validateRequest } = require('../utils/validation');
const { MESSAGES, STATUS_CODES } = require('../config/constants');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  // Validate request
  if (!validateRequest(req, res)) return;

  const { firstName, lastName, email, password } = req.body;

  const result = await authService.register({
    firstName,
    lastName,
    email,
    password
  });

  successResponse(
    res,
    STATUS_CODES.CREATED,
    MESSAGES.SUCCESS.SIGNUP,
    result
  );
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  // Validate request
  if (!validateRequest(req, res)) return;

  const { email, password } = req.body;

  const result = await authService.login(email, password);

  successResponse(
    res,
    STATUS_CODES.OK,
    MESSAGES.SUCCESS.LOGIN,
    result
  );
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user.id);

  successResponse(
    res,
    STATUS_CODES.OK,
    'Profile retrieved successfully',
    { user }
  );
});

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  // Validate request
  if (!validateRequest(req, res)) return;

  const updatedUser = await authService.updateProfile(req.user.id, req.body);

  successResponse(
    res,
    STATUS_CODES.OK,
    MESSAGES.SUCCESS.PROFILE_UPDATE,
    { user: updatedUser }
  );
});

/**
 * @desc    Change user password
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
const changePassword = asyncHandler(async (req, res) => {
  // Validate request
  if (!validateRequest(req, res)) return;

  const { currentPassword, newPassword } = req.body;

  await authService.changePassword(req.user.id, currentPassword, newPassword);

  successResponse(
    res,
    STATUS_CODES.OK,
    MESSAGES.SUCCESS.PASSWORD_CHANGE
  );
});

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh
 * @access  Public
 */
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return errorResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      'Refresh token is required'
    );
  }

  const result = await authService.refreshToken(refreshToken);

  successResponse(
    res,
    STATUS_CODES.OK,
    'Token refreshed successfully',
    result
  );
});

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user.id);

  successResponse(
    res,
    STATUS_CODES.OK,
    MESSAGES.SUCCESS.LOGOUT
  );
});

/**
 * @desc    Verify token
 * @route   POST /api/auth/verify
 * @access  Public
 */
const verifyToken = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return errorResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      'Token is required'
    );
  }

  const user = await authService.verifyToken(token);

  successResponse(
    res,
    STATUS_CODES.OK,
    'Token is valid',
    { user }
  );
});

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  refreshToken,
  logout,
  verifyToken
}; 