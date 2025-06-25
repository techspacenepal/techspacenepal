import express from 'express';
import {
  getServices,
  createService,
  deleteService,
  updateService // ✅ NEWLY added import
} from '../controllers/serviceController.js';

const router = express.Router();

// Routes
router.get('/', getServices);
router.post('/', createService);
router.delete('/:id', deleteService);

// ✅ NEW route added for update service
router.put('/:id', updateService);

export default router;
