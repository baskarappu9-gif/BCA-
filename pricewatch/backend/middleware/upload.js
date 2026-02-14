import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, path.join(__dirname, '../uploads/images'));
    } else if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
      cb(null, path.join(__dirname, '../uploads/csv'));
    } else {
      cb(null, path.join(__dirname, '../uploads/other'));
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allow images and CSV files
  if (file.mimetype.startsWith('image/') || 
      file.mimetype === 'text/csv' || 
      file.mimetype === 'application/vnd.ms-excel') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and CSV files are allowed.'), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB default
  }
});

export default upload;
