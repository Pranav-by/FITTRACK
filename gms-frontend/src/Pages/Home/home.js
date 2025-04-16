import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Login from '../../Components/Login/Login';
import Signup from '../../Components/Signup/Signup';

const Home = ({ setIsLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [userInteracted, setUserInteracted] = useState(false);
  const [bgAudio, setBgAudio] = useState(null);

  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true);

      // Play background audio
      const audio = new Audio('/sounds/home-sound.mp3');
      audio.loop = true;
      audio.volume = 0.4;
      audio.play().catch((err) => console.warn('Autoplay blocked:', err));
      setBgAudio(audio);
    };

    window.addEventListener('click', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      if (bgAudio) {
        bgAudio.pause();
        bgAudio.currentTime = 0;
      }
    };
  }, [bgAudio]);

  const playHoverSound = () => {
    if (!userInteracted) return;
    const audio = new Audio('/sounds/hover.mp3');
    audio.volume = 0.5;
    audio.play().catch((err) => console.warn('Hover sound blocked:', err));
  };

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/stars.gif)`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      {/* 🌌 HUD Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/hud-overlay.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
        }}
      />

      {/* 🔥 Neon Blurs */}
      <div className="absolute top-[5%] left-[5%] w-[300px] h-[300px] bg-purple-600 opacity-30 rounded-full blur-3xl animate-pulse pointer-events-none z-0"></div>
      <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] bg-pink-500 opacity-20 rounded-full blur-3xl animate-ping pointer-events-none z-0"></div>

      {/* 🏋️‍♂️ Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(255,255,255,0.3)] z-10 mb-4"
      >
        🏋️ FITTRACK Login Panel
      </motion.div>

      {/* 💬 Subheading */}
      <p className="text-gray-300 text-lg z-10 mb-6 italic">Train insane or remain the same 💪</p>

      {/* Toggle Buttons */}
      <div className="flex space-x-4 mb-6 z-10">
        <button
          onMouseEnter={playHoverSound}
          onClick={() => setActiveTab('login')}
          className={`px-6 py-2 rounded-full transition font-semibold backdrop-blur-md ${
            activeTab === 'login'
              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-xl scale-105'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Login
        </button>
        <button
          onMouseEnter={playHoverSound}
          onClick={() => setActiveTab('signup')}
          className={`px-6 py-2 rounded-full transition font-semibold backdrop-blur-md ${
            activeTab === 'signup'
              ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-xl scale-105'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Register
        </button>
      </div>

      {/* Forms */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10"
        onMouseEnter={playHoverSound}
      >
        {activeTab === 'login' ? <Login setIsLogin={setIsLogin} /> : <Signup />}
      </motion.div>
    </div>
  );
};

export default Home;
