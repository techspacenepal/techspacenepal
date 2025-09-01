import express from 'express';
import multer from 'multer';
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  addBlogView,
  getBlogViews,
} from '../controllers/blogController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getAllBlogs);
router.post('/', upload.single('image'), createBlog);
router.put('/:id', upload.single('image'), updateBlog);
router.delete('/:id', deleteBlog);

router.post('/:blogId/view', addBlogView);
router.get('/:blogId/views', getBlogViews);

export default router;
