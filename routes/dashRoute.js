import express from 'express';
import getDashInfo from '../controllers/dash/getDashInfo.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getDashInfo);

export default router;
