const GymUser = require("../Models/gym");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register
exports.registerGymUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await GymUser.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already registered" });

    const newUser = await GymUser.create({ username, email, password });
    res.status(201).json({ message: "User registered successfully", user: newUser.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login with JWT and Cookie
exports.loginGymUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find user by username instead of email
      const user = await GymUser.findOne({ username }).select("+password");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SecretKey,
        { expiresIn: "1h" }
      );
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000,
      });
  
      res.json({ message: "Login successful", user: user.username });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Forgot Password - Send OTP
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await GymUser.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.resetOTP = otp;
    user.otpExpiresAt = otpExpires;
    await user.save();

    await sendOTPEmail(email, otp);

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reset Password with OTP
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await GymUser.findOne({ email });

    if (!user || user.resetOTP !== otp || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = newPassword;
    user.resetOTP = null;
    user.otpExpiresAt = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Utility: Send OTP Email
const sendOTPEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Your FitTrack OTP Code",
    text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};
