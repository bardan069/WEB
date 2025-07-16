import express from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controller/favoriteController.js';
const router = express.Router();

router.post('/', addFavorite);
router.delete('/:id', removeFavorite);
router.get('/', getFavorites);

export default router; 