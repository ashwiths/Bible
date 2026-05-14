// pages/ReadBible.jsx — World-Class Premium Multilingual Bible Reader
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { bibleData } from '../data/bibleData';
import { bookTranslations } from '../data/bookTranslations';
import '../styles/read.css';

const OT = [
  { key: "genesis", english: "Genesis" }, { key: "exodus", english: "Exodus" }, { key: "leviticus", english: "Leviticus" },
  { key: "numbers", english: "Numbers" }, { key: "deuteronomy", english: "Deuteronomy" }, { key: "joshua", english: "Joshua" },
  { key: "judges", english: "Judges" }, { key: "ruth", english: "Ruth" }, { key: "1samuel", english: "1 Samuel" },
  { key: "2samuel", english: "2 Samuel" }, { key: "1kings", english: "1 Kings" }, { key: "2kings", english: "2 Kings" },
  { key: "1chronicles", english: "1 Chronicles" }, { key: "2chronicles", english: "2 Chronicles" }, { key: "ezra", english: "Ezra" },
  { key: "nehemiah", english: "Nehemiah" }, { key: "esther", english: "Esther" }, { key: "job", english: "Job" },
  { key: "psalms", english: "Psalms" }, { key: "proverbs", english: "Proverbs" }, { key: "ecclesiastes", english: "Ecclesiastes" },
  { key: "songofsolomon", english: "Song of Solomon" }, { key: "isaiah", english: "Isaiah" }, { key: "jeremiah", english: "Jeremiah" },
  { key: "lamentations", english: "Lamentations" }, { key: "ezekiel", english: "Ezekiel" }, { key: "daniel", english: "Daniel" },
  { key: "hosea", english: "Hosea" }, { key: "joel", english: "Joel" }, { key: "amos", english: "Amos" },
  { key: "obadiah", english: "Obadiah" }, { key: "jonah", english: "Jonah" }, { key: "micah", english: "Micah" },
  { key: "nahum", english: "Nahum" }, { key: "habakkuk", english: "Habakkuk" }, { key: "zephaniah", english: "Zephaniah" },
  { key: "haggai", english: "Haggai" }, { key: "zechariah", english: "Zechariah" }, { key: "malachi", english: "Malachi" }
];
const NT = [
  { key: "matthew", english: "Matthew" }, { key: "mark", english: "Mark" }, { key: "luke", english: "Luke" },
  { key: "john", english: "John" }, { key: "acts", english: "Acts" }, { key: "romans", english: "Romans" },
  { key: "1corinthians", english: "1 Corinthians" }, { key: "2corinthians", english: "2 Corinthians" },
  { key: "galatians", english: "Galatians" }, { key: "ephesians", english: "Ephesians" }, { key: "philippians", english: "Philippians" },
  { key: "colossians", english: "Colossians" }, { key: "1thessalonians", english: "1 Thessalonians" },
  { key: "2thessalonians", english: "2 Thessalonians" }, { key: "1timothy", english: "1 Timothy" },
  { key: "2timothy", english: "2 Timothy" }, { key: "titus", english: "Titus" }, { key: "philemon", english: "Philemon" },
  { key: "hebrews", english: "Hebrews" }, { key: "james", english: "James" }, { key: "1peter", english: "1 Peter" },
  { key: "2peter", english: "2 Peter" }, { key: "1john", english: "1 John" }, { key: "2john", english: "2 John" },
  { key: "3john", english: "3 John" }, { key: "jude", english: "Jude" }, { key: "revelation", english: "Revelation" }
];
const LANGS = [
  { k: 'english', l: 'English', script: 'En' },
  { k: 'tamil', l: 'தமிழ்', script: 'Ta' },
  { k: 'hindi', l: 'हिन्दी', script: 'Hi' },
  { k: 'malayalam', l: 'മലയാളം', script: 'Ml' },
  { k: 'kannada', l: 'ಕನ್ನಡ', script: 'Kn' },
  { k: 'gujarati', l: 'ગુજરાતી', script: 'Gu' },
  { k: 'both', l: 'Bilingual', script: '⇌' },
];
const SEARCH_SUGGESTIONS = ['love', 'faith', 'hope', 'grace', 'peace', 'joy', 'John 3:16', 'Psalm 23', 'Proverbs 3:5'];

