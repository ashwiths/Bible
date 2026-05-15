// pages/Landing.jsx
// ============================================================
// FIRST SCREEN — Cinematic fullscreen hero with Anime.js
// The Explore button navigates to /home using React Router
// ============================================================

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import '../styles/landing.css';
import '../styles/animations.css';

const Landing = () => {
  const navigate = useNavigate();

  // Refs for Anime.js targets
  const labelRef    = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef      = useRef(null);
  const [leaving, setLeaving] = useState(false);

  // Run entrance animations on mount using Anime.js
  useEffect(() => {
    // Dynamically import anime.js so it only loads on this page
    import('animejs').then(({ default: anime }) => {
      // Staggered entrance: label → title → subtitle → button
      anime.timeline({ easing: 'easeOutExpo' })
        .add({
          targets: labelRef.current,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
        })
        .add({
          targets: titleRef.current,
          opacity: [0, 1],
          translateY: [60, 0],
          duration: 1200,
          offset: '-=400',
        })
        .add({
          targets: subtitleRef.current,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 900,
          offset: '-=600',
        })
        .add({
          targets: btnRef.current,
          opacity: [0, 1],
          translateY: [20, 0],
          scale: [0.9, 1],
          duration: 700,
          offset: '-=400',
        });
    });
  }, []);

  // Handle Explore button click
  // → Fade out → navigate to /home (no page reload)
  const handleExplore = () => {
    if (leaving) return; // prevent double-clicks
    setLeaving(true);

    import('animejs').then(({ default: anime }) => {
      anime({
        targets: '.landing-wrapper',
        opacity: [1, 0],
        duration: 600,
        easing: 'easeInQuad',
        complete: () => navigate('/home'),
      });
    });
  };

  return (
    <main className="landing-wrapper" role="main" aria-label="DuoBible Landing Page">
      {/* Floating gold particles */}
      <AnimatedBackground />

      {/* Cinematic background image with subtle zoom */}
      <div className="landing-bg" aria-hidden="true" />

      {/* Gradient overlay for depth */}
      <div className="landing-overlay" aria-hidden="true" />

      {/* Top nav brand mark */}
      <div className="landing-nav" aria-label="Site header">
        <div className="landing-logo">DuoBible</div>
      </div>

      {/* --- HERO CONTENT --- */}
      <div className="landing-content">

        {/* EXPLORE BUTTON — navigates to /home */}
        <div className="landing-btn-wrapper" ref={btnRef}>
          <button
            id="explore-btn"
            className="explore-btn"
            onClick={handleExplore}
            aria-label="Explore DuoBible — Enter the reading platform"
            style={{ background: '#d4af37', color: '#111', padding: '0.8rem 2.2rem', fontSize: '0.9rem' }}
          >
            Explore
            {/* Right arrow icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll hint at bottom */}
      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </main>
  );
};

export default Landing;
