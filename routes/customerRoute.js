import express from 'express';
import addCustomerController from '../controllers/customer/addCustomerController.js';
import getAllCustomersController from '../controllers/customer/getAllCustomersController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, addCustomerController);
router.get('/', protect, getAllCustomersController);

export default router;
