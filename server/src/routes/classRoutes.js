// // import express from "express";
// // import multer from "multer";
// // import {
// //   createClass,
// //   getAllClasses,
// //   updateClass,
// //   deleteClass
// // } from "../controllers/classController.js";

// // const router = express.Router();

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => cb(null, "uploads/"),
// //   filename: (req, file, cb) =>
// //     cb(null, Date.now() + "-" + file.originalname)
// // });
// // const upload = multer({ storage });

// // // Routes
// // router.get("/", getAllClasses);
// // router.post("/", upload.single("image"), createClass);
// // router.put("/:id", upload.single("image"), updateClass);
// // router.delete("/:id", deleteClass);

// // export default router;
// import express from "express";
// import multer from "multer";
// import {
//   createClass,
//   getAllClasses,
//   updateClass,
//   deleteClass,
//   addSecondTimeDate, // Import the new controller function
// } from "../controllers/classController.js";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + "-" + file.originalname)
// });
// const upload = multer({ storage });

// // Existing Routes
// router.get("/", getAllClasses);
// router.post("/", upload.single("image"), createClass);
// router.put("/:id", upload.single("image"), updateClass);
// router.delete("/:id", deleteClass);

// // NEW PATCH Route to add/edit second time and date
// router.patch("/:id/second-time", addSecondTimeDate);

// export default router;
import express from "express";
import multer from "multer";
import {
  createClass,
  getAllClasses,
  updateClass,
  deleteClass,
  addSecondSchedule,
  updateSecondSchedule,
  deleteSecondSchedule,
} from "../controllers/classController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", getAllClasses);
router.post("/", upload.single("image"), createClass);
router.put("/:id", upload.single("image"), updateClass);
router.delete("/:id", deleteClass);

// Add new second time/date
router.patch("/:id/second-time", addSecondSchedule);

// Update second time/date by index
router.patch("/:id/second-time/:index", updateSecondSchedule);

// Delete second time/date by index
router.delete("/:id/second-time/:index", deleteSecondSchedule);

export default router;
