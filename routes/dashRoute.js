import express from 'express';
import getDashInfo from '../controllers/dash/getDashInfo.js';

import { protect } from '../middleware/auth.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.get('/', protect, store, getDashInfo);

export default router;
