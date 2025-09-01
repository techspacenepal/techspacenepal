import express from "express";
import multer from "multer";
import { uploadLogo, getLogo, deleteLogo } from "../controllers/logoController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "public/uploads", // Make sure this folder exists
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/", upload.single("image"), uploadLogo);
router.get("/", getLogo);
router.delete("/:id", deleteLogo);

export default router;
