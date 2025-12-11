import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Accueil', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/epargne', label: 'Épargne', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { path: '/compte-courant', label: 'Compte Courant', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { path: '/escompte', label: 'Escompte', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { path: '/emprunt-indivis', label: 'Emprunts', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { path: '/emprunt-obligataire', label: 'Obligations', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { path: '/portefeuille', label: 'Portefeuille', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
  ];

  return (
    <motion.aside 
      className="fixed left-0 top-0 h-screen bg-dark-900/95 backdrop-blur-xl border-r border-dark-700/50 
                  z-50 flex flex-col overflow-hidden"
      initial={false}
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        boxShadow: '2px 0 30px rgba(0, 0, 0, 0.5), inset -1px 0 0 rgba(0, 212, 255, 0.1)'
      }}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />
      
      {/* Background decoration */}
      <motion.div 
        className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-primary-500/20 relative">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            className="relative w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-bold text-lg font-display">X</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl font-bold text-white font-display tracking-wider">
                  FIN<span className="text-primary-400" style={{ textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}>STUDIO</span>
                </h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Finance Tools</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        <motion.button
          onClick={onToggle}
          className="text-gray-400 hover:text-primary-400 transition-colors p-1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isCollapsed ? 'Développer la barre latérale' : 'Réduire la barre latérale'}
        >
          <motion.svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </motion.svg>
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-600 px-2">
        {navItems.map((item, index) => (
          <Link
            key={item.path}
            to={item.path}
            title={isCollapsed ? item.label : undefined}
          >
            <motion.div
              className={`relative flex items-center gap-3 px-3 py-3 my-1 rounded-sm transition-all cursor-pointer group
                          ${isActive(item.path) 
                            ? 'bg-primary-500/10 text-primary-400' 
                            : 'text-gray-400 hover:text-white hover:bg-dark-800/50'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: isCollapsed ? 0 : 4 }}
            >
              {/* Active indicator */}
              <AnimatePresence>
                {isActive(item.path) && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r"
                    layoutId="sidebar-active-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)',
                    }}
                  />
                )}
              </AnimatePresence>
              
              {/* Icon */}
              <div className={`flex items-center justify-center w-8 h-8 flex-shrink-0 transition-colors
                              ${isActive(item.path) ? 'text-primary-400' : 'text-gray-500 group-hover:text-primary-400'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </div>
              
              {/* Label */}
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    className="text-sm font-medium tracking-wide truncate"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-sm bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              />
            </motion.div>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t border-primary-500/10 ${isCollapsed ? 'text-center' : ''}`}>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.p
              className="text-xs text-primary-500/50 font-medium uppercase tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Finance Sim
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
