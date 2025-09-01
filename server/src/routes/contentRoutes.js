import express from 'express';
import { getContent, createContent, updateContent, deleteContent } from '../controllers/contentController.js';

const router = express.Router();

router.get('/', getContent);
router.post('/', createContent);
router.put('/:id', updateContent);
router.delete('/:id', deleteContent);

export default router;
