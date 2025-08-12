import express from 'express';
import {
  getInquiries,
  createInquiry,
  deleteInquiry,
  markInquiriesSeen,
  
  // ✅ import this
} from '../controllers/inquiryController.js';

const router = express.Router();

router.get('/', getInquiries);
router.post('/', createInquiry);
router.delete('/:id', deleteInquiry);

// ✅ new route
router.put('/mark-seen', markInquiriesSeen);

export default router;
