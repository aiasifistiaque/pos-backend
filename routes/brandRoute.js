import express from 'express';
import addNewBrandController from '../controllers/brand/addNewBrandController.js';
import getAllBrandsController from '../controllers/brand/getAllBrandsController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, addNewBrandController);
router.get('/', getAllBrandsController);

export default router;
