import Logo from "../models/logomodels.js";
import fs from "fs";
import path from "path";

export const uploadLogo = async (req, res) => {
  try {
    const imageUrl = req.file.filename; // filename only
    await Logo.deleteMany(); // Keep only one logo
    const logo = new Logo({ imageUrl });
    await logo.save();
    res.status(201).json(logo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logo upload failed" });
  }
};

export const getLogo = async (req, res) => {
  try {
    const logo = await Logo.findOne();
    if (!logo) return res.status(404).json({ message: "No logo found" });
    res.status(200).json(logo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get logo" });
  }
};

export const deleteLogo = async (req, res) => {
  try {
    const logo = await Logo.findOne();
    if (!logo) return res.status(404).json({ message: "Logo not found" });

    const filePath = path.join("public/uploads", logo.imageUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Logo.deleteMany();
    res.status(200).json({ message: "Logo deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete logo" });
  }
};
