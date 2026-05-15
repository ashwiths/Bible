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
import heroBgImg from '../assets/hero_bg.png';
import daily2Img from '../assets/daily2.jpg';
import daily3Img from '../assets/daily3.jpg';

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

          <ScrollReveal delay={0.2} style={{ marginTop: '3rem', textAlign: 'center' }}>
            <button
              id="start-reading-btn"
              className="nav-cta"
              onClick={() => navigate('/read')}
              style={{ fontSize: '0.85rem', padding: '0.9rem 2.5rem', fontWeight: 700, letterSpacing: '0.1em' }}
              aria-label="Start reading the Bible"
            >
              START READING
            </button>
          </ScrollReveal>
        </div>

        {/* ─── Daily Discovery ─── */}
        <div className="container" style={{ marginTop: '4rem' }}>
          <ScrollReveal>
            <div className="section-header">
              <p className="section-label">Explore</p>
              <h2 className="section-title">Daily Discovery</h2>
            </div>
          </ScrollReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            padding: '1rem 0 3rem',
          }}>
            {[
              { title: 'The Good Shepherd', sub: 'Find rest in the valley of peace', img: heroBgImg, tag: 'Devotion' },
              { title: 'Pathway to Life', sub: 'Explore the narrow road to truth', img: daily2Img, tag: 'History' },
              { title: 'Abundant Grace', sub: 'Bask in the warmth of His love', img: daily3Img, tag: 'Meditation' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  className="glass-card"
                  style={{
                    width: '100%',
                    height: '380px',
                    padding: 0,
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: '24px',
                    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  }}
                  onClick={() => navigate('/read')}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
                >
                  <img src={item.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    padding: '2rem',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.95) 55%, transparent)',
                  }}>
                    <span style={{
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      background: 'rgba(212,175,55,0.1)',
                      padding: '0.35rem 0.7rem',
                      borderRadius: '4px',
                      display: 'inline-block',
                      marginBottom: '0.75rem',
                    }}>{item.tag}</span>
                    <h3 style={{ fontSize: '1.4rem', color: '#111', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.5 }}>{item.sub}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── 2. DAILY VERSE ─────────────── */}
      <ScrollReveal>
        <DailyVerse language={language} />
      </ScrollReveal>




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
