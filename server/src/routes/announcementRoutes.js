// routes/announcementRoutes.js
import express from "express";
import { deleteAnnouncement, getAnnouncements, postAnnouncement } from "../controllers/announcementController.js";


const router = express.Router();

router.post("/", postAnnouncement);
router.get("/", getAnnouncements);
router.delete('/:id', deleteAnnouncement);

export default router;
