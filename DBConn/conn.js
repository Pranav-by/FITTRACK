const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/gymBackend')
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
