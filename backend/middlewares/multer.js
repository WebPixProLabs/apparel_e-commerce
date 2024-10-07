import multer from "multer";
import path from "path";

// Configure storage options for Multer
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(process.cwd(), "./uploads/")); // Use process.cwd() instead
    },
    filename: function (req, file, callback) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      callback(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  

// Create the upload middleware
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Optional: Limit file size to 2MB
    fileFilter: (req, file, callback) => {
        // Restrict file type if needed (e.g., allow only images)
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);

        if (extName && mimeType) {
            return callback(null, true);
        } else {
            callback(new Error("Only image files are allowed!"));
        }
    },
});

export default upload;
