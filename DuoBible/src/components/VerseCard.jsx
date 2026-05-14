// components/VerseCard.jsx
// Individual scripture card with hover gold accent line

import React from 'react';
import '../styles/components.css';

const VerseCard = ({ book, text, ta, language = 'en', delay = 0 }) => {
  return (
    <article
      className="verse-card"
      style={{ animationDelay: `${delay}s` }}
      role="article"
      aria-label={`Scripture from ${book}`}
    >
      <div className="verse-book">{book}</div>

      {/* English verse */}
      {(language === 'en' || language === 'both') && (
        <p className="verse-text">"{text}"</p>
      )}

      {/* Tamil verse */}
      {(language === 'ta' || language === 'both') && (
        <p className="verse-text" style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.8)' }}>
          "{ta}"
        </p>
      )}

      <div className="verse-ref">{book}</div>
    </article>
  );
};

export default VerseCard;
