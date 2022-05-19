import express from 'express';
import getActivitiesController from '../controllers/activity/getActivitiesController.js';

import { protect } from '../middleware/auth.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.get('/', protect, store, getActivitiesController);

export default router;
