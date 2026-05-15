// pages/DailyReading.jsx
// Structured daily Bible reading plan page

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DailyVerse from '../components/DailyVerse';
import LanguageToggle from '../components/LanguageToggle';
import ScrollReveal from '../components/ScrollReveal';
import { readingPlans } from '../data/bibleData';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const weeklyPlan = [
  { day: 'Sunday',    book: 'Psalms 1',       done: true  },
  { day: 'Monday',    book: 'Proverbs 1',     done: true  },
  { day: 'Tuesday',   book: 'John 1',         done: true  },
  { day: 'Wednesday', book: 'Romans 8',       done: false },
  { day: 'Thursday',  book: 'Isaiah 40',      done: false },
  { day: 'Friday',    book: 'Matthew 5',      done: false },
  { day: 'Saturday',  book: 'Revelation 21',  done: false },
];

const DailyReading = () => {
  const [language, setLanguage] = useState('en');
  const today = new Date().getDay(); // 0 = Sunday

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ─── Header ─── */}
      <section style={{ paddingTop: '9rem', paddingBottom: '3rem', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <p className="section-label">Your Reading Journey</p>
            <h1 className="section-title">Daily Reading Plan</h1>
            <p style={{ color: 'var(--text-secondary)', margin: '1rem auto 2rem', maxWidth: '500px', lineHeight: 1.8 }}>
              Structured daily readings to guide you through the Word of God, one passage at a time.
            </p>
            <LanguageToggle language={language} onChange={setLanguage} />
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Daily Verse ─── */}
      <ScrollReveal>
        <DailyVerse language={language} />
      </ScrollReveal>


      <Footer />
    </div>
  );
};

export default DailyReading;
