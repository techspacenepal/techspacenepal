import Inquiry from '../models/Inquiry.js';

// Create new inquiry
export const createInquiry = async (req, res) => {
  try {
    const { fullName, email, mobile, course, message } = req.body;

    if (!fullName || !email || !mobile || !course || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newInquiry = new Inquiry({ fullName, email, mobile, course, message });
    await newInquiry.save();

    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry: newInquiry });
  } catch (error) {
    console.error('Inquiry error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all inquiries
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ inquiries });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch inquiries' });
  }
};

// Delete inquiry
export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findByIdAndDelete(id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete inquiry' });
  }
};



// Mark all inquiries as seen
export const markInquiriesSeen = async (req, res) => {
  try {
    await Inquiry.updateMany({ seen: false }, { $set: { seen: true } });
    res.status(200).json({ message: 'All inquiries marked as seen' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark inquiries as seen' });
  }
};





