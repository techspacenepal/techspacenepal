import express from 'express';
import { getStats, createStat, updateStat, deleteStat } from '../controllers/statController.js';

const router = express.Router();

router.get('/', getStats);
router.post('/', createStat);
router.put('/:id', updateStat);
router.delete('/:id', deleteStat);

export default router;
