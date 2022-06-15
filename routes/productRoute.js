import express from 'express';
import addNewProductController from '../controllers/product/addNewProductController.js';
import editProductContoller from '../controllers/product/editProductController.js';
import getAllProductsController from '../controllers/product/getAllProductsController.js';
import getProductById from '../controllers/product/getProductById.js';

import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.post('/', protect, store('add-products'), addNewProductController);
router.get(
	'/',
	protect,
	store('read-products'),
	sort,
	getAllProductsController
);
router.get('/:id', protect, store('read-products'), getProductById);
router.put('/:id', protect, store('edit-products'), editProductContoller);

export default router;
