import express from 'express';
import addNewBrandController from '../controllers/brand/addNewBrandController.js';
import getAllBrandsController from '../controllers/brand/getAllBrandsController.js';

import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.post('/', protect, store, addNewBrandController);
router.get('/', protect, store, sort, getAllBrandsController);

export default router;
