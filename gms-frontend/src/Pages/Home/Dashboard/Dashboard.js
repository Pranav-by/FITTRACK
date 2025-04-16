import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
  PeopleAlt, HowToReg, CardMembership, FitnessCenter,
  Payment, EventNote, BarChart, Restaurant, Feedback
} from '@mui/icons-material';

// 🎴 Card Data
const cards = [
  { title: 'Joined Members', icon: <PeopleAlt fontSize="large" />, path: '/members', color: "from-purple-500 via-indigo-500 to-blue-500" },
  { title: 'New Registrations', icon: <HowToReg fontSize="large" />, path: '/registrations', color: "from-green-400 via-emerald-500 to-teal-500" },
  { title: 'Membership Plans', icon: <CardMembership fontSize="large" />, path: '/plans', color: "from-yellow-400 via-orange-500 to-red-500" },
  { title: 'Trainers & Staff', icon: <FitnessCenter fontSize="large" />, path: '/trainers', color: "from-pink-500 via-fuchsia-500 to-purple-600" },
  { title: 'Gym Attendance', icon: <BarChart fontSize="large" />, path: '/attendance', color: "from-cyan-400 via-blue-500 to-indigo-500" },
  { title: 'Earnings & Payments', icon: <Payment fontSize="large" />, path: '/payments', color: "from-lime-400 via-green-500 to-emerald-500" },
  { title: 'Workout Schedules', icon: <EventNote fontSize="large" />, path: '/schedules', color: "from-orange-400 via-yellow-500 to-pink-500" },
  { title: 'Equipment Status', icon: <FitnessCenter fontSize="large" />, path: '/equipment', color: "from-sky-400 via-blue-500 to-indigo-600" },
  { title: 'Nutrition & Diet', icon: <Restaurant fontSize="large" />, path: '/nutrition', color: "from-red-400 via-pink-500 to-purple-600" },
  { title: 'Feedback & Queries', icon: <Feedback fontSize="large" />, path: '/feedback', color: "from-gray-400 via-gray-600 to-gray-800" }
];

let interacted = false;
if (typeof window !== 'undefined') {
  window.addEventListener('click', () => { interacted = true; }, { once: true });
}

const playIntroThenHomeSound = () => {
  if (!interacted) return;
  const intro = new Audio('/sounds/intro.mp3');
  const home = new Audio('/sounds/home-sound.mp3');
  intro.volume = 0.7;
  home.volume = 0.3;

  intro.play().then(() => {
    intro.onended = () => {
      home.play().catch(e => console.warn('Home sound error:', e));
    };
  }).catch(e => console.warn('Intro sound error:', e));
};

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    playIntroThenHomeSound();
  }, []);

  return (
    <motion.div
      initial={{ scaleX: 0, transformOrigin: 'left', opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-black text-white px-6 py-10 relative overflow-hidden"
    >
      {/* 🌌 Stars Background */}
      <div
        className="absolute inset-0 z-0 bg-repeat bg-center bg-cover pointer-events-none"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/stars.gif)` }}
      />

      {/* 🧠 HUD Overlay */}
      <div
        className="absolute inset-0 z-10 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/hud-overlay.png)`,
          opacity: 0.4,
          mixBlendMode: 'screen',
          filter: 'blur(0.5px)'
        }}
      />

      {/* ✨ Magical Gradient Backgrounds */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-[300px] h-[300px] bg-indigo-500 opacity-30 blur-3xl top-[20%] left-[15%] animate-pulse rounded-full"></div>
        <div className="absolute w-[400px] h-[400px] bg-pink-500 opacity-20 blur-3xl top-[55%] left-[65%] animate-ping rounded-full"></div>
        <div className="absolute w-[200px] h-[200px] bg-cyan-400 opacity-20 blur-2xl top-[5%] left-[75%] rounded-full animate-bounce"></div>
      </div>

      {/* ⏳ Activation Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}
        className="text-center text-lg sm:text-xl text-cyan-400 font-mono z-20 relative mb-6 animate-pulse"
      >
        ⏳ Activating High Command Panel...
      </motion.div>

      {/* 🪄 Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-center text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 bg-clip-text text-transparent mb-16 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] z-20 relative animate-pulse"
      >
        ✨ FITTRACK Dashboard
      </motion.h1>

      {/* 📦 Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 z-20 relative">
        {cards.map((card, index) => (
          <Tilt
            key={index}
            glareEnable={true}
            glareMaxOpacity={0.25}
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            perspective={1000}
            transitionSpeed={500}
            scale={1.03}
            className="rounded-3xl"
          >
            <motion.div
              onClick={() => navigate(card.path)}
              className="relative rounded-3xl p-6 cursor-pointer backdrop-blur-2xl shadow-xl border border-white/10 bg-white/5 group overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
            >
              <div className="absolute top-0 left-[-75%] w-[50%] h-full bg-white/10 rotate-[30deg] group-hover:animate-[shine_1s_linear] z-20 pointer-events-none"></div>
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color} rounded-t-3xl animate-pulse`} />
              <div className={`absolute inset-0 rounded-3xl opacity-20 bg-gradient-to-br ${card.color} blur-2xl`} />
              <div className="relative z-10 space-y-2">
                <div className="text-cyan-300 text-5xl group-hover:scale-110 transition duration-300">{card.icon}</div>
                <h2 className="text-2xl font-bold">{card.title}</h2>
                <p className="text-gray-400 text-sm">Access {card.title} →</p>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;
