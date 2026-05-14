// pages/About.jsx
// Project vision, mission, features, and future plans

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import '../styles/components.css';
import '../styles/global.css';

const features = [
  { icon: '📖', title: 'Bilingual Reading',    desc: 'Read the Bible side-by-side in English and Tamil with elegant typography.' },
  { icon: '🕊️', title: 'Daily Devotions',      desc: 'Start every morning with a curated verse and reflection.' },
  { icon: '📱', title: 'Mobile First',          desc: 'Fully responsive — reads beautifully on any device.' },
  { icon: '🌙', title: 'Dark Premium Theme',    desc: 'A cinematic dark aesthetic designed for focused reading.' },
  { icon: '🔍', title: 'Search & Navigate',     desc: 'Jump to any book, chapter, or verse instantly.' },
  { icon: '🌐', title: 'Multi-language Plans',  desc: 'Structured reading plans in both languages.' },
];

const future = [
  'Bible API integration for all 66 books',
  'Audio Bible playback in English and Tamil',
  'Verse highlighting and personal notes',
  'User accounts and reading progress sync',
  'Push notifications for daily verse',
  'Community prayer wall',
  'Bible study group features',
  'Offline reading mode',
];

const About = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* ─── Hero ─── */}
      <section style={{ paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container">
          <ScrollReveal>
            <p className="section-label">About DuoBible</p>
            <h1 className="section-title" style={{ maxWidth: '700px', margin: '0 auto 1.5rem' }}>
              Built for Faith.<br />
              <span style={{ color: 'var(--gold)' }}>Designed for Everyone.</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.9, maxWidth: '600px', margin: '0 auto' }}>
              DuoBible is a modern, bilingual Bible reading platform created to bring
              the living Word of God to every generation — beautifully, accessibly, and faithfully.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Vision ─── */}
      <section className="home-section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <ScrollReveal direction="left">
              <p className="section-label">Vision</p>
              <h2 className="section-title">A Bible for the Digital Age</h2>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 2 }}>
                We believe that the Word of God should be accessible to everyone — regardless
                of language, device, or technical expertise. DuoBible was born from a passion
                to make scripture reading as beautiful and simple as reading a premium novel.
              </p>
              <br />
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 2 }}>
                Our goal is to serve the Tamil Christian community specifically, providing a
                platform where families can read, discuss, and grow together in the Word — in the
                language of their heart.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="home-section" id="features">
        <div className="container">
          <ScrollReveal>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <p className="section-label">Features</p>
              <h2 className="section-title">What DuoBible Offers</h2>
            </div>
          </ScrollReveal>
          <div className="cards-grid" style={{ marginTop: '3rem' }}>
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="verse-card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Future Plans ─── */}
      <section className="home-section" style={{ background: 'var(--bg-secondary)' }} id="future-plans">
        <div className="container">
          <ScrollReveal>
            <p className="section-label">Roadmap</p>
            <h2 className="section-title" style={{ marginBottom: '3rem' }}>Coming in Phase 2</h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {future.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem', background: 'var(--bg-glass)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-sm)', transition: 'border-color 0.3s' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold-border)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                >
                  <span style={{ color: 'var(--gold)', fontWeight: 700 }}>→</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Creator ─── */}
      <section className="home-section" id="creator" style={{ textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <div className="prayer-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✝️</div>
              <p className="section-label" style={{ marginBottom: '0.5rem' }}>Project Creator</p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Caren</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.9 }}>
                Dedicated to building a modern, bilingual platform<br />
                to share the Word of God with the world.<br />
                <em style={{ color: 'var(--gold)' }}>Designing faith-driven technology for the next generation.</em>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
