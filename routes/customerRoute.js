import express from 'express';
import addCustomerController from '../controllers/customer/addCustomerController.js';
import getAllCustomersController from '../controllers/customer/getAllCustomersController.js';

import { protect } from '../middleware/auth.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.post('/', protect, store, addCustomerController);
router.get('/', protect, store, getAllCustomersController);

export default router;
