const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  plan: {
    type: String,
    enum: ['Basic', 'Standard', 'Gold', 'Platinum'], // Allowed membership plans
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
