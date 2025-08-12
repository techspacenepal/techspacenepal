// // utils/multer.ts
// import multer, { StorageEngine } from "multer";
// import path from "path";

// // Storage configuration
// const storage: StorageEngine = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// // Optional: file filter for image uploads
// const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed"));
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
// });

// export default upload;



import multer from "multer";
import path from "path";
import fs from "fs";

// Folder creation helper
const ensureDir = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = path.join(process.cwd(), "uploads", "others");

    if (file.fieldname === "video") {
      folder = path.join(process.cwd(), "uploads", "videos");
    } else if (file.fieldname === "assignmentFile") {
      folder = path.join(process.cwd(), "uploads", "assignments");
    } else if (file.fieldname === "image") {
      folder = path.join(process.cwd(), "uploads", "images");
    }

    ensureDir(folder);
    console.log(`Uploading ${file.fieldname} to folder:`, folder);
    cb(null, folder);
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

// File filter for allowed file types
const fileFilter = (req, file, cb) => {
  const imageTypes = /jpeg|jpg|png|gif/;
  const videoTypes = /mp4|mov|avi|mkv/;
  const docTypes = /pdf|doc|docx/;

  const ext = path.extname(file.originalname).toLowerCase().substring(1);
  const mime = file.mimetype;

  if (file.fieldname === "image") {
    if (imageTypes.test(ext) && mime.startsWith("image/")) return cb(null, true);
  } else if (file.fieldname === "video") {
    if (videoTypes.test(ext)) return cb(null, true);
  } else if (file.fieldname === "assignmentFile") {
    if (docTypes.test(ext) || videoTypes.test(ext)) return cb(null, true);
  }

  return cb(new Error(`Invalid file type for field: ${file.fieldname}`));
};

// Export the multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // Max 100MB
});

export default upload;
