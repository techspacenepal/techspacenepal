import express from "express";
import multer from "multer";
import path from "path";
import { createGallery, getAllGallery } from "../controllers/galleryController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post("/", upload.single("image"), createGallery);
router.get("/", getAllGallery);

export default router;