/* ── Language Dropdown ── */
const LanguageDropdown = ({ selectedLanguage, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGS.find(l => l.k === selectedLanguage) || LANGS[0];
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div className="lang-dropdown" ref={ref}>
      <button className="lang-trigger" onClick={() => setOpen(p => !p)} aria-haspopup="listbox" aria-expanded={open}>
        <span className="lang-globe">🌐</span>
        <span className="lang-current">{current.l}</span>
        <span className={`lang-caret ${open ? 'open' : ''}`}>▾</span>
      </button>
      <div className={`lang-menu ${open ? 'open' : ''}`} role="listbox">
        {LANGS.map(l => (
          <button key={l.k} role="option" aria-selected={selectedLanguage === l.k}
            className={`lang-option ${selectedLanguage === l.k ? 'active' : ''}`}
            onClick={() => { onChange(l.k); setOpen(false); }}>
            <span className="lang-badge">{l.script}</span>
            <span className="lang-label">{l.l}</span>
            {selectedLanguage === l.k && <span className="lang-check">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ── Search Bar with suggestions ── */
const SearchBar = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [showSugg, setShowSugg] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setShowSugg(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const submit = (q) => {
    const val = q || query;
    if (val.trim()) { onSearch(val.trim()); setQuery(val.trim()); }
    setShowSugg(false);
  };

  const clear = () => { setQuery(''); onClear(); setShowSugg(false); };

  const filtered = query ? SEARCH_SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase())) : SEARCH_SUGGESTIONS;

  return (
    <div className={`search-wrap ${focused ? 'focused' : ''}`} ref={ref}>
      <form className="search-bar" onSubmit={e => { e.preventDefault(); submit(); }} role="search">
        <span className="search-icon">🔍</span>
        <input type="text" className="search-input" placeholder="Search verses, books, keywords..."
          value={query} onChange={e => { setQuery(e.target.value); setShowSugg(true); }}
          onFocus={() => { setFocused(true); setShowSugg(true); }}
          onBlur={() => setFocused(false)}
          aria-label="Search Bible"
          onKeyDown={e => e.key === 'Escape' && clear()}
        />
        {query && <button type="button" className="search-clear" onClick={clear}>✕</button>}
      </form>
      {showSugg && filtered.length > 0 && (
        <div className="search-sugg">
          <p className="search-sugg-label">Suggestions</p>
          {filtered.slice(0, 6).map(s => (
            <button key={s} className="search-sugg-item" onMouseDown={() => submit(s)}>
              <span className="search-sugg-icon">🔍</span>{s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Single Verse with Bookmark + Glow ── */
const Verse = ({ verse, idx, selectedLanguage, bookmarks, onBookmark }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const verseNum = verse.verseNumber || idx + 1;
  const bookmarkKey = `${verse.verseNumber}`;
  const isBookmarked = bookmarks.includes(bookmarkKey);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const copy = useCallback(e => {
    e.stopPropagation();
    const text = selectedLanguage === 'both'
      ? `[English]: ${verse.en}\n[Tamil]: ${verse.ta}`
      : verse.value;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }, [verse, selectedLanguage]);

  return (
    <div ref={ref} id={`v-${verseNum}`}
      className={`rp-verse ${vis ? 'vis' : ''} ${hovered ? 'hovered' : ''} ${isBookmarked ? 'bookmarked' : ''}`}
      style={{ transitionDelay: vis ? `${Math.min(idx * 0.042, 0.65)}s` : '0s' }}
      role="region" aria-label={`Verse ${verseNum}`}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <span className="rp-vnum">{verseNum}</span>
      <div className="rp-vbody">
        {selectedLanguage === 'both' ? (
          <>
            {verse.en && <p className="rp-ven">{verse.en}</p>}
            {verse.en && verse.ta && <div className="rp-vdiv" aria-hidden="true" />}
            {verse.ta && <p className="rp-vta">{verse.ta}</p>}
          </>
        ) : (
          <p className={selectedLanguage === 'english' ? 'rp-ven' : 'rp-vta'}>{verse.value}</p>
        )}
      </div>
      {isBookmarked && <span className="rp-bookmark-indicator" title="Bookmarked">🔖</span>}
      <div className="rp-vacts" aria-hidden="true">
        <button className={`rp-vact ${isBookmarked ? 'active' : ''}`} title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
          onClick={e => { e.stopPropagation(); onBookmark(bookmarkKey); }}>
          {isBookmarked ? '🔖' : '🤍'}
        </button>
        <button className="rp-vact" title={copied ? 'Copied!' : 'Copy'} onClick={copy}>{copied ? '✓' : '📋'}</button>
        <button className="rp-vact" title="Highlight" onClick={e => e.stopPropagation()}>✏️</button>
        <button className="rp-vact" title="Share" onClick={e => e.stopPropagation()}>↗</button>
      </div>
    </div>
  );
};

/* ── Chapter Strip ── */
const ChapterStrip = ({ book, selected, onSelect, totalChapters }) => {
  const stripRef = useRef(null);
  const activeRef = useRef(null);
  const count = totalChapters || 1;

  useEffect(() => {
    if (activeRef.current && stripRef.current) {
      const strip = stripRef.current;
      const btn = activeRef.current;
      strip.scrollTo({ left: btn.offsetLeft - strip.offsetWidth / 2 + btn.offsetWidth / 2, behavior: 'smooth' });
    }
  }, [selected, totalChapters]);

  // Mouse-wheel horizontal scroll support
  const onWheel = e => {
    if (stripRef.current) {
      e.preventDefault();
      stripRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="ch-strip-wrapper">
      <div className="ch-strip-label">
        <span>Chapter</span>
        <span className="ch-strip-current">{selected} / {count}</span>
      </div>
      <div className="ch-strip" ref={stripRef} onWheel={onWheel} role="group" aria-label={`Chapters of ${book}`}>
        {Array.from({ length: count }, (_, i) => i + 1).map(n => (
          <button key={n} id={`ch-${n}`} ref={selected === n ? activeRef : null}
            className={`ch-strip-btn ${selected === n ? 'on' : ''}`}
            onClick={() => onSelect(n)} aria-label={`Chapter ${n}`} aria-pressed={selected === n}>
            {n}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ── Main Page ── */
const ReadBible = () => {
  // ── All state declarations first ──
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedBook, setSelectedBook] = useState('psalms');
  const [selectedChapter, setSelectedChapter] = useState(23);
  const [verses, setVerses] = useState([]);
  const [totalChapters, setTotalChapters] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('duobible-bookmarks') || '[]'); } catch { return []; }
  });
  const [mode, setMode] = useState('light');
  const [sidebar, setSidebar] = useState(true);
  const [focus, setFocus] = useState(false);
  const [pct, setPct] = useState(0);

  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const bgRef = useRef(null);

  // ── Translation helpers — defined AFTER all state so they always read fresh values ──
  // For 'both' (Bilingual) mode, we default the sidebar to Tamil as it's the primary local language supported
  const activeLang = selectedLanguage === 'both' ? 'tamil' : selectedLanguage;

  const getBookName = (key) =>
    bookTranslations[activeLang]?.[key] || bookTranslations['english']?.[key] || key;

  const getSectionLabel = (sectionKey) => {
    const langData = bookTranslations.ui?.[activeLang] || bookTranslations.ui?.['english'];
    return langData?.[sectionKey] || (sectionKey === 'ot' ? 'Old Testament' : 'New Testament');
  };

  /* Bookmark persistence */
  useEffect(() => {
    localStorage.setItem('duobible-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = useCallback((key) => {
    setBookmarks(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  }, []);

  /* Parallax on mouse move */
  useEffect(() => {
    const handler = e => {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  /* API Fetch */
  useEffect(() => {
    const fetchVerses = async () => {
      try {
        setLoading(true); setError(null);
        // The key is already lowercase backend-safe (e.g., '1samuel')
        const fBook = selectedBook;
        let fetchedVerses = [], maxChapters = 1;
        if (selectedLanguage === 'both') {
          const [resEn, resTa] = await Promise.all([
            fetch(`http://localhost:5000/api/bible/english/${fBook}/${selectedChapter}`),
            fetch(`http://localhost:5000/api/bible/tamil/${fBook}/${selectedChapter}`)
          ]);
          if (!resEn.ok || !resTa.ok) throw new Error('Scripture not found for bilingual mode.');
          const dataEn = await resEn.json(), dataTa = await resTa.json();
          maxChapters = dataEn.totalChapters || 1;
          const combined = {};
          dataEn.verses.forEach(v => { combined[v.verseNumber] = { en: v.value, ta: '', verseNumber: v.verseNumber }; });
          dataTa.verses.forEach(v => { if (combined[v.verseNumber]) combined[v.verseNumber].ta = v.value; });
          fetchedVerses = Object.keys(combined).sort((a, b) => a - b).map(n => combined[n]);
        } else {
          const res = await fetch(`http://localhost:5000/api/bible/${selectedLanguage}/${fBook}/${selectedChapter}`);
          if (!res.ok) throw new Error('Scripture not found on server.');
          const data = await res.json();
          fetchedVerses = data.verses || []; maxChapters = data.totalChapters || 1;
        }
        setVerses(fetchedVerses); setTotalChapters(maxChapters);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load scriptures.');
        setVerses([]);
      } finally { setLoading(false); }
    };
    fetchVerses();
  }, [selectedBook, selectedChapter, selectedLanguage]);

  /* Progress tracking */
  useEffect(() => {
    const el = scrollRef.current; if (!el) return;
    const fn = () => { const max = el.scrollHeight - el.clientHeight; setPct(max > 0 ? Math.round((el.scrollTop / max) * 100) : 100); };
    el.addEventListener('scroll', fn, { passive: true });
    return () => el.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setPct(0);
  }, [selectedBook, selectedChapter]);

  const scrollToVerse = (idx) => {
    const verseNum = verses[idx]?.verseNumber || idx + 1;
    const el = document.getElementById(`v-${verseNum}`);
    if (el && scrollRef.current) {
      const top = el.offsetTop - 120;
      scrollRef.current.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleBookSelect = b => {
    setSelectedBook(b); setSelectedChapter(1);
    if (window.innerWidth < 900) setSidebar(false);
  };

  const displayVerses = searchQuery
    ? verses.filter(v => {
      const t = selectedLanguage === 'both' ? `${v.en} ${v.ta}` : v.value || '';
      return t.toLowerCase().includes(searchQuery.toLowerCase());
    })
    : verses;

  const sidebarLeft = focus ? 0 : (sidebar ? 234 : 0);

  return (
    <div className={`rp ${focus ? 'focus-mode' : ''}`} data-mode={mode}>
      {/* Parallax background */}
      <div className="rp-bg" ref={bgRef} />

      {/* Progress bar */}
      <div className="rp-progress" role="progressbar" aria-valuenow={pct} aria-valuemax={100}>
        <div className="rp-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="rp-body">
        {/* Sidebar */}
        <nav className={`rp-sidebar ${(!sidebar || focus) ? 'closed' : ''} ${window.innerWidth < 900 && sidebar ? 'open' : ''}`}>
          <div className="rp-sb-inner">
            <div className="rp-sb-label verse-label">VERSE</div>
            <div className="rp-sb-verses-grid">
              {verses.map((_, i) => (
                <button key={i} className="rp-sb-v-btn" onClick={() => scrollToVerse(i)}>
                  {i + 1}
                </button>
              ))}
            </div>

            <div className="rp-sb-label">{getSectionLabel('ot')}</div>
            {OT.map(b => (
              <div key={b.key} className={`rp-book ${selectedBook === b.key ? 'active' : ''}`} onClick={() => handleBookSelect(b.key)}
                role="button" tabIndex={0} aria-label={`Read ${getBookName(b.key)}`} onKeyDown={e => e.key === 'Enter' && handleBookSelect(b.key)}>
                <span>{getBookName(b.key)}</span><span className="rp-book-arr">›</span>
              </div>
            ))}
            <div className="rp-sb-label">{getSectionLabel('nt')}</div>
            {NT.map(b => (
              <div key={b.key} className={`rp-book ${selectedBook === b.key ? 'active' : ''}`} onClick={() => handleBookSelect(b.key)}
                role="button" tabIndex={0} aria-label={`Read ${getBookName(b.key)}`} onKeyDown={e => e.key === 'Enter' && handleBookSelect(b.key)}>
                <span>{getBookName(b.key)}</span><span className="rp-book-arr">›</span>
              </div>
            ))}
          </div>
        </nav>

        {/* Sidebar toggle */}
        {!focus && (
          <button className="rp-toggle" style={{ left: `${sidebarLeft}px` }}
            onClick={() => setSidebar(p => !p)} aria-label={sidebar ? 'Collapse sidebar' : 'Expand sidebar'}>
            {sidebar ? '‹' : '›'}
          </button>
        )}

        {/* Main */}
        <div className="rp-main">
          {/* Header */}
          <div className="rp-hdr">
            <button className="rp-back-btn" onClick={() => navigate('/home')} aria-label="Back to Home">
              <span className="rp-back-icon">←</span>
            </button>
            <div className="rp-hdr-center">
              <h1 className="rp-title">{getBookName(selectedBook)}</h1>
              <p className="rp-sub">Chapter {selectedChapter} &nbsp;·&nbsp; {pct}% read</p>
            </div>
            <div className="rp-controls">
              <div className="mode-toggle">
                {[{ k: 'light', i: '☀️' }, { k: 'sepia', i: '📜' }, { k: 'dark', i: '🌙' }].map(m => (
                  <button key={m.k} className={`mode-btn ${mode === m.k ? 'on' : ''}`}
                    onClick={() => setMode(m.k)} aria-label={`${m.k} mode`}>{m.i}</button>
                ))}
              </div>
              <LanguageDropdown selectedLanguage={selectedLanguage} onChange={setSelectedLanguage} />
              <button id="focus-mode-btn" className={`rp-focus-btn ${focus ? 'on' : ''}`}
                onClick={() => setFocus(p => !p)} aria-pressed={focus}
                aria-label={focus ? 'Exit focus mode' : 'Enter focus mode'}>
                {focus ? '✕' : '⊙'}
              </button>
            </div>
          </div>

          {/* Search */}
          {!focus && (
            <SearchBar
              onSearch={q => setSearchQuery(q)}
              onClear={() => setSearchQuery('')}
            />
          )}

          {/* Bookmarks count chip */}
          {bookmarks.length > 0 && !focus && (
            <div className="bookmark-chip">
              🔖 {bookmarks.length} bookmarked verse{bookmarks.length !== 1 ? 's' : ''}
              <button onClick={() => setBookmarks([])}>Clear all</button>
            </div>
          )}

          {/* Scroll area */}
          <div className="rp-scroll" ref={scrollRef}>
            <div className="rp-content">
              <ChapterStrip book={selectedBook} selected={selectedChapter}
                onSelect={setSelectedChapter} totalChapters={totalChapters} />

              {searchQuery && (
                <div className="search-result-info">
                  {displayVerses.length > 0
                    ? `${displayVerses.length} verse${displayVerses.length !== 1 ? 's' : ''} matching "${searchQuery}"`
                    : `No verses found for "${searchQuery}"`}
                  <button className="search-clear-btn" onClick={() => setSearchQuery('')}>Clear</button>
                </div>
              )}

              <article className="rp-verse-area" aria-label={`${getBookName(selectedBook)} Chapter ${selectedChapter}`}>
                {loading ? (
                  <div className="rp-loading-state">
                    <div className="rp-spinner" />
                    <p>Loading scripture...</p>
                  </div>
                ) : error ? (
                  <div className="rp-error-state">
                    <p className="rp-error-icon">⚠️</p>
                    <p>{error}</p>
                    <button className="rp-retry-btn" onClick={() => setSelectedChapter(c => c)}>Retry</button>
                  </div>
                ) : displayVerses.length > 0 ? (
                  displayVerses.map((v, i) => (
                    <Verse key={`${selectedLanguage}-${selectedBook}-${selectedChapter}-${v.verseNumber || i}`}
                      verse={v} idx={i} selectedLanguage={selectedLanguage}
                      bookmarks={bookmarks} onBookmark={toggleBookmark} />
                  ))
                ) : (
                  <div className="rp-empty">
                    <div className="rp-empty-ico">📖</div>
                    <p className="rp-empty-t">{getBookName(selectedBook)} · Chapter {selectedChapter}</p>
                    <p className="rp-empty-s">No verses found for this selection.</p>
                  </div>
                )}
              </article>

              {!loading && verses.length > 0 && (
                <nav className="rp-ch-nav" aria-label="Chapter navigation">
                  <button id="prev-chapter-btn" className="rp-nav-btn"
                    onClick={() => setSelectedChapter(c => Math.max(1, c - 1))}
                    disabled={selectedChapter === 1}>← Previous</button>
                  <span className="rp-ch-nav-info">{selectedChapter} / {totalChapters}</span>
                  <button id="next-chapter-btn" className="rp-nav-btn"
                    onClick={() => setSelectedChapter(c => Math.min(totalChapters, c + 1))}
                    disabled={selectedChapter === totalChapters}>Next →</button>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReadBible;
