import ContactInfo from '../models/contactInfoModel.js';

// GET
export const getContactInfo = async (req, res) => {
  try {
    const info = await ContactInfo.findOne();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST or PUT
export const updateContactInfo = async (req, res) => {
  try {
    const existing = await ContactInfo.findOne();
    if (existing) {
      const updated = await ContactInfo.findByIdAndUpdate(existing._id, req.body, { new: true });
      res.json(updated);
    } else {
      const created = await ContactInfo.create(req.body);
      res.json(created);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE (optional)
export const deleteContactInfo = async (req, res) => {
  try {
    await ContactInfo.deleteMany();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
