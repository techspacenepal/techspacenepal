import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure 'uploads' folder exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const schema = new mongoose.Schema({
  student: String,
  college: String,
  faculty: String,
  company: String,
  designation: String,
  imageUrl: String,
});
const Item = mongoose.models.Item || mongoose.model('Item', schema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  const items = await Item.find().sort({ _id: -1 });
  res.json(items);
});

router.post('/', upload.single('image'), async (req, res) => {
  const { student, college, company, designation, faculty } = req.body;
  if (!student || !college || !company || !designation || !faculty || !req.file) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  const item = await Item.create({ student, college, company, faculty, designation, imageUrl });
  res.json({ message: 'Upload successful', item });
});

router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { student, college, company, designation, faculty } = req.body;
  const update = { student, college, company, designation, faculty };
  if (req.file) {
    update.imageUrl = `/uploads/${req.file.filename}`;
  }
  const item = await Item.findByIdAndUpdate(id, update, { new: true });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByIdAndDelete(id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
