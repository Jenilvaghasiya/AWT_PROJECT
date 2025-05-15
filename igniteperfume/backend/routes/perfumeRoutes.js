// path: backend/routes/perfumeRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const { Perfume } = require('../models/Perfume'); // Regular perfume model
const CustomPerfume = require('../models/CustomPerfume'); // Custom perfume model
const router = express.Router();

// Upload configuration for image
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generates unique filename
  }
});
const upload = multer({ storage });

// Regular Perfume Routes

// Add a regular perfume
router.post('/add', upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file?.filename || ''; // Store the image filename

  try {
    const perfume = new Perfume({ name, description, price, image });
    await perfume.save();
    res.json({ message: "Perfume added successfully", perfume });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add perfume', error: err.message });
  }
});

// Get all regular perfumes
router.get('/list', async (req, res) => {
  try {
    const perfumes = await Perfume.find();
    res.json(perfumes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching perfumes', error: err.message });
  }
});

// Delete a regular perfume
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await Perfume.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Perfume not found' });
    }
    res.status(200).json({ message: 'Perfume deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting perfume', error: err.message });
  }
});

// Update a regular perfume
router.put('/update/:id', upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file?.filename || req.body.image;

  try {
    const updatedPerfume = await Perfume.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image },
      { new: true }
    );

    if (!updatedPerfume) {
      return res.status(404).json({ message: 'Perfume not found' });
    }

    res.json({ message: 'Perfume updated successfully', updatedPerfume });
  } catch (err) {
    res.status(500).json({ message: 'Error updating perfume', error: err.message });
  }
});

// Get perfume by ID
router.get('/:id', async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.id);
    if (!perfume) {
      return res.status(404).json({ message: "Perfume not found" });
    }
    res.json(perfume);
  } catch (err) {
    res.status(500).json({ message: "Error fetching perfume", error: err.message });
  }
});

// Custom Perfume Routes

// Create a custom perfume
router.post('/custom', async (req, res) => {
  const { baseNote, middleNote, topNote, bottleSize, customName } = req.body;

  try {
    const newCustomPerfume = new CustomPerfume({
      baseNote,
      middleNote,
      topNote,
      bottleSize,
      customName
    });

    await newCustomPerfume.save();
    res.json({ message: 'Custom perfume created successfully!', customPerfume: newCustomPerfume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create custom perfume', error: err.message });
  }
});

// Get all custom perfumes
router.get('/custom-list', async (req, res) => {
  try {
    const customPerfumes = await CustomPerfume.find();
    res.json(customPerfumes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching custom perfumes', error: err.message });
  }
});

module.exports = router;
