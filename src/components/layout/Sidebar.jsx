import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Accueil', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/epargne', label: 'Épargne', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { path: '/compte-courant', label: 'Compte Courant', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { path: '/escompte', label: 'Escompte', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-dark-900/95 backdrop-blur-md border-r border-dark-700/50 
                  transition-all duration-300 z-50 flex flex-col
                  ${isCollapsed ? 'w-16' : 'w-64'}`}
      style={{
        boxShadow: '2px 0 30px rgba(0, 0, 0, 0.5), inset -1px 0 0 rgba(0, 212, 255, 0.1)'
      }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-primary-500/20">
        <Link to="/" className="flex items-center gap-2 group">
          <div 
            className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center clip-path-angular transition-all duration-300 group-hover:scale-110"
            style={{
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)'
            }}
          >
            <span className="text-white font-bold text-sm font-display">X</span>
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold text-white font-display tracking-wider">
              <span className="text-primary-400" style={{ textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}>X</span>FIN
            </span>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-primary-400 transition-all duration-200 p-1 hover:scale-110"
          aria-label={isCollapsed ? 'Développer la barre latérale' : 'Réduire la barre latérale'}
        >
          <svg className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${isActive(item.path) ? 'active' : ''} ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? item.label : undefined}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
            </svg>
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t border-primary-500/10 ${isCollapsed ? 'text-center' : ''}`}>
        {!isCollapsed && (
          <p className="text-xs text-primary-500/50 font-medium uppercase tracking-widest">
            Finance Sim
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
