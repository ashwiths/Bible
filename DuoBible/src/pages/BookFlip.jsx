import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import coverArt from '../assets/daily1.jpg';
import '../styles/bookflip.css';

const API = 'http://localhost:5000/api/bible';
const VPP = 10; // verses per page — slightly fewer for clean layout

const BOOKS = [
  'Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth',
  '1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles',
  'Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes',
  'Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel',
  'Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk',
  'Zephaniah','Haggai','Zechariah','Malachi',
  'Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians',
  'Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians',
  '1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter',
  '1 John','2 John','3 John','Jude','Revelation',
];

const LANGS = ['english','tamil','hindi','malayalam','kannada','gujarati'];

const toKey = (b) => b.toLowerCase().replace(/\s+/g, '');

const chunkVerses = (verses, lang) => {
  // Non-English scripts (Tamil, Malayalam, etc.) are taller and wrap more,
  // so they need a smaller character limit to fit physically on the page.
  const maxChars = lang === 'english' ? 600 : 380;
  
  const pages = [];
  let currentPage = [];
  let currentCharCount = 0;

  for (const v of verses) {
    const vLen = v.value ? v.value.length : 0;
    // Base weight + margin allowance
    const weight = vLen + 45; 

    if (currentCharCount + weight > maxChars && currentPage.length > 0) {
      pages.push(currentPage);
      currentPage = [v];
      currentCharCount = weight;
    } else {
      currentPage.push(v);
      currentCharCount += weight;
    }
  }
  
  if (currentPage.length > 0) pages.push(currentPage);
  return pages;
};

/* ── Page of verses ── */
const VersePage = ({ verses, pageNum, bookName, chapNum }) => (
  <div className="bfp-content">
    <p className="bfp-chaphead">{bookName} · Chapter {chapNum}</p>
    <div className="bfp-verses">
      {(verses || []).map(v => (
        <p key={v.verseNumber} className="bfp-verse">
          <sup className="bfp-vnum">{v.verseNumber}</sup>{v.value}
        </p>
      ))}
    </div>
    {pageNum != null && <span className="page__number">{pageNum}</span>}
  </div>
);

/* ── Title / chapter intro page ── */
const TitlePage = ({ bookName, chapNum, lang }) => (
  <div className="page__content">
    <p className="page__content-book-title">{bookName}</p>
    <p className="page__content-author">{lang.charAt(0).toUpperCase() + lang.slice(1)} Bible</p>
    <p className="page__content-credits">Chapter<span>{chapNum}</span></p>
    <p className="page__content-copyright">DuoBible · Multilingual Edition · MMXXVI</p>
  </div>
);

