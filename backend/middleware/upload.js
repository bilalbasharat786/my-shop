// server/middleware/upload.js
import multer from 'multer';
import path from 'path';

// Storage setting: Kahan save karna hai aur file ka naam kya hoga
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 'uploads' folder mein save karo
  },
  filename: function (req, file, cb) {
    // File ka naam unique banane ke liye current time add kar rahe hain
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

// Upload middleware create karna
const upload = multer({ storage: storage });

export default upload;