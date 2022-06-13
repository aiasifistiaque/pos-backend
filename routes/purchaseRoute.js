import express from 'express';
import addPurchaseController from '../controllers/purchase/addPurchaseController.js';
import getallPurchasesController from '../controllers/purchase/getAllPurchasesController.js';
import getPurchaseByIdController from '../controllers/purchase/getPurchaseByIdController.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.get(
	'/',
	protect,
	store('add-purchases'),
	sort,
	getallPurchasesController
);
router.post('/', protect, store('read-purchases'), addPurchaseController);
router.get('/:id', protect, store('read-purchases'), getPurchaseByIdController);

export default router;
