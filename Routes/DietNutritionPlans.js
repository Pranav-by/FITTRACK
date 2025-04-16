const express = require('express');
const router = express.Router();
const dietNutritionPlanController = require('../Controllers/DietNutritionPlans');

// Define the routes
router.post('/', dietNutritionPlanController.createDietNutritionPlan);
router.get('/', dietNutritionPlanController.getAllDietNutritionPlans);
router.get('/:id', dietNutritionPlanController.getDietNutritionPlanById);
router.put('/:id', dietNutritionPlanController.updateDietNutritionPlan);
router.delete('/:id', dietNutritionPlanController.deleteDietNutritionPlan);

module.exports = router;
