import Class from "../models/Class.js";

// 📥 POST - create
export const createClass = async (req, res) => {
  try {
    const { title, date, time, duration } = req.body;
    const imageUrl = "/uploads/" + req.file.filename;
    const newClass = new Class({ title, date, time, duration, imageUrl });
    await newClass.save();
    res.status(201).json({ message: "Class created", data: newClass });
  } catch (error) {
    res.status(500).json({ message: "Failed to create class", error });
  }
};

// 📤 GET - all
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({ createdAt: -1 });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch classes" });
  }
};

// ✏️ PUT - update
export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) {
      updates.imageUrl = "/uploads/" + req.file.filename;
    }
    const updated = await Class.findByIdAndUpdate(id, updates, { new: true });
    res.json({ message: "Updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update", error });
  }
};

// 🗑️ DELETE
export const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete", error });
  }
};
