// components/Loader.jsx
// Bible-cross themed cinematic loading screen

import React, { useEffect } from 'react';
import '../styles/components.css';

const Loader = ({ onDone }) => {
  useEffect(() => {
    // Auto-dismiss after 2.2s so the landing page appears
    const timer = setTimeout(() => {
      if (onDone) onDone();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="loader-wrapper">
      {/* Cross symbol - a Bible-themed loader */}
      <div className="loader-cross" aria-label="Loading">
        <div className="loader-cross-h" />
        <div className="loader-cross-v" />
      </div>
      <div className="loader-text">DuoBible</div>
      <div className="loader-sub">The Word, in Every Language</div>
    </div>
  );
};

export default Loader;
