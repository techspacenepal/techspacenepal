import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import {
  getSlides,
  uploadSlide,
  updateSlide,
  deleteSlide,
} from '../controllers/homeslideController.js';

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/slides';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get('/', getSlides);
router.post('/upload', upload.single('file'), uploadSlide);
router.put('/:id', upload.single('file'), updateSlide);
router.delete('/:id', deleteSlide);

export default router;
