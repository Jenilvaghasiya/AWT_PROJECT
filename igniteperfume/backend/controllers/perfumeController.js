const Perfume = require('../models/Perfume');
const CustomPerfume = require('../models/CustomPerfume');

// Add perfume
exports.addPerfume = async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file?.filename || '';

  const perfume = new Perfume({ name, description, price, image });
  await perfume.save();
  res.json({ message: "Perfume added successfully", perfume });
};

// Get all perfumes
exports.getPerfumes = async (req, res) => {
  const perfumes = await Perfume.find();
  res.json(perfumes);
};

// Add custom perfume
exports.addCustomPerfume = async (req, res) => {
  const perfume = new CustomPerfume(req.body);
  await perfume.save();
  res.json({ message: "Custom perfume created", perfume });
};

// Delete perfume
exports.deletePerfume = async (req, res) => {
  try {
    const deleted = await Perfume.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Perfume not found' });
    }
    res.status(200).json({ message: 'Perfume deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting perfume', error: err.message });
  }
};

exports.updatePerfume = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file?.filename || req.body.image;

    const updatedPerfume = await Perfume.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image },
      { new: true }
    );

    if (!updatedPerfume) {
      return res.status(404).json({ message: 'Perfume not found' });
    }

    res.status(200).json({ message: 'Perfume updated successfully', updatedPerfume });
  } catch (err) {
    res.status(500).json({ message: 'Error updating perfume', error: err.message });
  }
};

// ✅ Also add this if not already present
exports.getPerfumeById = async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.id);
    if (!perfume) return res.status(404).json({ message: "Perfume not found" });
    res.json(perfume);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

