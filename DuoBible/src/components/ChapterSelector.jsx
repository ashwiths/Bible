// components/ChapterSelector.jsx
// Numbered chapter grid for selecting Bible chapters

import React from 'react';
import '../styles/components.css';

const ChapterSelector = ({ book, chapters = 50, selectedChapter, onSelect }) => {
  // Chapter count per book (simplified map for demo)
  const chapterCounts = {
    Genesis: 50, Exodus: 40, Psalms: 150, Proverbs: 31,
    John: 21, Matthew: 28, Mark: 16, Luke: 24, Acts: 28,
    Romans: 16, Revelation: 22,
  };

  const count = chapterCounts[book] || 10;

  return (
    <div className="chapter-selector" role="group" aria-label={`Chapters of ${book}`}>
      {Array.from({ length: count }, (_, i) => i + 1).map((ch) => (
        <button
          key={ch}
          id={`chapter-${ch}`}
          className={`chapter-btn ${selectedChapter === ch ? 'active' : ''}`}
          onClick={() => onSelect(ch)}
          aria-label={`Chapter ${ch}`}
          aria-pressed={selectedChapter === ch}
        >
          {ch}
        </button>
      ))}
    </div>
  );
};

export default ChapterSelector;
