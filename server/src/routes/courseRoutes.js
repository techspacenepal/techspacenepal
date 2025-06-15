// src/routes/courses.js

import express from 'express';
import multer from 'multer';
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
router.get('/', getCourses);                             // GET all
router.post('/', upload.single('image'), addCourse);     // ADD
router.put('/:id', upload.single('image'), updateCourse); // UPDATE ✅
router.delete('/:id', deleteCourse);                      // DELETE ✅

export default router;
