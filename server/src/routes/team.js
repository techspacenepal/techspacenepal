// import express from "express";

// const router = express.Router();

// // Example: GET all team members
// router.get("/", async (req, res) => {
//   // For demo, send dummy data or fetch from DB
//   const teamMembers = [
//     { id: 1, name: "Samir", role: "Mentor", bio: "IT trainer", image: "/images/samir.jpg" },
//     { id: 2, name: "Anisha", role: "Developer", bio: "Fullstack dev", image: "/images/anisha.jpg" },
//   ];
//   res.json(teamMembers);
// });

// // Example: POST new team member
// router.post("/", async (req, res) => {
//   const newMember = req.body;
//   // Here, save newMember to DB (pseudo code)
//   // const savedMember = await db.save(newMember);
//   res.status(201).json({ message: "Team member added", member: newMember });
// });

// // Example: DELETE team member by id
// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;
//   // Here, delete from DB by id (pseudo code)
//   // await db.delete(id);
//   res.json({ message: `Team member with id ${id} deleted` });
// });

// export default router;


// import express from "express";

// const router = express.Router();

// // Example: GET all team members
// router.get("/", async (req, res) => {
//   // For demo, send dummy data or fetch from DB
//   const teamMembers = [
//     { id: 1, name: "Samir", role: "Mentor", bio: "IT trainer", image: "/images/samir.jpg" },
//     { id: 2, name: "Anisha", role: "Developer", bio: "Fullstack dev", image: "/images/anisha.jpg" },
//   ];
//   res.json(teamMembers);
// });

// // Example: POST new team member
// router.post("/", async (req, res) => {
//   const newMember = req.body;
//   // Here, save newMember to DB (pseudo code)
//   // const savedMember = await db.save(newMember);
//   res.status(201).json({ message: "Team member added", member: newMember });
// });

// // Example: DELETE team member by id
// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;
//   // Here, delete from DB by id (pseudo code)
//   // await db.delete(id);
//   res.json({ message: `Team member with id ${id} deleted` });
// });

// export default router;
// routes/team.js
import express from "express";
import multer from "multer";
import Team from "../models/Team.js";
import path from "path";
import { fileURLToPath } from "url";

// Multer storage
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();

// GET all team members
router.get("/", async (req, res) => {
  const team = await Team.find();
  res.json(team);
});

// POST new team member
router.post("/", upload.single("image"), async (req, res) => {
  const { name, role, bio } = req.body;
  const image = req.file ? req.file.filename : null;

  const newMember = new Team({ name, role, bio, image });
  await newMember.save();
  res.json(newMember);
});

// PUT update team member
router.put("/:id", upload.single("image"), async (req, res) => {
  const { name, role, bio } = req.body;
  const image = req.file ? req.file.filename : undefined;

  const updateData = { name, role, bio };
  if (image) updateData.image = image;

  const updated = await Team.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(updated);
});

// DELETE team member
router.delete("/:id", async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
