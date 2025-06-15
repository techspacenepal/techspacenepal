import express from "express";
import multer from "multer";
import {
  createClass,
  getAllClasses,
  updateClass,
  deleteClass
} from "../controllers/classController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Routes
router.get("/", getAllClasses);
router.post("/", upload.single("image"), createClass);
router.put("/:id", upload.single("image"), updateClass);
router.delete("/:id", deleteClass);

export default router;
