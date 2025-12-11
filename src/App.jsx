import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Epargne from './pages/Epargne';
import CompteCourant from './pages/CompteCourant';
import Escompte from './pages/Escompte';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-dark-950 relative overflow-hidden">
        {/* Aggressive Angular lighting effect - Opera GX Style */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Main neon glow from left */}
          <div className="absolute -left-1/4 top-0 w-1/2 h-full bg-gradient-to-r from-primary-500/20 via-primary-600/10 to-transparent transform -skew-x-12" />
          <div className="absolute -left-1/4 top-1/4 w-1/3 h-1/2 bg-gradient-to-br from-primary-400/15 via-transparent to-transparent transform rotate-12" />
          
          {/* Accent glow from bottom */}
          <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-accent-500/8 via-accent-600/3 to-transparent" />
          <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-tl from-accent-500/10 via-transparent to-transparent" />
          
          {/* Cyber grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(90deg, var(--color-primary-500) 1px, transparent 1px),
                               linear-gradient(180deg, var(--color-primary-500) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          
          {/* Scanlines effect */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
            }}
          />
          
          {/* Aggressive angular lines */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="100%" x2="70%" y2="0" stroke="url(#line-gradient-global)" strokeWidth="2" opacity="0.15" />
            <line x1="10%" y1="100%" x2="80%" y2="0" stroke="url(#line-gradient-global)" strokeWidth="1" opacity="0.08" />
            <line x1="100%" y1="100%" x2="30%" y2="0" stroke="url(#accent-gradient-global)" strokeWidth="1" opacity="0.06" />
            <defs>
              <linearGradient id="line-gradient-global" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#00d4ff' }} />
                <stop offset="50%" style={{ stopColor: '#00d4ff', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#00d4ff', stopOpacity: 0 }} />
              </linearGradient>
              <linearGradient id="accent-gradient-global" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#ff0040', stopOpacity: 0 }} />
                <stop offset="50%" style={{ stopColor: '#ff0040', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#ff0040' }} />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Corner accent glow */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-transparent" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-accent-500/15 to-transparent" />
        </div>

        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div className={`flex flex-col flex-1 transition-all duration-300 relative z-10 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/epargne" element={<Epargne />} />
              <Route path="/compte-courant" element={<CompteCourant />} />
              <Route path="/escompte" element={<Escompte />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
