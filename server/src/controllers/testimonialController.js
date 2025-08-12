import Testimonial from "../models/Testimonial.js";

// GET all
export const getAll = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST
export const create = async (req, res) => {
  try {
    const { name, course, message } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const testimonial = new Testimonial({ name, course, message, image });
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT
export const update = async (req, res) => {
  try {
    const { name, course, message } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = { name, course, message };
    if (image) updateData.image = image;

    const updated = await Testimonial.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
export const remove = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
