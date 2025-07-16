import express from 'express';
import { getProfile, updateProfile, listUsers } from '../controller/userController.js';
const router = express.Router();

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/', listUsers); // admin only

export default router; 