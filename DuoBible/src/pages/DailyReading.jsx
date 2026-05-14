// pages/DailyReading.jsx
// Structured daily Bible reading plan page

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DailyVerse from '../components/DailyVerse';
import LanguageToggle from '../components/LanguageToggle';
import ScrollReveal from '../components/ScrollReveal';
import { readingPlans } from '../data/bibleData';
import '../styles/components.css';

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

      {/* ─── Weekly Plan ─── */}
      <section className="home-section">
        <div className="container">
          <ScrollReveal>
            <p className="section-label">This Week</p>
            <h2 className="section-title">7-Day Plan</h2>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.75rem' }}>
            {weekDays.map((d, i) => (
              <div key={d} style={{ textAlign: 'center', fontSize: '0.75rem', letterSpacing: '0.1em', color: i === today ? 'var(--gold)' : 'var(--text-muted)', fontWeight: i === today ? 700 : 400 }}>
                {d}
              </div>
            ))}
            {weeklyPlan.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div id={`day-${i}`} style={{
                  padding: '1.5rem 1rem',
                  background: item.done ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  border: `1px solid ${i === today ? 'var(--gold)' : item.done ? 'var(--gold-border)' : 'rgba(0, 0, 0, 0.05)'}`,
                  borderRadius: '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = item.done ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)';
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem', opacity: item.done ? 1 : 0.6 }}>
                    {item.done ? '✅' : i === today ? '📖' : '🔲'}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#111', fontWeight: 600, letterSpacing: '0.02em', lineHeight: 1.4 }}>{item.book}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pathways of Wisdom ─── */}
      <section className="home-section" id="pathways">
        <div className="container">
          <ScrollReveal>
            <p className="section-label">Spiritual Growth</p>
            <h2 className="section-title">Pathways of Wisdom</h2>
          </ScrollReveal>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '2.5rem' 
          }}>
            {[
              { 
                title: 'Grace & Truth', 
                desc: 'A 30-day journey exploring the foundation of the Gospel through the New Testament.', 
                img: '/src/assets/daily3.jpg',
                level: 'Beginner'
              },
              { 
                title: 'The Great Prophets', 
                desc: 'Uncover the historical context and divine messages of the Old Testament prophets.', 
                img: '/src/assets/daily1.jpg',
                level: 'Advanced'
              },
              { 
                title: 'Wisdom Literature', 
                desc: 'Daily reflections on the practical and poetic wisdom of Psalms and Proverbs.', 
                img: '/src/assets/daily2.jpg',
                level: 'Intermediate'
              }
            ].map((path, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card" style={{ 
                  padding: '2.5rem', 
                  borderRadius: '24px',
                  border: '1px solid var(--gold-border)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: 0, right: 0, 
                    padding: '0.75rem 1.25rem', 
                    background: 'var(--gold-dim)', 
                    color: 'var(--gold)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    borderBottomLeftRadius: '12px'
                  }}>
                    {path.level.toUpperCase()}
                  </div>
                  <h3 style={{ fontSize: '1.6rem', color: '#111', fontFamily: 'var(--font-serif)' }}>{path.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, flexGrow: 1 }}>{path.desc}</p>
                  <button className="nav-cta" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
                    EXPLORE PATHWAY
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DailyReading;
