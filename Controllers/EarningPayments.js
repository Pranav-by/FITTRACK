const Earning = require('../Models/EarningPayments');

// Create a new earning
exports.createEarning = async (req, res) => {
  try {
    const earning = new Earning(req.body);
    const savedEarning = await earning.save();
    res.status(201).json(savedEarning);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all earnings
exports.getAllEarnings = async (req, res) => {
  try {
    const earnings = await Earning.find().sort({ date: -1 });
    res.status(200).json(earnings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single earning by ID
exports.getEarningById = async (req, res) => {
  try {
    const earning = await Earning.findById(req.params.id);
    if (!earning) {
      return res.status(404).json({ error: "Earning not found" });
    }
    res.status(200).json(earning);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an earning
exports.updateEarning = async (req, res) => {
  try {
    const updatedEarning = await Earning.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedEarning) {
      return res.status(404).json({ error: "Earning not found" });
    }

    res.status(200).json(updatedEarning);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an earning
exports.deleteEarning = async (req, res) => {
  try {
    const deletedEarning = await Earning.findByIdAndDelete(req.params.id);
    if (!deletedEarning) {
      return res.status(404).json({ error: "Earning not found" });
    }
    res.status(200).json({ message: "Earning deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
