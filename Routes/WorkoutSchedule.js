const express = require('express');
const router = express.Router();
const workoutController = require('../Controllers/WorkoutSchedule');

// Create workout
router.post('/', workoutController.createWorkout);

// Get all workouts
router.get('/', workoutController.getAllWorkouts);

// Get workout by ID
router.get('/:id', workoutController.getWorkoutById);

// Update workout
router.put('/:id', workoutController.updateWorkout);

// Delete workout
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;
