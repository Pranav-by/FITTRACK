const mongoose = require('mongoose');

// Trainer Schema
const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  role: {
    type: String,
    required: true,
    enum: ['Trainer', 'Nutritionist', 'Physiotherapist', 'Other'], // Roles can be extended
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedAt field
trainerSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;
