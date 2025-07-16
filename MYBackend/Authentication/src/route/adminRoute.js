import express from 'express';
import { dashboard, manageUser, manageProduct, manageOrder, manageCategory } from '../controller/adminController.js';
const router = express.Router();

router.get('/dashboard', dashboard);
router.put('/user/:id', manageUser);
router.put('/product/:id', manageProduct);
router.put('/order/:id', manageOrder);
router.put('/category/:id', manageCategory);

export default router; 