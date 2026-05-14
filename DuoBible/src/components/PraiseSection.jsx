import React, { useEffect, useRef } from 'react';
import '../styles/praise.css';

const PraiseSection = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      
      const scrollY = window.scrollY;
      const maxScroll = 1500; 
      let progress = scrollY / maxScroll;
      progress = Math.min(Math.max(progress, 0), 1); 
      
      wrapperRef.current.style.setProperty('--scroll', progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="praise-container" ref={wrapperRef}>
      <div className="praise-sticky">
        <div className="elevator-transition">
          <div className="elevator">
            <div className="elevatorL-transition">PRAISE THE</div>
            <div className="elevatorR-transition">LORD</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PraiseSection;
