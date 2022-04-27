import express from 'express';
import addNewBrandController from '../controllers/brand/addNewBrandController.js';
import addNewProductController from '../controllers/product/addNewProductController.js';
import getAllProductsController from '../controllers/product/getAllProductsController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, addNewProductController);
router.get('/', getAllProductsController);

export default router;
