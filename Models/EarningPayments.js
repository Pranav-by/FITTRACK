const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  amount: {
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

// Middleware to update the `updatedAt` field whenever a document is updated
earningSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Earning = mongoose.model('Earning', earningSchema);

module.exports = Earning;
