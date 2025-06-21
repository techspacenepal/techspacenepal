// controllers/announcementController.js
import Announcement from "../models/announcementModel.js";

export const postAnnouncement = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newAnnouncement = new Announcement({
      title,
      content,
      author,
      date: new Date(),
    });
    await newAnnouncement.save();
    res.status(201).json({ message: "Announcement posted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to post announcement" });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch announcements" });
  }
};



export const deleteAnnouncement = async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Announcement not found' });
    res.json({ message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting announcement' });
  }
};