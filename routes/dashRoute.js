import express from 'express';
import getDashInfo from '../controllers/dash/getDashInfo.js';
import getKpiController from '../controllers/dash/getKpiContoller.js';
import getSalesReport from '../controllers/dash/getSalesReport.js';
import getTopProductsController from '../controllers/dash/getTopProductsController.js';
import lowStockController from '../controllers/dash/lowStockController.js';

import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.get('/', protect, store('read-analytics'), getDashInfo);
router.get('/sales', protect, store('read-analytics'), getSalesReport);
router.get('/top', protect, store('read-analytics'), getTopProductsController);
router.get(
	'/lowstock',
	protect,
	store('read-analytics'),
	sort,
	lowStockController
);
router.get('/kpi', protect, store('read-analytics'), getKpiController);

export default router;
