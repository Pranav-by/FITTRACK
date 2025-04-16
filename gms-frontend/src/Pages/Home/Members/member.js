import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonAdd, FormatListBulleted } from '@mui/icons-material';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

// ✅ Allow sound only after user interaction
let userInteracted = false;
if (typeof window !== 'undefined') {
  window.addEventListener('click', () => {
    userInteracted = true;
  }, { once: true });
}

const playHoverSound = () => {
  if (!userInteracted) return;
  const audio = new Audio('/sound/hover.mp'); // ✅ Your hover sound path
  audio.volume = 0.5;
  audio.play().catch(err => {
    console.warn('Sound blocked:', err);
  });
};

const memberCards = [
  {
    title: 'All Members',
    icon: <FormatListBulleted fontSize="large" />,
    path: '/members',
    color: 'from-indigo-500 via-blue-600 to-purple-500'
  },
  {
    title: 'Add New Member',
    icon: <PersonAdd fontSize="large" />,
    path: '/registrations',
    color: 'from-teal-400 via-emerald-500 to-lime-400'
  }
];

const MemberHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 relative overflow-hidden">
      
      {/* 💎 Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-purple-500 opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] bg-blue-500 opacity-20 rounded-full blur-3xl animate-ping" />
      </div>

      {/* 🧢 Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center text-5xl font-extrabold text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text mb-16 z-10 relative drop-shadow-[0_0_80px_rgba(255,255,255,0.3)]"
      >
        👥 Member Management
      </motion.h1>

      {/* 📦 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center z-10 relative">
        {memberCards.map((card, index) => (
          <Tilt
            key={index}
            glareEnable={true}
            glareMaxOpacity={0.2}
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            perspective={1000}
            scale={1.05}
            transitionSpeed={600}
            className="rounded-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              onMouseEnter={playHoverSound}
              onClick={() => navigate(card.path)}
              className="relative rounded-3xl p-6 cursor-pointer backdrop-blur-xl border border-white/10 bg-black/30 overflow-hidden w-80 shadow-xl group"
            >
              {/* 🌈 Top Gradient Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color} rounded-t-3xl animate-pulse`} />

              {/* ✨ Shine Effect */}
              <div className="absolute top-0 left-[-75%] w-[50%] h-full bg-white/10 rotate-[25deg] group-hover:animate-[shine_1s_linear] z-20 pointer-events-none"></div>

              {/* 🌌 Glow BG */}
              <div className={`absolute inset-0 opacity-20 rounded-3xl bg-gradient-to-br ${card.color} blur-2xl`} />

              {/* 💠 Content */}
              <div className="relative z-10 space-y-2">
                <div className="text-cyan-300 text-5xl transform group-hover:scale-110 transition duration-300">{card.icon}</div>
                <h2 className="text-2xl font-bold">{card.title}</h2>
                <p className="text-gray-400 text-sm">Access {card.title} →</p>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </div>
  );
};

export default MemberHome;
