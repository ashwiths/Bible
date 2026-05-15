import React, { useEffect, useRef } from 'react';

const HeroSection = () => {
  const layerRef = useRef(null);

  useEffect(() => {
    // Parallax effect logic
    const handleScroll = () => {
      if (!layerRef.current) return;
      
      const scrollY = window.scrollY;
      // Moving the layer at half the speed of the scroll creates the parallax illusion
      layerRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section className="parallax">
        <header>
          <ul className="menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#read">Read</a></li>
            <li><a href="#about">About</a></li>
          </ul>
          <div className="hamburger">☰</div>
        </header>

        {/* The new majestic Jesus background image generated specifically for this */}
        <div className="layer" ref={layerRef}></div>

        {/* Text overlay to match your "JESUS CHANGES EVERYTHING" image perfectly */}
        <div className="hero-text-overlay">
          <h1 className="hero-title">B I B L E</h1>
          <p className="hero-subtitle">CHANGES EVERYTHING</p>
        </div>
      </section>

      {/* The content that slides up OVER the parallax background */}
      <section className="content">
        <div className="info">
          <h1>THE JOURNEY BEGINS</h1>
          <p>
            This is your new beautiful parallax scrolling section. As you scroll down, 
            this dark content area will slide up and smoothly cover the majestic background image.
          </p>
        </div>
        <footer>
          <p>DuoBible Project</p>
        </footer>
      </section>
    </>
  );
};

export default HeroSection;
