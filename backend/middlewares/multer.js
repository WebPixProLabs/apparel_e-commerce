import multer from "multer";
import path from "path";

// Set the storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store files in the 'uploads' directory, ensure it exists
    cb(null, path.resolve('uploads')); // Use 'path.resolve' to get the absolute path
  },
  filename: (req, file, cb) => {
    // Create a unique filename using Date.now() to avoid conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize the multer instance with the storage configuration
const upload = multer({ storage: storage });

export default upload;
