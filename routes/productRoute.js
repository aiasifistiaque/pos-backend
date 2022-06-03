import express from 'express';
import addNewProductController from '../controllers/product/addNewProductController.js';
import getAllProductsController from '../controllers/product/getAllProductsController.js';
import getProductById from '../controllers/product/getProductById.js';

import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.post('/', protect, store, addNewProductController);
router.get('/', protect, store, sort, getAllProductsController);
router.get('/:id', getProductById);

export default router;
