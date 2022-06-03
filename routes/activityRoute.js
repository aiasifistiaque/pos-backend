import express from 'express';
import getActivitiesController from '../controllers/activity/getActivitiesController.js';

import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.get('/', protect, store, sort, getActivitiesController);

export default router;
