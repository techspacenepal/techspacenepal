import express from "express";
import multer from "multer";
import path from "path";
import { getAll, create, update, remove } from "../controllers/testimonialController.js";

const router = express.Router();

// Upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getAll);
router.post("/", upload.single("image"), create);
router.put("/:id", upload.single("image"), update);
router.delete("/:id", remove);

export default router;
