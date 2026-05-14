// pages/ReadBible.jsx — 10/10 Premium Edition

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { bibleData } from '../data/bibleData';
import '../styles/read.css';

/* ─── Data ─── */
const OT = [
  'Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth',
  '1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles',
  'Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes',
  'Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel',
  'Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk',
  'Zephaniah','Haggai','Zechariah','Malachi',
];
const NT = [
  'Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians',
  'Galatians','Ephesians','Philippians','Colossians','1 Thessalonians',
  '2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews',
  'James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation',
];
const CH = {
  Genesis:50,Exodus:40,Psalms:150,Proverbs:31,John:21,Matthew:28,
  Mark:16,Luke:24,Acts:28,Romans:16,Revelation:22,Isaiah:66,
};
const MODES = [
  {k:'light',icon:'☀️',l:'Light'},
  {k:'sepia',icon:'📜',l:'Sepia'},
  {k:'dark', icon:'🌙',l:'Dark'},
];
const LANGS = [
  {k:'en',  l:'English'},
  {k:'ta',  l:'தமிழ்'},
  {k:'both',l:'Both'},
];

/* ── Audio Player ── */
const AudioPlayer = ({ book, ch }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="rp-audio" role="complementary" aria-label="Audio player">
      <button className="rp-audio-play" onClick={() => setPlaying(p=>!p)} aria-label={playing?'Pause':'Play'}>
        {playing ? '⏸' : '▶'}
      </button>
      <div className="rp-audio-info">
        <div className="rp-audio-t">{book} · Ch. {ch}</div>
        <div className="rp-audio-s">Listen · Coming Soon</div>
      </div>
      {playing && <div className="rp-wave" aria-hidden="true">{[1,2,3,4,5].map(i=><span key={i}/>)}</div>}
    </div>
  );
};

