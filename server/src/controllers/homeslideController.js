import Slide from '../models/homeModel.js';
import fs from 'fs';
import path from 'path';

export const getSlides = async (req, res) => {
  try {
    const slides = await Slide.find().sort({ createdAt: -1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch slides' });
  }
};

export const uploadSlide = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const slide = new Slide({
      title,
      description,
      src: `/uploads/slides/${req.file.filename}`,
      type: 'image',
    });

    await slide.save();
    res.status(201).json(slide);
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' });
  }
};

export const updateSlide = async (req, res) => {
  try {
    const { title, description } = req.body;
    const slide = await Slide.findById(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Slide not found' });

    slide.title = title;
    slide.description = description;

    if (req.file) {
      const oldPath = path.join(path.resolve(), slide.src);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      slide.src = `/uploads/slides/${req.file.filename}`;
    }

    await slide.save();
    res.json(slide);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

export const deleteSlide = async (req, res) => {
  try {
    const slide = await Slide.findByIdAndDelete(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Slide not found' });

    const filePath = path.join(path.resolve(), slide.src);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};
