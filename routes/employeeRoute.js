import express from 'express';
import addEmployeeController from '../controllers/employee/addEmployeeController.js';
import getEmployeesController from '../controllers/employee/getEmployeesController.js';

import { protect } from '../middleware/auth.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.post('/', protect, store, addEmployeeController);
router.get('/', protect, store, getEmployeesController);

export default router;
