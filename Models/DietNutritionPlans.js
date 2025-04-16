const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  duration: {
    type: String,
    required: true,
    trim: true,
  },
  calories: {
    type: String,
    required: true,
    trim: true,
  },
  meals: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedAt field whenever a document is updated
dietPlanSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const DietPlan = mongoose.model('DietPlan', dietPlanSchema);

module.exports = DietPlan;
