import Content from '../models/ContentModel.js';

export const getContent = async (req, res) => {
  try {
    const content = await Content.findOne();
    res.json(content || null);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createContent = async (req, res) => {
  try {
    await Content.deleteMany(); // ensure only one
    const newContent = new Content(req.body);
    await newContent.save();
    res.json(newContent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    const updated = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteContent = async (req, res) => {
  try {
    await Content.deleteMany();
    res.json({ message: 'Content deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
