import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controller/productController.js';
const router = express.Router();

router.post('/', createProduct); // admin only
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct); // admin only
router.delete('/:id', deleteProduct); // admin only

export default router; 