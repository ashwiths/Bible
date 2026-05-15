// pages/ReadBible.jsx — World-Class Premium Multilingual Bible Reader
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { bibleData } from '../data/bibleData';
import { bookTranslations } from '../data/bookTranslations';
import '../styles/read.css';
import bookmarkImg from '../assets/bookmark.png';

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

/* ── Search Bar with real-time API suggestions ── */
const SearchBar = ({ onSelectResult, selectedLanguage }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [showSugg, setShowSugg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setShowSugg(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const langParam = selectedLanguage === 'both' ? 'english' : selectedLanguage;
        const res = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}&language=${langParam}&limit=12`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query, selectedLanguage]);

  const clear = () => { setQuery(''); setResults([]); setShowSugg(false); };

  const handleResultClick = (r) => {
    const bookKey = r.book.toLowerCase().replace(/\s+/g, "");
    let actualBookKey = bookKey;
    const allBooks = [...OT, ...NT];
    const foundBook = allBooks.find(b => b.english.toLowerCase().replace(/\s+/g, "") === bookKey || b.key === bookKey);
    if (foundBook) actualBookKey = foundBook.key;

    onSelectResult(actualBookKey, r.chapter, r.verseNumber);
    clear();
  };

  return (
    <div className={`search-wrap ${focused ? 'focused' : ''}`} ref={ref}>
      <form className="search-bar" onSubmit={e => e.preventDefault()} role="search">
        <span className="search-icon">🔍</span>
        <input type="text" className="search-input" placeholder="Search verses globally..."
          value={query} onChange={e => { setQuery(e.target.value); setShowSugg(true); }}
          onFocus={() => { setFocused(true); setShowSugg(true); }}
          onBlur={() => setFocused(false)}
          aria-label="Search Bible"
          onKeyDown={e => e.key === 'Escape' && clear()}
        />
        {query && <button type="button" className="search-clear" onClick={clear}>✕</button>}
      </form>
      {showSugg && query.trim() && (
        <div className="search-sugg search-sugg-premium">
          <p className="search-sugg-label">Global Search Results</p>
          {loading ? (
             <div className="search-loading">Searching verses...</div>
          ) : results.length > 0 ? (
            results.map((r, i) => (
              <button key={i} className="search-sugg-item global-result" onMouseDown={() => handleResultClick(r)}>
                <span className="search-sugg-icon">📖</span>
                <div className="search-result-content">
                  <div className="search-result-ref">{r.book} {r.chapter}:{r.verseNumber}</div>
                  <div className="search-result-text">{r.text.substring(0, 85)}{r.text.length > 85 ? '...' : ''}</div>
                </div>
              </button>
            ))
          ) : (
            <div className="search-empty">No matching verses found for "{query}".</div>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Single Verse with Bookmark + Glow ── */
const Verse = ({ verse, idx, selectedLanguage, book, chapter, bookmarks, onBookmark, notes, onEditNote }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [bmAnim, setBmAnim] = useState(false);
  const verseNum = verse.verseNumber || idx + 1;
  const id = `${book}-${chapter}-${verseNum}`;
  const isBookmarked = bookmarks.some(b => b.id === id);
  const hasNote = notes && notes.some(n => n.id === id);

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

  const handleBookmark = (e) => {
    e.stopPropagation();
    const textSnippet = selectedLanguage === 'both' ? verse.en : verse.value;
    onBookmark({ id, book, chapter, verseNumber: verseNum, textSnippet });
    setBmAnim(true);
    setTimeout(() => setBmAnim(false), 500);
  };

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
      <div className="rp-indicators">
        {isBookmarked && (
          <span className="rp-indicator" title="Bookmarked">
            <img src={bookmarkImg} alt="" style={{ height: '14px', width: 'auto' }} />
          </span>
        )}
        {hasNote && <span className="rp-indicator" title="Has Note">📝</span>}
      </div>
      <div className="rp-vacts" aria-hidden="true">
        <button className={`rp-vact ${isBookmarked ? 'active' : ''} ${bmAnim ? 'pop-anim' : ''}`} title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
          onClick={handleBookmark}>
          {isBookmarked ? (
            <img src={bookmarkImg} alt="" style={{ height: '18px', width: 'auto' }} />
          ) : '🤍'}
        </button>
        <button className={`rp-vact ${hasNote ? 'active' : ''}`} title="Notes" onClick={(e) => { 
          e.stopPropagation(); 
          const textSnippet = selectedLanguage === 'both' ? verse.en : verse.value;
          onEditNote({ id, book, chapter, verseNumber: verseNum, textSnippet }); 
        }}>📝</button>
        <button className="rp-vact" title={copied ? 'Copied!' : 'Copy'} onClick={copy}>{copied ? '✓' : '📋'}</button>
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

  const scrollLeft = () => {
    if (stripRef.current) {
      stripRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (stripRef.current) {
      stripRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="ch-strip-wrapper">
      <div className="ch-strip-label">
        <span>Chapter</span>
        <span className="ch-strip-current">{selected} / {count}</span>
      </div>
      <div className="ch-strip-container">
        <button className="ch-strip-nav-btn" onClick={scrollLeft} aria-label="Scroll left">‹</button>
        <div className="ch-strip" ref={stripRef} onWheel={onWheel} role="group" aria-label={`Chapters of ${book}`}>
          {Array.from({ length: count }, (_, i) => i + 1).map(n => (
            <button key={n} id={`ch-${n}`} ref={selected === n ? activeRef : null}
              className={`ch-strip-btn ${selected === n ? 'on' : ''}`}
              onClick={() => onSelect(n)} aria-label={`Chapter ${n}`} aria-pressed={selected === n}>
              {n}
            </button>
          ))}
        </div>
        <button className="ch-strip-nav-btn" onClick={scrollRight} aria-label="Scroll right">›</button>
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
  const [targetVerse, setTargetVerse] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    try { 
      const parsed = JSON.parse(localStorage.getItem('duobible-bookmarks') || '[]');
      return parsed.filter(i => typeof i === 'object' && i !== null);
    } catch { return []; }
  });
  const [notes, setNotes] = useState(() => {
    try { 
      const parsed = JSON.parse(localStorage.getItem('duobible-notes') || '[]');
      return parsed.filter(i => typeof i === 'object' && i !== null);
    } catch { return []; }
  });
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [noteDraft, setNoteDraft] = useState('');
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

  const toggleBookmark = useCallback((bData) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.id === bData.id);
      if (exists) return prev.filter(b => b.id !== bData.id);
      return [...prev, { ...bData, timestamp: Date.now() }];
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('duobible-notes', JSON.stringify(notes));
  }, [notes]);

  const handleEditNote = useCallback((vData) => {
    const existing = notes.find(n => n.id === vData.id);
    setNoteDraft(existing ? existing.content : '');
    setActiveNote(vData);
  }, [notes]);

  const saveNote = () => {
    if (!activeNote) return;
    setNotes(prev => {
      const filtered = prev.filter(n => n.id !== activeNote.id);
      if (!noteDraft.trim()) return filtered;
      return [...filtered, { ...activeNote, content: noteDraft.trim(), timestamp: Date.now() }];
    });
    setActiveNote(null);
  };

  const deleteNote = () => {
    if (!activeNote) return;
    setNotes(prev => prev.filter(n => n.id !== activeNote.id));
    setActiveNote(null);
  };

  /* Parallax on mouse move */


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

  const handleSearchResult = (bookKey, chapterNum, verseNum) => {
    setSelectedBook(bookKey);
    setSelectedChapter(chapterNum);
    setTargetVerse(verseNum);
    if (window.innerWidth < 900) setSidebar(false);
  };

  useEffect(() => {
    if (targetVerse && verses.length > 0 && !loading) {
      const idx = verses.findIndex(v => v.verseNumber == targetVerse);
      if (idx !== -1) {
        setTimeout(() => scrollToVerse(idx), 300);
      }
      setTargetVerse(null);
    }
  }, [verses, loading, targetVerse]);

  const displayVerses = verses;

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
              <span className="rp-back-text">Back</span>
            </button>
            <div className="rp-hdr-center">
              <h1 className="rp-title">{getBookName(selectedBook)}</h1>
              <p className="rp-sub">Chapter {selectedChapter} &nbsp;·&nbsp; {pct}% read</p>
            </div>
            <div className="rp-controls">
              <button className="rp-icon-btn" title="Bookmarks" onClick={() => setShowBookmarks(true)}>
                <img src={bookmarkImg} alt="Bookmarks" style={{ height: '32px', width: 'auto' }} />
              </button>

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
              onSelectResult={handleSearchResult}
              selectedLanguage={selectedLanguage}
            />
          )}



          {/* Scroll area */}
          <div className="rp-scroll" ref={scrollRef}>
            <div className="rp-content">
              <ChapterStrip book={selectedBook} selected={selectedChapter}
                onSelect={setSelectedChapter} totalChapters={totalChapters} />

              {/* Search results banner removed; global search used instead */}

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
                      book={selectedBook} chapter={selectedChapter}
                      bookmarks={bookmarks} onBookmark={toggleBookmark}
                      notes={notes} onEditNote={handleEditNote} />
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

      {/* Bookmarks Modal/Drawer */}
      {showBookmarks && (
        <div className="bm-overlay" onClick={() => setShowBookmarks(false)}>
          <div className="bm-drawer" onClick={e => e.stopPropagation()}>
            <div className="bm-header">
              <h2 className="bm-title">Your Bookmarks</h2>
              <button className="bm-close" onClick={() => setShowBookmarks(false)}>✕</button>
            </div>
            <div className="bm-list">
              {bookmarks.length === 0 ? (
                <div className="bm-empty">
                  <div className="bm-empty-icon">
                    <img src={bookmarkImg} alt="" style={{ height: '48px', width: 'auto', opacity: 0.4 }} />
                  </div>
                  <p>No bookmarks yet.</p>
                  <span>Click the bookmark icon on any verse to save it.</span>
                </div>
              ) : (
                bookmarks.sort((a,b) => b.timestamp - a.timestamp).map(b => (
                  <div key={b.id} className="bm-item" onClick={() => { handleSearchResult(b.book, b.chapter, b.verseNumber); setShowBookmarks(false); }}>
                    <div className="bm-item-top">
                      <div className="bm-ref">{getBookName(b.book)} {b.chapter}:{b.verseNumber}</div>
                      <button className="bm-remove" onClick={(e) => { e.stopPropagation(); toggleBookmark({ id: b.id }); }} title="Remove">✕</button>
                    </div>
                    <div className="bm-text">{b.textSnippet ? `"${b.textSnippet.substring(0, 85)}${b.textSnippet.length > 85 ? '...' : ''}"` : '...'}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {activeNote && (
        <div className="note-overlay" onClick={() => setActiveNote(null)}>
          <div className="note-modal" onClick={e => e.stopPropagation()}>
            <div className="note-header">
              <h2 className="note-title">Notes for {getBookName(activeNote.book)} {activeNote.chapter}:{activeNote.verseNumber}</h2>
              <button className="note-close" onClick={() => setActiveNote(null)}>✕</button>
            </div>
            <div className="note-snippet">"{activeNote.textSnippet}"</div>
            <div className="note-body">
              <textarea 
                className="note-textarea"
                placeholder="Write your thoughts, reflections, or prayers here..."
                value={noteDraft}
                onChange={e => setNoteDraft(e.target.value)}
                autoFocus
              />
            </div>
            <div className="note-footer">
              <button className="note-btn-delete" onClick={deleteNote}>Delete</button>
              <div className="note-footer-right">
                <button className="note-btn-cancel" onClick={() => setActiveNote(null)}>Cancel</button>
                <button className="note-btn-save" onClick={saveNote}>Save Note</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReadBible;
