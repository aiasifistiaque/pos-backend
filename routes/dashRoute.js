import express from 'express';
import getDashInfo from '../controllers/dash/getDashInfo.js';
import getSalesReport from '../controllers/dash/getSalesReport.js';
import getTopProductsController from '../controllers/dash/getTopProductsController.js';

import { protect } from '../middleware/auth.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.get('/', protect, store, getDashInfo);
router.get('/sales', protect, store, getSalesReport);
router.get('/top', protect, store, getTopProductsController);

export default router;
