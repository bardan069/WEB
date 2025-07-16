import express from 'express';
import { signup, login, assignRole } from '../controller/authController.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/assign-role', assignRole);

export default router; 