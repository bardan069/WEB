import express from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controller/categoryController.js';
const router = express.Router();

router.post('/', createCategory); // admin only
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory); // admin only
router.delete('/:id', deleteCategory); // admin only

export default router; 