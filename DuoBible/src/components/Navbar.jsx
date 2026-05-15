// components/Navbar.jsx
// Sticky glassmorphism navbar with mobile hamburger menu

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import bookmarkImg from '../assets/bookmark.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Add 'scrolled' class when user scrolls past 60px for stronger blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const links = [
    { label: 'Home', path: '/home' },
    { label: 'Read', path: '/read' },
    { label: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation">
        <div
          className="navbar-logo"
          onClick={() => navigate('/')}
          role="button"
          tabIndex={0}
          aria-label="DuoBible Landing Page"
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <img
            src={bookmarkImg}
            alt="DuoBible Logo"
            style={{ height: '40px', width: 'auto' }}
          />
          <span>DuoBible</span>
        </div>

        {/* Desktop Links */}
        <ul className="navbar-links" role="menubar">
          {links.map((link) => (
            <li key={link.path} role="none">
              <a
                href={link.path}
                role="menuitem"
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); navigate(link.path); }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="nav-link"
              onClick={() => navigate('/bookflip')}
              style={{ 
                border: '2px solid var(--gold)', 
                padding: '0.6rem 1.4rem', 
                borderRadius: 'var(--radius-full)',
                color: '#111',
                marginRight: '1rem',
                fontWeight: '700',
                letterSpacing: '0.05em',
                fontSize: '0.8rem',
                background: 'rgba(184, 134, 11, 0.05)'
              }}
            >
              3D BIBLE
            </button>
          </li>
          <li>
            <button
              className="nav-cta"
              onClick={() => navigate('/read')}
              aria-label="Start reading the Bible"
            >
              Read Now
            </button>
          </li>
        </ul>

        {/* Hamburger (mobile) */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="menu">
        {links.map((link) => (
          <a
            key={link.path}
            href={link.path}
            role="menuitem"
            className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); navigate(link.path); setMenuOpen(false); }}
            style={{ fontSize: '1rem', padding: '0.5rem 0' }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
