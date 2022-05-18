import express from 'express';
import addSaleController from '../controllers/sale/addSaleController.js';
import getAllSalesController from '../controllers/sale/getAllSalesController.js';
import { protect } from '../middleware/auth.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.get('/', protect, store, getAllSalesController);
router.post('/', protect, store, addSaleController);

export default router;
