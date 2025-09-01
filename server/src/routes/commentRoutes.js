import express from 'express';
import { createComment, getCommentsByBlogId } from '../controllers/commentController.js';

const router = express.Router();

router.post('/', createComment);
router.get('/:blogId', getCommentsByBlogId);

export default router;
