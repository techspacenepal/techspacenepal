import Contact from '../models/Contact.js';

// @desc    Get all inquiries
export const getContacts = async (req, res) => {
  try {
    const inquiries = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create new inquiry
export const createContact = async (req, res) => {
  const { fullName, email, mobile, course, message } = req.body;

  if (!fullName || !email || !mobile || !course) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  try {
    const newContact = new Contact({ fullName, email, mobile, course, message });
    await newContact.save();
    res.status(201).json({ message: 'Inquiry submitted successfully' });
  } catch (err) {
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
