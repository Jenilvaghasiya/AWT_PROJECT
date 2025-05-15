const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  addPerfume,
  getPerfumes,
  addCustomPerfume,
  deletePerfume,
  updatePerfume,
  getPerfumeById,  // Uncommented this function
} = require('../controllers/perfumeController');

// Upload configuration
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
router.post('/add', upload.single('image'), addPerfume);
router.get('/list', getPerfumes);
router.post('/custom', addCustomPerfume);
router.delete('/delete/:id', deletePerfume);
router.put('/update/:id', upload.single('image'), updatePerfume);

// Add route to fetch perfume by ID
router.get('/:id', getPerfumeById);  // Uncommented this line

module.exports = router;
