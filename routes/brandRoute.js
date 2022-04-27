import express from 'express';
import addNewBrandController from '../controllers/brand/addNewBrandController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, addNewBrandController);
//router.get('/', getAllCategoriesController);

export default router;
