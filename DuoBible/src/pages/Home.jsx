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
