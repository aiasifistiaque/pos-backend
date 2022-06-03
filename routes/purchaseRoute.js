import express from 'express';
import addPurchaseController from '../controllers/purchase/addPurchaseController.js';
import getallPurchasesController from '../controllers/purchase/getAllPurchasesController.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.get('/', protect, store, sort, getallPurchasesController);
router.post('/', protect, store, addPurchaseController);

export default router;
