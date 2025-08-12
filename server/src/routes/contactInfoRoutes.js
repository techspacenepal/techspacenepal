import express from 'express';
import { getContactInfo, updateContactInfo, deleteContactInfo } from '../controllers/contactInfoController.js';

const router = express.Router();

router.get('/', getContactInfo);
router.post('/', updateContactInfo);
router.delete('/', deleteContactInfo); // Optional

export default router;
