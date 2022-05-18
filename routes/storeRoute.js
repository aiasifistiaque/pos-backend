import express from 'express';
import addNewStoreController from '../controllers/store/addNewStore.js';
import getMyStoresController from '../controllers/store/getMyStores.js';
import getStoreDataController from '../controllers/store/getStoreData.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, addNewStoreController);
router.get('/', protect, getMyStoresController);
router.get('/:id', protect, getStoreDataController);

export default router;
