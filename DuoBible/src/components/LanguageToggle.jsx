import React, { useState, useRef, useEffect } from 'react';
import '../styles/components.css';

const LANGS = [
  { k: 'english', l: 'English', script: 'En' },
  { k: 'tamil', l: 'தமிழ்', script: 'Ta' },
  { k: 'hindi', l: 'हिन्दी', script: 'Hi' },
  { k: 'malayalam', l: 'മലയാളം', script: 'Ml' },
  { k: 'kannada', l: 'ಕನ್ನಡ', script: 'Kn' },
  { k: 'gujarati', l: 'ગુજરાતી', script: 'Gu' },
  { k: 'both', l: 'Bilingual', script: '⇌' },
];

const LanguageToggle = ({ language, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  
  // Map legacy 'en' / 'ta' to new keys if necessary
  let currentKey = language;
  if (language === 'en') currentKey = 'english';
  if (language === 'ta') currentKey = 'tamil';

  const current = LANGS.find(l => l.k === currentKey) || LANGS[0];

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleChange = (newKey) => {
    onChange(newKey);
    setOpen(false);
  };

  return (
    <div className="lang-dropdown" ref={ref} style={{ margin: '0 auto', width: 'fit-content' }}>
      <button className="lang-trigger" onClick={() => setOpen(p => !p)} aria-haspopup="listbox" aria-expanded={open}>
        <span className="lang-globe">🌐</span>
        <span className="lang-current">{current.l}</span>
        <span className={`lang-caret ${open ? 'open' : ''}`}>▾</span>
      </button>
      <div className={`lang-menu ${open ? 'open' : ''}`} role="listbox">
        {LANGS.map(l => (
          <button key={l.k} role="option" aria-selected={currentKey === l.k}
            className={`lang-option ${currentKey === l.k ? 'active' : ''}`}
            onClick={() => handleChange(l.k)}>
            <span className="lang-badge">{l.script}</span>
            <span className="lang-label">{l.l}</span>
            {currentKey === l.k && <span className="lang-check">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle;
