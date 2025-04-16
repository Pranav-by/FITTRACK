const mongoose = require('mongoose');

// Define the workout schema
const workoutSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Days of the week
  },
  exercises: {
    type: [String], // Array of exercises for each day
    required: true,
  },
});

// Create the Workout model based on the schema
const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
