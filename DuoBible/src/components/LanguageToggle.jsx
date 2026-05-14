// components/LanguageToggle.jsx
// English / Tamil bilingual switch

import React from 'react';
import '../styles/components.css';

const LanguageToggle = ({ language, onChange }) => {
  return (
    <div className="lang-toggle" role="group" aria-label="Language selection">
      <button
        id="lang-english"
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => onChange('en')}
        aria-pressed={language === 'en'}
      >
        English
      </button>
      <button
        id="lang-tamil"
        className={`lang-btn ${language === 'ta' ? 'active' : ''}`}
        onClick={() => onChange('ta')}
        aria-pressed={language === 'ta'}
      >
        தமிழ்
      </button>
      <button
        id="lang-both"
        className={`lang-btn ${language === 'both' ? 'active' : ''}`}
        onClick={() => onChange('both')}
        aria-pressed={language === 'both'}
      >
        Both
      </button>
    </div>
  );
};

export default LanguageToggle;
