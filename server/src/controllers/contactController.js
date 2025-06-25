// controllers/contactController.js
import Contact from '../models/Contact.js';

export const createContact = async (req, res) => {
  try {
    const { name, email, mobile, course, message } = req.body;

    if (!name || !email || !mobile || !course) {
      return res.status(400).json({ error: 'Please fill all required fields' });
    }

    const contact = new Contact({ name, email, mobile, course, message });
    await contact.save();

    res.status(201).json({ message: 'Contact inquiry submitted successfully' });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete inquiry
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Inquiry not found' });

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
// @desc    Get all inquiries
export const getContacts = async (req, res) => {
  try {
    const inquiries = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};




// Similarly for contacts
// Mark all contacts as seen
export const markContactsSeen = async (req, res) => {
  try {
    await Contact.updateMany({ seen: false }, { $set: { seen: true } });
    res.status(200).json({ message: 'All contacts marked as seen' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark contacts as seen' });
  }
};
