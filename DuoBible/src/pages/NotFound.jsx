// pages/NotFound.jsx
// 404 page with gold cross design

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/global.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <p style={{ fontSize: '6rem', marginBottom: '1rem' }}>✝️</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--gold)', marginBottom: '1rem' }}>404</h1>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Page Not Found
        </p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.8, maxWidth: '400px' }}>
          "For I know the plans I have for you..." — but this page wasn't one of them.
        </p>
        <button id="go-home-404" className="nav-cta" onClick={() => navigate('/home')}
          style={{ fontSize: '0.9rem', padding: '0.8rem 2rem' }}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
