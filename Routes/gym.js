const express = require("express");
const router = express.Router();

const auth = require("../Auth/auth");
const {
  registerGymUser,
  loginGymUser,
  forgotPassword,
  resetPassword,
} = require("../Controllers/gym");

// Public Routes
router.post("/register", registerGymUser);
router.post("/login", loginGymUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.json({ message: "Logged out successfully" });
});

// Protected Route Example
router.get("/protected", auth, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}` });
});

module.exports = router;
