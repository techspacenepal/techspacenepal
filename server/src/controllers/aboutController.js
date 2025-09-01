import About from '../models/aboutModel.js';
import fs from 'fs';
import path from 'path';

export const createAbout = async (req, res) => {
  try {
    console.log('Form Data Received:', req.body);
    console.log('Image Received:', req.file);

    const { title, description, phone, email } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const about = new About({ title, description, phone, email, imageUrl });
    await about.save();
    res.status(201).json(about);
  } catch (error) {
    console.error('Create Error:', error);
    res.status(500).json({ message: 'Failed to create about section', error });
  }
};

export const getAbout = async (req, res) => {
  try {
    const abouts = await About.find().sort({ createdAt: -1 });
    res.status(200).json(abouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch about data', error });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, phone, email } = req.body;
    const about = await About.findById(id);
    if (!about) return res.status(404).json({ message: 'Not found' });

    if (req.file) {
      // Delete old image
      if (about.imageUrl) {
        const oldPath = path.join('public', about.imageUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      about.imageUrl = `/uploads/${req.file.filename}`;
    }

    about.title = title;
    about.description = description;
    about.phone = phone;
    about.email = email;

    await about.save();
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update about', error });
  }
};

export const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findById(id);
    if (!about) return res.status(404).json({ message: 'Not found' });

    // Delete image
    if (about.imageUrl) {
      const imagePath = path.join('public', about.imageUrl);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await About.findByIdAndDelete(id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete', error });
  }
};