/* ── Single Verse ── */
const Verse = ({ verse, idx, lang }) => {
  const ref  = useRef(null);
  const [vis, setVis] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting){ setVis(true); io.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const copy = useCallback(e => {
    e.stopPropagation();
    navigator.clipboard?.writeText([verse.en, verse.ta].filter(Boolean).join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }, [verse]);

  return (
    <div
      ref={ref}
      id={`v-${idx+1}`}
      className={`rp-verse ${vis?'vis':''}`}
      style={{ transitionDelay: vis ? `${Math.min(idx*0.042,0.65)}s` : '0s' }}
      role="region"
      aria-label={`Verse ${idx+1}`}
    >
      <span className="rp-vnum">{idx+1}</span>
      <div className="rp-vbody">
        {(lang==='en'||lang==='both') && verse.en && <p className="rp-ven">{verse.en}</p>}
        {lang==='both' && verse.en && verse.ta && <div className="rp-vdiv" aria-hidden="true"/>}
        {(lang==='ta'||lang==='both') && verse.ta && <p className="rp-vta">{verse.ta}</p>}
      </div>
      <div className="rp-vacts" aria-hidden="true">
        <button className="rp-vact" title="Bookmark" onClick={e=>e.stopPropagation()}>🔖</button>
        <button className="rp-vact" title={copied?'Copied!':'Copy'} onClick={copy}>{copied?'✓':'📋'}</button>
        <button className="rp-vact" title="Highlight" onClick={e=>e.stopPropagation()}>✏️</button>
        <button className="rp-vact" title="Share" onClick={e=>e.stopPropagation()}>↗</button>
      </div>
    </div>
  );
};

/* ── Chapter Panel ── */
const ChapterPanel = ({ book, selected, onSelect }) => {
  const [open, setOpen] = useState(true);
  const count = CH[book] || 10;
  return (
    <div className="rp-ch-panel">
      <button className="rp-ch-trigger" onClick={() => setOpen(p=>!p)}>
        <span>Select Chapter</span>
        <span className="rp-ch-trigger-r">
          <span>Ch. {selected}</span>
          <span className={`rp-ch-arrow ${open?'open':''}`}>▾</span>
        </span>
      </button>
      <div className={`rp-ch-body ${open?'open':''}`}>
        <div className="rp-ch-grid" role="group" aria-label={`Chapters of ${book}`}>
          {Array.from({length:count},(_,i)=>i+1).map(n=>(
            <button
              key={n} id={`ch-${n}`}
              className={`rp-ch-btn ${selected===n?'on':''}`}
              onClick={()=>onSelect(n)}
              aria-label={`Chapter ${n}`}
              aria-pressed={selected===n}
            >{n}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Main Page ── */
const ReadBible = () => {
  const [book,    setBook]    = useState('Psalms');
  const [ch,      setCh]      = useState(23);
  const [lang,    setLang]    = useState('both');
  const [mode,    setMode]    = useState('light');
  const [sidebar, setSidebar] = useState(true);
  const [focus,   setFocus]   = useState(false);
  const [pct,     setPct]     = useState(0);

  const navigate  = useNavigate();
  const scrollRef = useRef(null);
  const verses    = bibleData[book]?.[ch] || [];
  const chCount   = CH[book] || 10;

  /* progress tracking */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const fn = () => {
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? Math.round((el.scrollTop/max)*100) : 100);
    };
    el.addEventListener('scroll', fn, {passive:true});
    return () => el.removeEventListener('scroll', fn);
  }, []);

  /* reset on navigation */
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setPct(0);
  }, [book, ch]);

  const selectBook = b => {
    setBook(b); setCh(1);
    if (window.innerWidth < 900) setSidebar(false);
  };

  const sidebarLeft = focus ? 0 : (sidebar ? 234 : 0);

  return (
    <div className={`rp ${focus?'focus-mode':''}`} data-mode={mode}>

      {/* Reading progress */}
      <div className="rp-progress" role="progressbar" aria-valuenow={pct}>
        <div className="rp-progress-fill" style={{width:`${pct}%`}}/>
      </div>

      <div className="rp-body">

        {/* ── Sidebar ── */}
        <nav
          className={`rp-sidebar ${(!sidebar||focus)?'closed':''} ${window.innerWidth<900&&sidebar?'open':''}`}
          aria-label="Bible books"
        >
          <div className="rp-sb-inner">
            <span className="rp-sb-label">Old Testament</span>
            {OT.map(b=>(
              <div key={b} id={`book-${b.replace(/\s/g,'-')}`}
                className={`rp-book ${book===b?'active':''}`}
                onClick={()=>selectBook(b)}
                role="button" tabIndex={0}
                aria-label={`Read ${b}`}
                onKeyDown={e=>e.key==='Enter'&&selectBook(b)}
              >
                <span>{b}</span>
                <span className="rp-book-arr">›</span>
              </div>
            ))}
            <span className="rp-sb-label">New Testament</span>
            {NT.map(b=>(
              <div key={b} id={`book-${b.replace(/\s/g,'-')}`}
                className={`rp-book ${book===b?'active':''}`}
                onClick={()=>selectBook(b)}
                role="button" tabIndex={0}
                aria-label={`Read ${b}`}
                onKeyDown={e=>e.key==='Enter'&&selectBook(b)}
              >
                <span>{b}</span>
                <span className="rp-book-arr">›</span>
              </div>
            ))}
          </div>
        </nav>

        {/* Sidebar toggle */}
        {!focus && (
          <button
            className="rp-toggle"
            style={{left:`${sidebarLeft}px`}}
            onClick={()=>setSidebar(p=>!p)}
            aria-label={sidebar?'Collapse sidebar':'Expand sidebar'}
          >
            {sidebar?'‹':'›'}
          </button>
        )}

        {/* ── Main column ── */}
        <div className="rp-main">

          {/* Single unified header */}
          <div className="rp-hdr">
            {/* LEFT: Back Button */}
            <button className="rp-back-btn" onClick={()=>navigate('/home')} aria-label="Back to Home">
              <span className="rp-back-icon">←</span>
            </button>

            {/* CENTER: Book + chapter */}
            <div className="rp-hdr-center">
              <h1 className="rp-title">{book}</h1>
              <p className="rp-sub">Chapter {ch} &nbsp;·&nbsp; {pct}% read</p>
            </div>

            {/* RIGHT: Controls */}
            <div className="rp-controls">

              <div className="rp-pill" role="group" aria-label="Language">
                {LANGS.map(l=>(
                  <button key={l.k} id={`lang-${l.k}`}
                    className={`rp-pill-btn ${lang===l.k?'on':''}`}
                    onClick={()=>setLang(l.k)}
                    aria-pressed={lang===l.k} aria-label={`Show ${l.l}`}
                  >{l.l}</button>
                ))}
              </div>
              <button id="focus-mode-btn"
                className={`rp-focus-btn ${focus?'on':''}`}
                onClick={()=>setFocus(p=>!p)}
                aria-pressed={focus}
                aria-label={focus?'Exit focus mode':'Enter focus mode'}
              >{focus ? '✕ Focus' : '⊙ Focus'}</button>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="rp-scroll" ref={scrollRef}>
            <div className="rp-content">

              <ChapterPanel book={book} selected={ch} onSelect={setCh}/>

              <article className="rp-verse-area" aria-label={`${book} Chapter ${ch}`}>
                {verses.length > 0 ? (
                  verses.map((v,i) => (
                    <Verse key={`${book}-${ch}-${i}`} verse={v} idx={i} lang={lang}/>
                  ))
                ) : (
                  <div className="rp-empty">
                    <div className="rp-empty-ico">📖</div>
                    <p className="rp-empty-t">{book} · Chapter {ch}</p>
                    <p className="rp-empty-s">
                      Full Bible content coming in Phase 2.<br/>
                      Demo available: Genesis 1, Psalms 23 &amp; 119, John 3.
                    </p>
                  </div>
                )}
              </article>

              {verses.length > 0 && (
                <nav className="rp-ch-nav" aria-label="Chapter navigation">
                  <button id="prev-chapter-btn" className="rp-nav-btn"
                    onClick={()=>setCh(c=>Math.max(1,c-1))}
                    disabled={ch===1} aria-label="Previous chapter">
                    ← Previous
                  </button>
                  <button id="next-chapter-btn" className="rp-nav-btn"
                    onClick={()=>setCh(c=>Math.min(chCount,c+1))}
                    disabled={ch===chCount} aria-label="Next chapter">
                    Next →
                  </button>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>

      <AudioPlayer book={book} ch={ch}/>
    </div>
  );
};

export default ReadBible;
