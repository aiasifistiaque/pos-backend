import express from 'express';
import addEmployeeController from '../controllers/employee/addEmployeeController.js';
import getEmployeesController from '../controllers/employee/getEmployeesController.js';

import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.post('/', protect, store('add-employees'), addEmployeeController);
router.get('/', protect, store('read-employees'), sort, getEmployeesController);

export default router;
