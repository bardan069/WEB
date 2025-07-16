import { User } from '../models/user/User.js';
import { Role } from '../models/user/Role.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Helper to get user from JWT
const getUserFromToken = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.split(' ')[1];
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findByPk(decoded.id, { include: [Role] });
  } catch {
    return null;
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    res.json({ id: user.id, name: user.name, email: user.email, role: user.Role.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    const { name, email, password } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.json({ message: 'Profile updated', user: { id: user.id, name: user.name, email: user.email, role: user.Role.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    if (!user || user.Role.name !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    const users = await User.findAll({ include: [Role] });
    res.json(users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.Role.name })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 