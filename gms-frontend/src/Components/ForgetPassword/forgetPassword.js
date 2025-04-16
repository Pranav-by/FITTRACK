import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { toast } from 'react-toastify';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const playToast = (type, title, message) => {
  const content = (
    <div className="space-y-1">
      <p className="text-sm font-semibold text-pink-400">{title}</p>
      <p className="text-xs text-white">{message}</p>
    </div>
  );

  const baseOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    className:
      "bg-black/90 border border-pink-500 rounded-xl backdrop-blur-md shadow-lg px-4 py-3 text-sm font-mono",
  };

  if (type === "error") return toast.error(content, baseOptions);
  if (type === "success") return toast.success(content, baseOptions);
  return toast(content, baseOptions);
};

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (step === 1) {
        if (!email.trim()) {
          setLoading(false);
          return playToast("error", "Email Required", "Please enter your email address.");
        }

        await axios.post("http://localhost:4000/auth/forgot-password", { email });
        playToast("success", "OTP Sent!", "An OTP has been sent to your email.");
        setStep(2);
        setLoading(false); // ✅ Stop loading
      }

      else if (step === 2) {
        if (!otp || otp.length < 4) {
          setLoading(false);
          return playToast("error", "Invalid OTP", "Please enter a valid 4-digit OTP.");
        }

        playToast("success", "OTP Verified", "Proceed to set a new password.");
        setStep(3);
        setLoading(false); // ✅ Stop loading
      }

      else if (step === 3) {
        if (!newPassword || newPassword.length < 6) {
          setLoading(false);
          return playToast("error", "Weak Password", "Password must be at least 6 characters.");
        }

        await axios.post("http://localhost:4000/auth/reset-password", {
          email,
          otp,
          newPassword
        });

        playToast("success", "Password Reset", "Your password has been successfully reset!");
        setStep(1);
        setEmail('');
        setOtp('');
        setNewPassword('');
        setLoading(false); // ✅ Stop loading before navigate

        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      setLoading(false);
      const msg = err?.response?.data?.message || "Something went wrong!";
      playToast("error", "Request Failed", msg);
    }
  };

  const getButtonLabel = () => {
    if (step === 1) return "Submit Email";
    if (step === 2) return "Submit OTP";
    if (step === 3) return "Set New Password";
  };

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center relative text-white bg-black overflow-hidden"
    >
      <Tilt scale={1.05} glareEnable={true} glareMaxOpacity={0.2} className="z-20">
        <div className="w-[350px] p-8 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.15)] relative overflow-hidden">
          {/* Title & Icon */}
          <div className="flex flex-col items-center justify-center mb-6 z-20 relative">
            <LockPersonIcon sx={{ fontSize: 60 }} className="text-purple-400 drop-shadow-lg mb-2" />
            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400 text-transparent bg-clip-text drop-shadow-md">
              Reset Password
            </h2>
          </div>

          {/* Inputs */}
          <div className="space-y-4 z-20 relative">
            {step >= 1 && (
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/10 text-sm text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition"
              />
            )}

            {step >= 2 && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/10 text-sm text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              />
            )}

            {step === 3 && (
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/10 text-sm text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-pink-500/40 transition-all duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : getButtonLabel()}
          </button>

          {/* Back Link */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-purple-300 hover:text-pink-400 transition underline"
            >
              ⬅️ Back to Login
            </button>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default ForgetPassword;
