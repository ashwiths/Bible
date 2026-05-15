import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const JesusParallax = () => {
  const sectionRef = useRef(null);
  const layerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (!layerRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalDistance = windowHeight + rect.height;
        const scrolledDistance = windowHeight - rect.top;
        const progress = scrolledDistance / totalDistance;
        const maxOffset = windowHeight * 0.25;
        const offset = (progress - 0.5) * maxOffset;
        layerRef.current.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth fade-out then navigate — no page reload, pure React Router
  const handleExplore = () => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.opacity = '1';
      navigate('/home');
      window.scrollTo(0, 0);
    }, 500);
  };

  return (
    <>
      <section className="parallax" ref={sectionRef}>
        <div className="layer" ref={layerRef}></div>
        <div className="hero-text-overlay">
          <h1 className="hero-title">B I B L E</h1>
          <div className="subtitle-wrapper">
            <p className="hero-subtitle">CHANGES EVERYTHING</p>
            {/* Clicking this navigates to /home */}
            <button
              className="explore-btn"
              onClick={handleExplore}
              id="explore-btn"
              aria-label="Explore DuoBible"
            >
              Explore
              <svg viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* The dark content section that slides over the majestic Jesus image */}
      <section className="content">
        <div className="info">
          <h1>THE LIVING WORD</h1>
          <p>
            The Bible is more than just a historical text; it is a living collection of wisdom, truth, and divine revelation that has shaped civilizations for millennia. Its words have inspired hope, built nations, and transformed countless lives across generations.
          </p>
          <p>
            Comprising 66 distinct books written by over 40 authors across thousands of years—from kings and scholars to fishermen and prophets—it tells the cohesive, awe-inspiring story of God's unconditional love for humanity and His ultimate plan for redemption.
          </p>
          <p>
            Through DuoBible, you can explore this profound journey in multiple languages simultaneously. We bridge the gap between ancient scriptures and modern technology, bringing the Word to life in an elegant, seamless, and deeply immersive digital experience designed for the modern reader.
          </p>
          <p style={{ fontStyle: 'italic', color: '#fff', marginTop: '2rem' }}>
            "Your word is a lamp to my feet and a light to my path." – Psalm 119:105
          </p>

          {/* Get Started CTA */}
          <button
            className="explore-btn"
            onClick={handleExplore}
            aria-label="Get Started with DuoBible"
            style={{ marginTop: '2.5rem', alignSelf: 'center' }}
          >
            Get Started
            <svg viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"></path>
            </svg>
          </button>
        </div>

        {/* Creator Details Section */}
        <div className="creator-details" style={{
          marginTop: '6rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '4rem',
          width: 'min(90vw, 1000px)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <h4 style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '1.2rem',
            letterSpacing: '5px',
            margin: 0
          }}>PROJECT CREATOR</h4>
          <h2 style={{
            color: '#fff',
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: '4rem',
            margin: '1rem 0'
          }}>Infant Ashil A</h2>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontFamily: '"Futura", system-ui, sans-serif',
            fontSize: '1.4rem',
            lineHeight: 1.8,
            margin: 0
          }}>
            Dedicated to building a modern, bilingual platform to share the Word.<br />
            Designing faith-driven technology for the next generation.
          </p>
        </div>

        <footer style={{ marginTop: '4rem', fontSize: '1.2rem' }}>
          <p>&copy; {new Date().getFullYear()} DuoBible Project. All rights reserved.</p>
        </footer>
      </section>
    </>
  );
};

export default JesusParallax;
