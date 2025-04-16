const express = require('express');
const router = express.Router();
const planController = require('../Controllers/MembershipPlans');

// Create a new plan
router.post('/', planController.createPlan);

// Get all plans
router.get('/', planController.getAllPlans);

// Get plan by ID
router.get('/:id', planController.getPlanById);

// Update plan details
router.put('/:id', planController.updatePlan);

// Delete plan by ID
router.delete('/:id', planController.deletePlan);

module.exports = router;
