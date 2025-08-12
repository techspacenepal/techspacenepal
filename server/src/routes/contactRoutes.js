import express from 'express';
import {
  getContacts,
  createContact,
  deleteContact,
  markContactsSeen,
  
} from '../controllers/contactController.js';

const router = express.Router();

router.get('/', getContacts);
router.post('/', createContact);
router.delete('/:id', deleteContact);
// ✅ ADD this new route
router.put('/mark-seen', markContactsSeen);

export default router;
