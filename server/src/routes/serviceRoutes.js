import express from "express";
import multer from "multer";
import path from "path";
import {
  getServices,
  createService,
  deleteService,
  updateService,
} from "../controllers/serviceController.js";

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getServices);
router.post("/", upload.single("image"), createService);
router.delete("/:id", deleteService);
router.put("/:id", upload.single("image"), updateService);

export default router;
