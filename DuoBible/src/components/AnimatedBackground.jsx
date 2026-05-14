// components/AnimatedBackground.jsx
// Floating gold particle glow effect — pure CSS + JS, no heavy libraries

import React, { useEffect, useRef } from 'react';
import '../styles/components.css';

const AnimatedBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create 18 particles with randomized properties
    const particles = Array.from({ length: 18 }, (_, i) => {
      const el = document.createElement('div');
      el.className = 'particle';

      // Random size between 4px and 14px
      const size = Math.random() * 10 + 4;
      el.style.width  = `${size}px`;
      el.style.height = `${size}px`;

      // Random horizontal position
      el.style.left = `${Math.random() * 100}%`;

      // Random animation duration between 8s and 20s
      const duration = Math.random() * 12 + 8;
      el.style.animationDuration = `${duration}s`;

      // Random delay so they don't all start at once
      el.style.animationDelay = `${Math.random() * duration}s`;

      // Vary opacity
      el.style.opacity = `${Math.random() * 0.5 + 0.1}`;

      container.appendChild(el);
      return el;
    });

    // Cleanup on unmount
    return () => {
      particles.forEach((el) => el.remove());
    };
  }, []);

  return <div className="animated-bg" ref={containerRef} aria-hidden="true" />;
};

export default AnimatedBackground;
