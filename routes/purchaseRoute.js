import express from 'express';
import addPurchaseController from '../controllers/purchase/addPurchaseController.js';
import getallPurchasesController from '../controllers/purchase/getAllPurchasesController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getallPurchasesController);
router.post('/', protect, addPurchaseController);

export default router;
