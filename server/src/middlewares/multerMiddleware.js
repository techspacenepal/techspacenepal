import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Directory where images will be stored
const storageDir = path.join('uploads', 'sliders');

// Ensure folder exists
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storageDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Export multer middleware
const uploadSlider = multer({ storage });

export default uploadSlider;
