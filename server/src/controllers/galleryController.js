import Gallery from "../models/Gallery.js";

export const createGallery = async (req, res) => {
  try {
    const { student, college, company, designation, faculty  } = req.body;
    const imageUrl = "/uploads/" + req.file.filename;

    const newGallery = await Gallery.create({ student, college, faculty, designation, imageUrl, company});
    res.status(201).json(newGallery);
  } catch (error) {
    console.error("Error creating gallery:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(galleries);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    res.status(500).json({ message: "Server error" });
  }
};
