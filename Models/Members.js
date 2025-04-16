const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
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
  membership: {
    type: String,
    ref: 'MembershipPlan', 
    enum: ['Basic', 'Standard', 'Premium', 'Gold', 'Platinum'], // Allowed membership types
    required: true,
  },
  dateOfStart: {
    type: Date,
    required: true,
  },
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
