import express from "express";
import { createRegistration, deleteRegistration, getAllRegistrations } from "../controllers/upcommingregistrationController.js";


const router = express.Router();

// Create a new registration
router.post("/register", createRegistration);

// Get all registrations (admin only)
router.get("/", getAllRegistrations);
router.delete("/:id", deleteRegistration);

export default router;
