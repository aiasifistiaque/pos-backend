import express from 'express';
import addSaleController from '../controllers/sale/addSaleController.js';
import getAllSalesController from '../controllers/sale/getAllSalesController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getAllSalesController);
router.post('/', protect, addSaleController);

export default router;
