const express = require('express');
const router = express.Router();
const trainerController = require('../Controllers/Trainers');

// POST: Create a new trainer
router.post('/', trainerController.createTrainer);

// GET: All trainers
router.get('/', trainerController.getAllTrainers);

// GET: Single trainer by ID


router.get('/:id', trainerController.getTrainerById);

// PUT: Update trainer
router.put('/:id', trainerController.updateTrainer);

// DELETE: Delete trainer
router.delete('/:id', trainerController.deleteTrainer);

module.exports = router;
