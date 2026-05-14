// components/Footer.jsx
// Premium dark footer with links and branding

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components.css';

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="navbar-logo" style={{ fontSize: '1.8rem' }}>DuoBible</div>
            <p>
              A modern bilingual Bible platform — bringing the ancient Word of God to life
              through elegant technology and faithful design.
            </p>
          </div>

          {/* Navigate */}
          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              {[['Home', '/home'], ['Read Bible', '/read'], ['Daily Reading', '/daily'], ['About', '/about']].map(([label, path]) => (
                <li key={path}>
                  <a href={path} onClick={(e) => { e.preventDefault(); navigate(path); }}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Books */}
          <div className="footer-col">
            <h4>Quick Read</h4>
            <ul>
              {['Genesis', 'Psalms', 'Proverbs', 'John', 'Romans'].map((book) => (
                <li key={book}>
                  <a href="/read" onClick={(e) => { e.preventDefault(); navigate('/read'); }}>{book}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Creator */}
          <div className="footer-col">
            <h4>Creator</h4>
            <ul>
              <li><a href="#" style={{ color: 'var(--gold)' }}>Caren</a></li>
              <li><a href="#">Faith-driven technology</a></li>
              <li><a href="#">for the next generation</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {year} DuoBible Project. All rights reserved.</p>
          <p>Built with ❤️ for the Kingdom</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
