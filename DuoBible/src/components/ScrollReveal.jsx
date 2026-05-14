// components/ScrollReveal.jsx
// Wraps children and animates them when they scroll into view

import React, { useEffect, useRef } from 'react';
import '../styles/animations.css';

const ScrollReveal = ({ children, className = '', direction = 'up', delay = 0, style = {} }) => {
  const ref = useRef(null);

  // Map direction to CSS class
  const dirClass = {
    up:    'reveal',
    left:  'reveal-left',
    right: 'reveal-right',
  }[direction] || 'reveal';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply transition delay from prop
          el.style.transitionDelay = `${delay}s`;
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`${dirClass} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default ScrollReveal;
