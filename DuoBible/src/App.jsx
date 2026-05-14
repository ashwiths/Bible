// App.jsx
// ─────────────────────────────────────────────────────
// ROUTE MAP:
//   "/"      → Original landing (PraiseSection + JesusParallax)
//              PRAISE THE LORD scroll animation → BIBLE CHANGES EVERYTHING
//              Click Explore → fades to /home
//   "/home"  → New premium Home dashboard
//   "/read"  → Bible reading interface
//   "/daily" → Daily reading plans
//   "/about" → About page
//   "*"      → 404 page
// ─────────────────────────────────────────────────────

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Original landing components (keep design exactly as-is)
import PraiseSection from './components/PraiseSection';
import JesusParallax from './components/JesusParallax';

// New pages (navigate to after clicking Explore)
import Home         from './pages/Home';
import ReadBible    from './pages/ReadBible';
import About        from './pages/About';
import DailyReading from './pages/DailyReading';
import NotFound     from './pages/NotFound';

// Global styles
import './styles/global.css';
import './styles/animations.css';

// The original landing design: PraiseSection on top, JesusParallax below
// JesusParallax has the Explore button wired to navigate('/home')
const LandingPage = () => (
  <>
    <PraiseSection />
    <JesusParallax />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* "/" = the original PRAISE THE LORD + BIBLE design */}
        <Route path="/"       element={<LandingPage />} />

        {/* "/home" = the new premium dashboard (reached via Explore button) */}
        <Route path="/home"   element={<Home />} />
        <Route path="/read"   element={<ReadBible />} />
        <Route path="/daily"  element={<DailyReading />} />
        <Route path="/about"  element={<About />} />

        {/* 404 fallback */}
        <Route path="*"       element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
