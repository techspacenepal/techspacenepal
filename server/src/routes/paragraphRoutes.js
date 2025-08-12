import express from 'express';
import {
  getParagraph,
  createParagraph,
  updateParagraph,
  deleteParagraph,
} from '../controllers/paragraphController.js';

const router = express.Router();

router.get('/', getParagraph);
router.post('/create', createParagraph);
router.put('/:id', updateParagraph);
router.delete('/:id', deleteParagraph);

export default router;
