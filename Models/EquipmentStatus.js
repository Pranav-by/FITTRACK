const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  status: {
    type: String,
    required: true,
    enum: ['Working', 'Under Maintenance', 'Needs Repair'],
  },
  lastServiced: {
    type: Date,
    required: true,
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

// Middleware to update the updatedAt field whenever a document is saved
equipmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware to update the updatedAt field whenever a document is updated
equipmentSchema.pre('update', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

equipmentSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
