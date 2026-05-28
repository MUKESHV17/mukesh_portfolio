import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is touch-based/mobile
    const checkDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isTouch);
    };

    checkDevice();

    if (isMobile) return;

    const handleMouseMove = (e) => {
      setIsHidden(false);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    // Listeners for clickables to trigger hover scaling
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .interactive-card');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Initial listener scan + periodic polling to catch dynamic elements (like React page loads)
    addHoverListeners();
    const intervalId = setInterval(addHoverListeners, 1500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(intervalId);
    };
  }, [isMobile]);

  // Smooth lag/easing effect for the trailing outer ring
  useEffect(() => {
    if (isMobile || isHidden) return;

    let animId;
    const updateRing = () => {
      setRingPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Ease speed: 0.15 for smooth drag latency
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animId = requestAnimationFrame(updateRing);
    };

    animId = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(animId);
  }, [position, isMobile, isHidden]);

  if (isMobile || isHidden) return null;

  return (
    <>
      {/* Inner glowing dot */}
      <div
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: isHovering ? '#ff007f' : '#00f5ff',
          boxShadow: isHovering ? '0 0 10px #ff007f' : '0 0 10px #00f5ff',
        }}
      />
      {/* Eased outer neon ring */}
      <div
        className="custom-cursor-ring"
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          borderColor: isHovering ? '#ff007f' : '#00f5ff',
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          backgroundColor: isHovering ? 'rgba(255, 0, 127, 0.05)' : 'transparent',
          boxShadow: isHovering ? '0 0 15px rgba(255, 0, 127, 0.2)' : 'none',
        }}
      />
    </>
  );
};

export default CustomCursor;
