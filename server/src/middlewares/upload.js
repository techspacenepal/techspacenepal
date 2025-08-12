import multer from "multer";
import path from "path";

// Destination and filename for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/courses"); // 🔥 ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e8);
    const ext = path.extname(file.originalname);
    cb(null, "thumbnail-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });
export default upload;
