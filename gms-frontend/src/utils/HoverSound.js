import React, { useEffect, useRef } from 'react';

const HoverSound = () => {
  const hoverSoundRef = useRef(null);

  useEffect(() => {
    const playSound = () => {
      if (hoverSoundRef.current) {
        hoverSoundRef.current.currentTime = 0;
        hoverSoundRef.current.play().catch((e) => {
          console.warn('Audio play was prevented:', e);
        });
      }
    };

    const handleHover = (e) => {
      if (e.target.matches(':hover')) {
        playSound();
      }
    };

    document.addEventListener('mouseover', handleHover);

    return () => {
      document.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <audio ref={hoverSoundRef}>
      <source src="/sound/hover.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default HoverSound;
