import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  createAbout,
  getAbout,
  updateAbout,
  deleteAbout
} from '../controllers/aboutController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), createAbout);
router.get('/', getAbout);
router.put('/:id', upload.single('image'), updateAbout);
router.delete('/:id', deleteAbout);

export default router;
