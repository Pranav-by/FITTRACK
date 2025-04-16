import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Hover Sound Setup
let userInteracted = false;
if (typeof window !== 'undefined') {
  window.addEventListener(
    'click',
    () => { userInteracted = true; },
    { once: true }
  );
}
const playHoverSound = () => {
  if (!userInteracted) return;
  const audio = new Audio('/sounds/hover.mp3');
  audio.volume = 0.4;
  audio.play().catch((e) => console.warn('Audio blocked:', e));
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setGreeting('Good Morning 🚀');
    else if (hour >= 12 && hour < 17) setGreeting('Good Afternoon 🌞');
    else if (hour >= 17 && hour < 21) setGreeting('Good Evening 🌠');
    else setGreeting('Good Night 🌌');
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isLogin');
    navigate('/');
    window.location.reload();
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <HomeIcon />, color: 'cyan' },
    { path: '/member', label: 'Members', icon: <GroupIcon />, color: 'blue' },
  ];

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-[#020710] via-[#070b16] to-[#0e1220] text-white flex flex-col items-center px-4 py-6 relative border-r border-cyan-500/20 shadow-[0_0_60px_#00fff799]">

      {/* Animated Aura Effects */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute -top-48 -left-24 w-[400px] h-[400px] bg-[#00ffff33] blur-3xl rounded-full animate-pulse" />
        <div className="absolute -bottom-20 right-0 w-[320px] h-[320px] bg-[#c084fc33] blur-2xl rounded-full animate-spin-slow" />
      </div>

      {/* Neon Border Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent animate-pulse" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse" />
        <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full space-y-8">

        {/* Logo */}
        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <img src="/image.png" alt="Logo" className="h-14 w-14 rounded-full border-2 border-cyan-300 shadow-md z-10 relative" />
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-cyan-200 animate-ping opacity-20" />
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-transparent bg-clip-text tracking-widest glitch">
            FITTRACK
          </span>
        </div>

        <div className="text-sm font-semibold text-cyan-200 animate-pulse tracking-widest">{greeting}</div>
        <div className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Admin Panel</div>

        {/* Nav Links */}
        <div className="flex flex-col gap-5 w-full mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <div
                  onMouseEnter={playHoverSound}
                  className={`group flex items-center gap-4 p-4 rounded-xl backdrop-blur-lg border border-${item.color}-500/20 hover:bg-${item.color}-500/10 hover:border-${item.color}-400 transition-all duration-300 transform hover:scale-[1.05] hover:shadow-[0_0_25px_#00ffff66] ${
                    isActive ? `bg-${item.color}-500/10 border-${item.color}-400` : 'bg-[#0d0d0d]/60'
                  }`}
                >
                  {React.cloneElement(item.icon, {
                    className: `text-${item.color}-300 group-hover:animate-pulse`,
                  })}
                  <span className={`font-semibold tracking-wide group-hover:text-${item.color}-200`}>
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}

          {/* Logout */}
          <div
            onClick={handleLogout}
            onMouseEnter={playHoverSound}
            className="group flex items-center gap-4 p-4 rounded-xl bg-[#0d0d0d]/60 backdrop-blur-lg border border-rose-500/20 hover:bg-rose-500/10 hover:border-rose-400 transition-all duration-300 transform hover:scale-[1.05] hover:shadow-[0_0_25px_#ff006699] cursor-pointer"
          >
            <LogoutIcon className="text-rose-300 group-hover:animate-pulse" />
            <span className="font-semibold tracking-wide group-hover:text-rose-200">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
