// components/DailyVerse.jsx
// Glowing daily scripture card at the top of the Home page

import React from 'react';
import { dailyVerse } from '../data/bibleData';

const DailyVerse = ({ language = 'en' }) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <section className="daily-verse-section" aria-label="Daily Bible verse">
      <div className="container">
        <div className="daily-verse-card">
          <div className="daily-date">✦ {today} ✦</div>

          {/* Verse text — toggles based on language prop */}
          {(language === 'en' || language === 'english' || language === 'both') && (
            <blockquote className="daily-text">
              "{dailyVerse.text}"
            </blockquote>
          )}

          {language === 'both' && <div style={{ height: '0.5rem' }} />}

          {(language === 'ta' || language === 'tamil' || language === 'both') && (
            <blockquote className="daily-text" style={{ fontStyle: 'normal', fontSize: 'clamp(1.2rem,2.5vw,1.7rem)' }}>
              "{dailyVerse.ta}"
            </blockquote>
          )}

          <div className="daily-ref">— {dailyVerse.ref}</div>
        </div>
      </div>
    </section>
  );
};

export default DailyVerse;
