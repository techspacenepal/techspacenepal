import Paragraph from '../models/paragraphModel.js';

// GET single paragraph (assuming only 1)
export const getParagraph = async (req, res) => {
  try {
    const paragraph = await Paragraph.findOne();
    res.status(200).json(paragraph || {});
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching paragraph.' });
  }
};

// CREATE new paragraph
export const createParagraph = async (req, res) => {
  try {
    const { content } = req.body;
    const newParagraph = new Paragraph({ content });
    await newParagraph.save();
    res.status(201).json(newParagraph);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create paragraph.' });
  }
};

// UPDATE paragraph
export const updateParagraph = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updated = await Paragraph.findByIdAndUpdate(id, { content }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update paragraph.' });
  }
};

// DELETE paragraph
export const deleteParagraph = async (req, res) => {
  try {
    const { id } = req.params;
    await Paragraph.findByIdAndDelete(id);
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete paragraph.' });
  }
};