/* ══════════════════════════════════════════ */
const BookFlip = () => {
  const [lang, setLang]         = useState('english');
  const [bookIdx, setBookIdx]   = useState(42); // John
  const [chapter, setChapter]   = useState(1);  // Start at chapter 1 by default
  const [totalCh, setTotalCh]   = useState(1);
  const [pages, setPages]       = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // spread 0 = cover, spread 1+ = content
  const [spread, setSpread]     = useState(0);
  // 'idle' | 'fwd' | 'bwd'
  const [animDir, setAnimDir]   = useState('idle');
  const [snapState, setSnap]    = useState(false);
  // while animating, show pending content in right panel / back face
  const [pendSpread, setPend]   = useState(null);

  const bookKey      = toKey(BOOKS[bookIdx]);
  const bookName     = BOOKS[bookIdx];
  const totalSpreads = 1 + Math.ceil(pages.length / 2);
  const isAnimating  = animDir !== 'idle';

  /* ── Fetch chapter ── */
  useEffect(() => {
    let alive = true;
    setLoading(true); setError(null); setSpread(0); setAnimDir('idle');
    fetch(`${API}/${lang}/${bookKey}/${chapter}`)
      .then(r => { if (!r.ok) throw new Error(`${r.status}`); return r.json(); })
      .then(d => { if (!alive) return; setPages(chunkVerses(d.verses || [], lang)); setTotalCh(d.totalChapters || 1); })
      .catch(e => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [lang, bookKey, chapter]);

  /* ── Spread content helper ── */
  const getSpread = (idx) => {
    if (idx === 0) return { L: 'cover', R: 'title' };
    const b = (idx - 1) * 2;
    return { L: pages[b] ?? null, Lp: b + 1, R: pages[b + 1] ?? null, Rp: b + 2 };
  };

  const cur  = getSpread(spread);
  const pend = getSpread(pendSpread ?? spread + 1);

  /* ── Navigate FORWARD ── */
  const goFwd = () => {
    if (isAnimating || spread >= totalSpreads - 1 || loading) return;
    const target = spread + 1;
    setPend(target);
    setAnimDir('fwd');
    setTimeout(() => {
      // Snap: disable animation, update content
      setSnap(true);
      setSpread(target);
      setPend(null);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setSnap(false);
        setAnimDir('idle');
      }));
    }, 940);
  };

  /* ── Navigate BACKWARD ── */
  const goBack = () => {
    if (isAnimating || spread <= 0 || loading) return;
    const target = spread - 1;
    setPend(target);
    setAnimDir('bwd');
    setTimeout(() => {
      setSnap(true);
      setSpread(target);
      setPend(null);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setSnap(false);
        setAnimDir('idle');
      }));
    }, 940);
  };

  /* ── Render panel content ── */
  const renderContent = (val, pg) => {
    if (val === 'cover') return <img src={coverArt} alt="cover" className="bf-cover-img" />;
    if (val === 'title') return <TitlePage bookName={bookName} chapNum={chapter} lang={lang} />;
    if (!val)            return <div className="bfp-content bfp-empty"><p>✦</p></div>;
    return <VersePage verses={val} pageNum={pg} bookName={bookName} chapNum={chapter} />;
  };

  /* For forward: left panel stays (cur.L), right panel behind flip card shows pend.R during anim */
  /* For backward: flip card starts at -180 and comes back; left shows pend.L */
  const leftContent  = animDir === 'bwd' && pendSpread !== null ? pend.L : cur.L;
  const leftPg       = animDir === 'bwd' && pendSpread !== null ? pend.Lp : cur.Lp;
  const rightBehind  = isAnimating && pendSpread !== null
    ? (animDir === 'fwd' ? pend.R : cur.R)
    : cur.R;
  const rightBehindPg = isAnimating && pendSpread !== null
    ? (animDir === 'fwd' ? pend.Rp : cur.Rp)
    : cur.Rp;

  // Flip card position: fwd starts at 0→-180; bwd starts at -180→0
  const flipInitialStyle = animDir === 'bwd' && !snapState
    ? { transform: 'rotateY(-180deg)' }
    : {};

  const flipAnimClass = snapState ? 'bf-flip--snap'
    : animDir === 'fwd' ? 'bf-flip--fwd'
    : animDir === 'bwd' ? 'bf-flip--bwd'
    : '';

  return (
    <div className="bf-root">
      <Link to="/home" className="bf-back">← Back</Link>

      {/* ── Controls ── */}
      <div className="bf-controls">
        <select className="bf-select" value={lang}
          onChange={e => { setLang(e.target.value); setChapter(1); }}>
          {LANGS.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase()+l.slice(1)}</option>)}
        </select>
        <select className="bf-select" value={bookIdx}
          onChange={e => { setBookIdx(+e.target.value); setChapter(1); }}>
          {BOOKS.map((b, i) => <option key={b} value={i}>{b}</option>)}
        </select>
        <div className="bf-ch-row">
          <button className="bf-ch-btn" onClick={() => setChapter(c => Math.max(1, c-1))} disabled={chapter <= 1}>‹</button>
          <span className="bf-ch-label">Ch {chapter} / {totalCh}</span>
          <button className="bf-ch-btn" onClick={() => setChapter(c => Math.min(totalCh, c+1))} disabled={chapter >= totalCh}>›</button>
        </div>
      </div>

      {/* ── Book ── */}
      <div className="bf-cover">
        {loading && <div className="bf-loading"><span>Loading…</span></div>}
        {error   && <div className="bf-loading bf-err"><span>⚠ {error}</span></div>}

        {/* Inner clipping wrapper so shadows can bleed outside */}
        <div className="bf-book-clip">
          <div className="bf-book">

            {/* LEFT panel */}
            <div className={`bf-panel bf-panel--left${animDir === 'fwd' ? ' bf-shadow-sweep' : ''}`}>
              {renderContent(leftContent, leftPg)}
            </div>

            {/* RIGHT panel — behind the flip card */}
            <div className={`bf-panel bf-panel--right${animDir === 'bwd' ? ' bf-shadow-sweep-bwd' : ''}`}>
              {renderContent(rightBehind, rightBehindPg)}
            </div>

            {/* FLIP CARD */}
            <div
              className={`bf-flip${flipAnimClass ? ' ' + flipAnimClass : ''}`}
              style={flipInitialStyle}
              onClick={goFwd}
              title="Click to turn page"
            >
              {/* Front face: shown before flip (fwd) or after (bwd: this is the "back" side) */}
              <div className="bf-face bf-face--front">
                {/* fwd: front shows current R. bwd: front shows pend R */}
                {animDir === 'bwd' && pendSpread !== null
                  ? renderContent(pend.R, pend.Rp)
                  : renderContent(cur.R, cur.Rp)}
              </div>

              {/* Back face: revealed mid-flip */}
              <div className="bf-face bf-face--back">
                {/* fwd: back shows pend L. bwd: back shows cur L */}
                {animDir === 'bwd' && pendSpread !== null
                  ? renderContent(cur.L, cur.Lp)
                  : renderContent(pend.L, pend.Lp)}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="bf-nav">
        <button className="bf-nav-btn" onClick={goBack}
          disabled={spread <= 0 || isAnimating}>‹ Prev</button>
        <span className="bf-nav-info">
          {spread === 0 ? 'Cover'
            : `Pages ${(spread-1)*2+1}–${(spread-1)*2+2} · ${totalSpreads-1} spreads`}
        </span>
        <button className="bf-nav-btn" onClick={goFwd}
          disabled={spread >= totalSpreads-1 || isAnimating || loading}>Next ›</button>
      </div>

      <p className="bf-hint">
        {spread === 0 ? 'Click right page or Next to begin reading'
          : spread >= totalSpreads - 1 ? 'End of chapter — use controls above'
          : 'Click page or use Prev · Next to navigate'}
      </p>
    </div>
  );
};

export default BookFlip;
