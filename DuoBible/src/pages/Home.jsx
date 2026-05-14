// pages/Home.jsx
// Main dashboard with 10 sections

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DailyVerse from '../components/DailyVerse';
import VerseCard from '../components/VerseCard';
import LanguageToggle from '../components/LanguageToggle';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedBackground from '../components/AnimatedBackground';
import { featuredVerses, readingPlans } from '../data/bibleData';
import '../styles/home.css';
import '../styles/components.css';

const Home = () => {
  const navigate  = useNavigate();
  const [language, setLanguage] = useState('en');

  return (
    <div className="home-wrapper">
      <AnimatedBackground />
      <Navbar />

      {/* ─────────────── 1. WELCOME BANNER ─────────────── */}
      <section className="welcome-banner" id="welcome">
        <div className="container">
          <ScrollReveal>
            <p className="welcome-greeting">✦ &nbsp; Welcome to DuoBible &nbsp; ✦</p>
            <h1 className="welcome-title">
              The Word of God,<br />
              <span style={{ color: 'var(--gold)' }}>In Every Language</span>
            </h1>
            <div className="welcome-quote" style={{ marginTop: '3rem', fontStyle: 'italic', opacity: 0.8 }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                "Thy word is a lamp unto my feet, and a light unto my path."
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.1em' }}>
                — PSALM 119:105 —
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} style={{ marginTop: '5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                id="start-reading-btn"
                className="nav-cta"
                onClick={() => navigate('/read')}
                style={{ fontSize: '0.85rem', padding: '0.9rem 2.5rem', fontWeight: 700, letterSpacing: '0.1em' }}
                aria-label="Start reading the Bible"
              >
                START READING
              </button>
              <button
                id="daily-plan-btn"
                onClick={() => navigate('/daily')}
                style={{
                  fontSize: '0.85rem', padding: '0.9rem 2.5rem',
                  border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-full)',
                  color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.1em',
                  transition: 'all 0.3s', cursor: 'pointer',
                  background: 'transparent',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--gold-dim)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
                aria-label="View daily reading plan"
              >
                DAILY PLAN
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────────── 2. DAILY VERSE ─────────────── */}
      <ScrollReveal>
        <DailyVerse language={language} />
      </ScrollReveal>

      {/* ─────────────── 3. LANGUAGE TOGGLE ─────────────── */}
      <section className="home-section" id="language-toggle" style={{ padding: '2.5rem 0', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <p className="section-label">Display Language</p>
            <LanguageToggle language={language} onChange={setLanguage} />
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────────── 4. DISCOVERY SECTION (MOVED) ─────────────── */}
      <section className="home-section" id="discovery" style={{ overflow: 'hidden' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <p className="section-label">Explore</p>
              <h2 className="section-title">Daily Discovery</h2>
            </div>
          </ScrollReveal>

          <div style={{ 
            display: 'flex', 
            gap: '2rem', 
            overflowX: 'auto', 
            padding: '1rem 0 3rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }} className="hide-scrollbar">
            {[
              { title: 'The Good Shepherd', sub: 'Find rest in the valley of peace', img: '/src/assets/daily1.jpg', tag: 'Devotion' },
              { title: 'Pathway to Life', sub: 'Explore the narrow road to truth', img: '/src/assets/daily2.jpg', tag: 'History' },
              { title: 'Abundant Grace', sub: 'Bask in the warmth of His love', img: '/src/assets/daily3.jpg', tag: 'Meditation' },
              { title: 'Ancient Wisdom', sub: 'Deep study for a modern world', img: '/src/assets/daily1.jpg', tag: 'Study' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card" style={{ 
                  minWidth: '320px',
                  height: '420px',
                  padding: 0,
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img src={item.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 0, left: 0, right: 0, 
                    padding: '2.5rem',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.9), transparent)'
                  }}>
                    <span style={{ 
                      fontSize: '0.65rem', 
                      fontWeight: 800, 
                      letterSpacing: '0.2em', 
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      background: 'rgba(212,175,55,0.1)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '4px',
                      display: 'inline-block',
                      marginBottom: '1rem'
                    }}>{item.tag}</span>
                    <h3 style={{ fontSize: '1.8rem', color: '#111', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.5 }}>{item.sub}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── 5. FEATURED SCRIPTURE CARDS ─────────────── */}
      <section className="home-section" id="featured-verses">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <p className="section-label">Scripture</p>
              <h2 className="section-title">Featured Verses</h2>
            </div>
          </ScrollReveal>

          <div className="cards-grid stagger-children">
            {featuredVerses.map((verse, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <VerseCard
                  book={verse.book}
                  text={verse.text}
                  ta={verse.ta}
                  language={language}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── 6. CONTINUE READING ─────────────── */}
      <section className="home-section" id="continue-reading">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <p className="section-label">Continue</p>
              <h2 className="section-title">Where You Left Off</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Last Read</p>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600 }}>Psalms 23</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Chapter 23 • Verse 1</p>
              </div>
              <button id="continue-reading-btn" className="nav-cta" onClick={() => navigate('/read')}
                style={{ padding: '0.8rem 2rem', fontSize: '0.9rem' }}>
                Continue →
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────────── 7. POPULAR CHAPTERS ─────────────── */}
      <section className="home-section" id="popular-chapters">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <p className="section-label">Beloved Passages</p>
              <h2 className="section-title">Popular Chapters</h2>
            </div>
          </ScrollReveal>
          <div className="cards-grid">
            {[
              { title: 'Psalms 23',    sub: 'The Lord is my shepherd', emoji: '🕊️' },
              { title: 'John 3',       sub: 'For God so loved the world', emoji: '✝️' },
              { title: 'Proverbs 3',   sub: 'Trust in the Lord', emoji: '📖' },
              { title: 'Romans 8',     sub: 'More than conquerors', emoji: '🙏' },
              { title: 'Isaiah 40',    sub: 'They shall mount up with wings', emoji: '🦅' },
              { title: 'Revelation 21',sub: 'All things new', emoji: '🌅' },
            ].map((ch, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="verse-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/read')} role="button" tabIndex={0}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{ch.emoji}</div>
                  <div className="verse-book">{ch.title}</div>
                  <p className="verse-text" style={{ fontStyle: 'normal' }}>{ch.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── 8. PRAYER SECTION ─────────────── */}
      <section className="prayer-section" id="prayer">
        <div className="container">
          <ScrollReveal>
            <div className="prayer-card">
              <div className="prayer-emoji">🙏</div>
              <h2 className="prayer-title">Today's Prayer</h2>
              <p className="prayer-text">
                "Lord, open my eyes that I may see wonderful things in your law.
                Guide my steps according to your Word, and let your truth be a
                lamp unto my feet and a light unto my path. Amen."
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────────── 9. INSPIRATIONAL QUOTE ─────────────── */}
      <section className="quote-section" id="inspiration">
        <div className="container">
          <ScrollReveal>
            <p className="section-label">Reflection</p>
            <blockquote className="quote-text">
              The Bible is not just a book — it is alive.
              It speaks to every generation, in every language, for every need.
            </blockquote>
            <div className="quote-ref">— DuoBible Vision</div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────────── 10. FOOTER ─────────────── */}
      <Footer />
    </div>
  );
};

export default Home;
