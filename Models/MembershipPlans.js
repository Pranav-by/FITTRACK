const mongoose = require('mongoose');

// Membership Plan Schema
const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  duration: {
    type: String,
    required: true,
    enum: ['1 Month', '3 Months', '6 Months', '1 Year'], // Possible durations
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  features: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 0; // Ensure there are features listed
      },
      message: 'A plan must have at least one feature',
    },
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
planSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
