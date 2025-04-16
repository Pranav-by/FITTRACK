import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Import the loader

const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setPopup('⚠️ Please fill in both Username and Password!');
      setTimeout(() => setPopup(''), 3000);
      return;
    }

    try {
      setLoading(true); // Start loading

      const response = await axios.post(
        'http://localhost:4000/auth/login',
        { username, password },
        { withCredentials: true }
      );

      console.log('✅ Login success:', response.data);
      sessionStorage.setItem('isLogin', 'true');
      setIsLogin(true);
      navigate('/dashboard');
    } catch (err) {
      console.log('❌ Login error:', err.response?.data || err.message);
      setPopup('❌ Invalid username or password!');
      setTimeout(() => setPopup(''), 3000);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] relative">
      {popup && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-red-600/90 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-2xl animate-fade-in-out z-50 backdrop-blur-sm border border-white/20">
          {popup}
        </div>
      )}

      <Tilt scale={1.05} glareEnable={true} glareMaxOpacity={0.2} className="rounded-3xl">
        <div className="w-[350px] p-8 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.15)] text-white relative overflow-hidden">
          <div className="flex flex-col items-center justify-center mb-6">
            <LockPersonIcon sx={{ fontSize: 60 }} className="text-pink-400 drop-shadow-lg mb-2" />
            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text drop-shadow-md">
              Member Login
            </h2>
          </div>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 rounded-md bg-white/10 border border-white/10 text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-5 rounded-md bg-white/10 border border-white/10 text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-pink-500/40 transition-all duration-300"
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <ClipLoader size={20} color="#fff" /> // Show loader while loading
            ) : (
              'Login'
            )}
          </button>

          <div className="text-sm text-right mt-4">
            <Link
              to="/forget-password"
              className="text-gray-300 hover:text-pink-400 transition underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default Login;
