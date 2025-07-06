const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken, generateRefreshToken } = require('../middleware/auth');
const { MESSAGES } = require('../config/constants');

class AuthService {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Object} - User data and tokens
   */
  async register(userData) {
    const { firstName, lastName, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error(MESSAGES.ERROR.USER_EXISTS || 'User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    // Generate tokens
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token to user
    user.refreshToken = refreshToken;
    await user.save();

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      token,
      refreshToken
    };
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Object} - User data and tokens
   */
  async login(email, password) {
    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error(MESSAGES.ERROR.INVALID_CREDENTIALS);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(MESSAGES.ERROR.INVALID_CREDENTIALS);
    }

    // Generate tokens
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token to user
    user.refreshToken = refreshToken;
    await user.save();

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      token,
      refreshToken
    };
  }

  /**
   * Get current user profile
   * @param {string} userId - User ID
   * @returns {Object} - User profile data
   */
  async getProfile(userId) {
    const user = await User.findById(userId).select('-password -refreshToken');
    if (!user) {
      throw new Error(MESSAGES.ERROR.USER_NOT_FOUND);
    }
    return user;
  }

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} updateData - Profile update data
   * @returns {Object} - Updated user data
   */
  async updateProfile(userId, updateData) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(MESSAGES.ERROR.USER_NOT_FOUND);
    }

    // Check if email is being changed and if it already exists
    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await User.findOne({ email: updateData.email });
      if (existingUser) {
        throw new Error('Email already exists');
      }
    }

    // Update user
    Object.assign(user, updateData);
    await user.save();

    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address
    };
  }

  /**
   * Change user password
   * @param {string} userId - User ID
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {boolean} - Success status
   */
  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new Error(MESSAGES.ERROR.USER_NOT_FOUND);
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    return true;
  }

  /**
   * Refresh access token
   * @param {string} refreshToken - Refresh token
   * @returns {Object} - New access token
   */
  async refreshToken(refreshToken) {
    const user = await User.findOne({ refreshToken });
    if (!user) {
      throw new Error('Invalid refresh token');
    }

    // Generate new access token
    const newToken = generateToken(user._id);

    return {
      token: newToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    };
  }

  /**
   * Logout user
   * @param {string} userId - User ID
   * @returns {boolean} - Success status
   */
  async logout(userId) {
    const user = await User.findById(userId);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    return true;
  }

  /**
   * Verify token and get user
   * @param {string} token - JWT token
   * @returns {Object} - User data
   */
  async verifyToken(token) {
    const jwt = require('jsonwebtoken');
    const { JWT_CONFIG } = require('../config/constants');

    try {
      const decoded = jwt.verify(token, JWT_CONFIG.SECRET);
      const user = await User.findById(decoded.id).select('-password -refreshToken');
      
      if (!user) {
        throw new Error(MESSAGES.ERROR.USER_NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

module.exports = new AuthService(); 