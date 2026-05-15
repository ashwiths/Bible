// components/BibleBooks.jsx
// Sidebar list of Bible books for the Read page

import React from 'react';
import { books } from '../data/bibleData';

const BibleBooks = ({ selectedBook, onSelect }) => {
  // All 66 books of the Bible - extended list for the sidebar
  const allBooks = [
    // Old Testament
    'Genesis','Exodus','Leviticus','Numbers','Deuteronomy',
    'Joshua','Judges','Ruth','1 Samuel','2 Samuel',
    '1 Kings','2 Kings','1 Chronicles','2 Chronicles',
    'Ezra','Nehemiah','Esther','Job','Psalms','Proverbs',
    'Ecclesiastes','Song of Solomon','Isaiah','Jeremiah',
    'Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos',
    'Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah',
    'Haggai','Zechariah','Malachi',
    // New Testament
    'Matthew','Mark','Luke','John','Acts',
    'Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians',
    'Philippians','Colossians','1 Thessalonians','2 Thessalonians',
    '1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James',
    '1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'
  ];

  // Group into OT and NT for visual separation
  const otBooks = allBooks.slice(0, 39);
  const ntBooks = allBooks.slice(39);

  return (
    <nav className="read-sidebar" aria-label="Books of the Bible">
      {/* Old Testament */}
      <div className="sidebar-title">Old Testament</div>
      {otBooks.map((book) => (
        <div
          key={book}
          id={`book-${book.replace(/\s/g, '-')}`}
          className={`book-item ${selectedBook === book ? 'active' : ''}`}
          onClick={() => onSelect(book)}
          role="button"
          tabIndex={0}
          aria-label={`Read ${book}`}
          onKeyDown={(e) => e.key === 'Enter' && onSelect(book)}
        >
          <span>{book}</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>›</span>
        </div>
      ))}

      {/* New Testament */}
      <div className="sidebar-title" style={{ marginTop: '2rem' }}>New Testament</div>
      {ntBooks.map((book) => (
        <div
          key={book}
          id={`book-${book.replace(/\s/g, '-')}`}
          className={`book-item ${selectedBook === book ? 'active' : ''}`}
          onClick={() => onSelect(book)}
          role="button"
          tabIndex={0}
          aria-label={`Read ${book}`}
          onKeyDown={(e) => e.key === 'Enter' && onSelect(book)}
        >
          <span>{book}</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>›</span>
        </div>
      ))}
    </nav>
  );
};

export default BibleBooks;
