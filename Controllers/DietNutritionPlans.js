const DietPlan = require('../Models/DietNutritionPlans');

// Create a new diet plan
exports.createDietNutritionPlan = async (req, res) => {
  try {
    const newPlan = new DietPlan(req.body);
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all diet plans
exports.getAllDietNutritionPlans = async (req, res) => {
  try {
    const plans = await DietPlan.find().sort({ createdAt: -1 });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single diet plan by ID
exports.getDietNutritionPlanById = async (req, res) => {
  try {
    const plan = await DietPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: "Diet plan not found" });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a diet plan
exports.updateDietNutritionPlan = async (req, res) => {
  try {
    const updatedPlan = await DietPlan.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ error: "Diet plan not found" });
    }

    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a diet plan
exports.deleteDietNutritionPlan = async (req, res) => {
  try {
    const deletedPlan = await DietPlan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) {
      return res.status(404).json({ error: "Diet plan not found" });
    }

    res.status(200).json({ message: "Diet plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
