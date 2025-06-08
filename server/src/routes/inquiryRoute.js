import express from 'express';
import {
  createInquiry,
  getInquiries,
  deleteInquiry,
} from '../controllers/inquiryController.js';

const router = express.Router();

router.post('/', createInquiry);
router.get('/', getInquiries);
router.delete('/:id', deleteInquiry);

export default router;
