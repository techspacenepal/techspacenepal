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
