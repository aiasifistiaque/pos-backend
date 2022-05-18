import express from 'express';
import getSelf from '../controllers/user/getSelf.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getSelf);

export default router;
