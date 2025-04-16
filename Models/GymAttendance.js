const mongoose = require('mongoose');

// Define the schema for attendance
const attendanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, // Default to current date if not provided
  },
  timeIn: {
    type: String,
    required: true,
    match: [/^([0-9]{2}):([0-9]{2})$/, 'Please provide a valid time in the format HH:mm'], // Ensure time is in HH:mm format
  },
  createdAt: {
    type: Date,
    default: Date.now, // When the attendance entry is created
  },
});

// You can create a method to count attendance by date (or any other custom methods)
attendanceSchema.methods.countByDate = function () {
  return mongoose.models.GymAttendance.countDocuments({ date: this.date });
};

// Create the model for the attendance schema
const GymAttendance = mongoose.model('GymAttendance', attendanceSchema);

module.exports = GymAttendance;
