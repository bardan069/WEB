import { User } from '../models/user/User.js';
import { Role } from '../models/user/Role.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = await Role.findOne({ where: { name: role || 'customer' } });
    if (!userRole) return res.status(400).json({ error: 'Invalid role' });
    const user = await User.create({ name, email, password: hashedPassword, roleId: userRole.id });
    res.status(201).json({ message: 'User created', user: { id: user.id, name: user.name, email: user.email, role: userRole.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, include: [Role] });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.Role.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.Role.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const assignRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const userRole = await Role.findOne({ where: { name: role } });
    if (!userRole) return res.status(400).json({ error: 'Invalid role' });
    user.roleId = userRole.id;
    await user.save();
    res.json({ message: 'Role updated', user: { id: user.id, name: user.name, email: user.email, role: userRole.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 